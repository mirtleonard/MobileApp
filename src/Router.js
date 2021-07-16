import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/auth/login.js';
import Register from './components/auth/register.js';
import Home from './components/profile/home.js';
import ActivityReports from './components/activityReport/activityReports.js';
import ActivityReport from './components/activityReport/activityReport.js';
import EventReports from './components/eventReport/eventReports.js';
import EventReport from './components/eventReport/eventReport.js';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          initial
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="ActivityReports"
          component={ActivityReports}
        />
        <Stack.Screen
          name="ActivityReport"
          component={ActivityReport}
        />
        <Stack.Screen
          name="EventReports"
          component={EventReports}
        />
        <Stack.Screen
          name="EventReport"
          component={EventReport}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;
