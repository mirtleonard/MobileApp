import React from 'react';
import axios from 'axios';
import { Button, Card } from 'react-native-elements';
import {StyleSheet, Text, TextInput,View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function signIn(name, user_password, navigation) {
  const payload = {username : name, password : user_password}
  axios
    .post('http://192.168.1.9:8000/api/user/login/', payload)
    .then(response => {
      const { token, user } = response.data;
      // We set the returned token as the default authorization header
      axios.defaults.headers.common.Authorization = `Token ${token}`;
      navigation.navigate('Home');
    })
    .catch(error => console.log(error));
}

const Login = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  return(
    <View style={styles.container}>
      <Card>
        <TextInput
          style={styles.input}
          placeholder="Nume"
          onChangeText={setName}
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
          onPress = {() => signIn(name, password, navigation)}>
        </Button>
        <Button
          title = 'Register'
          style = {styles.btnEnter}
          onPress = {() => navigation.navigate('Register')}>
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    margin:15,
    height:40,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#428AF8',
  },
  btnEnter: {
    justifyContent : 'center',
    flexDirection: 'row',
    backgroundColor: '#42BAF8',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    padding: 10,
  }
});

export default Login;
