import React from 'react';
import axios from 'axios';
import styles from './css.js';
import { AuthDispatch } from './context.js';
import * as SecureStore from 'expo-secure-store';
import { Button, Card, Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput, View, AsyncStorage, Alert } from 'react-native';


async function signIn(name, user_password, dispatch) {
  dispatch({type: "REQUEST_LOGIN"})
  const payload = { username : name, password : user_password };
  axios
    .post('http://192.168.1.9:8000/api/user/login/', payload)
    .then(response => {
      const { token, user } = response.data;
      SecureStore.setItemAsync('user', JSON.stringify(user) || "");
      SecureStore.setItemAsync('token', token);
      axios.defaults.headers.common.Authorization = `Token ${token}`;
      dispatch({type: "LOGIN_SUCCESS", user : user, token: token});
    })
    .catch(error => {
      Alert.alert("Eroare", "Datele introduse sunt incorecte!");
      console.log(error);
    });
}



const Login = ({ navigation }) => {
  const dispatch = React.useContext(AuthDispatch);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  return(
    <View style={styles.container}>
      <Card>
        <TextInput
          style={styles.input}
          placeholder="Nume"
          onChangeText={setName }
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Parola"
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
        />
        <Button
          title = 'Login'
          style = {styles.btnEnter}
          onPress = {async () => signIn(name, password, dispatch)}
        />
      </Card>
    </View>
  );
}

export default Login;
