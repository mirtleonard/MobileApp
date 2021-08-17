import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EditActivityReport from './components/activityReport/editActivityReport.js';
import ActivityReports from './components/activityReport/activityReports.js';
import ActivityReport from './components/activityReport/activityReport.js';
import EditEventReport from './components/eventReport/editEventReport.js';
import EventReports from './components/eventReport/eventReports.js';
import EventReport from './components/eventReport/eventReport.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import * as Context from './components/auth/context.js';
import Register from './components/auth/register.js';
import * as SecureStore from 'expo-secure-store';
import Home from './components/profile/home.js';
import Login from './components/auth/login.js';
import { Button, View } from 'react-native';
import { createDrawerNavigator,
         DrawerItem,
         DrawerItemList,
         DrawerContentScrollView,
  } from '@react-navigation/drawer';
import * as React from 'react';
import axios from 'axios';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
export const LogOutState = React.createContext();
//export const Updates = React.createContext();

const SplashScreen = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const ViewReports = () => {
    return(
      <Tab.Navigator>
        <Tab.Screen name = "Activitate" component = { ActivityReports } />
        <Tab.Screen name = "Eveniment" component = { EventReports }  />
      </Tab.Navigator>
    );
}

const CreateReport = (props) => {
    return(
      <Tab.Navigator>
        <Tab.Screen name = "Activitate" component = { EditActivityReport } />
        <Tab.Screen name = "Eveniment" component = { EditEventReport }  />
      </Tab.Navigator>
    );
}

const Auth = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen name = 'Login' component = { Login } />
      <Tab.Screen name = 'Register' component = { Register } />
    </Tab.Navigator>
  )
}

const CustomDrawer = (props) => {
  const [user, dispatch] = React.useReducer(Context.AuthReducer, Context.initialState);
  const setLogedOut = React.useContext(LogOutState);
  return(
      <DrawerContentScrollView {...props}>
        <DrawerItemList  {...props} />
        <DrawerItem label="Deconectează-te" onPress = {() => {
          SecureStore.deleteItemAsync('user');
          SecureStore.deleteItemAsync('token');
          setLogedOut(true);
          dispatch({type: "LOGOUT"});
        }} />
      </DrawerContentScrollView>
  );
}

const MyDrawer = () => {
  return(
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />} >
      <Drawer.Screen name="Profile" component={ Home } />
      <Drawer.Screen name="CreateReport" component={ CreateReport } />
      <Drawer.Screen name="ViewReports" component={ ViewReports } />
    </Drawer.Navigator>
  )
}


const MyStack = () => {
  let user = React.useContext(Context.AuthState);
  return (
    <NavigationContainer>
    {
      user.loding ? (
        <Stack.Navigator>
          <Stack.Screen name="Loading" component= { SplashScreen } />
        </Stack.Navigator>
      ) : user.token ? (
        <Stack.Navigator>
          <Stack.Screen name="Meniu" component={MyDrawer} />
          <Stack.Screen name="ViewActivityReport" component={ ActivityReport } />
          <Stack.Screen name="ViewEventReport" component={ EventReport } />
          <Stack.Screen name="EditActivityReport" component={EditActivityReport} />
          <Stack.Screen name="EditEventReport" component={EditEventReport} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      )
    }
    </NavigationContainer>
  )
}

export default function Navigation () {
  const [data, dispatch] = React.useReducer(Context.AuthReducer, Context.initialState);
  const [logedOut, setLogedOut] = React.useState(false);
  React.useEffect(async () => {
    let currentUser, currentToken;
    try {
        currentUser = await SecureStore.getItemAsync('user');
        currentToken = await SecureStore.getItemAsync('token');
        axios.defaults.headers.common.Authorization = `Token ${currentToken}`;
        dispatch({type: "LOGIN_SUCCESS", user : JSON.parse(currentUser), token: currentToken});
    } catch(error) {
        console.log(error);
    }
  },[logedOut]);
  return (
    <LogOutState.Provider value = {setLogedOut}>
      <Context.AuthState.Provider value = {data}>
        <Context.AuthDispatch.Provider value = {dispatch}>
          <MyStack/>
        </Context.AuthDispatch.Provider>
      </Context.AuthState.Provider>
    </LogOutState.Provider>
  );
}
