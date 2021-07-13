import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from "react";
import {Picker} from '@react-native-picker/picker';
import { Button, TextInput, View } from 'react-native';

const Register = ({ navigation }) => {
  return(
  <Formik
     initialValues={{ email: '', password: '', username: '', confirm_password: '', branch: 'Lupișori'}}
     onSubmit={(values) => {
       if (values.password != values.confirm_password || values.password == '' || values.email == '' || values.username == '')
        return;
       axios
        .post('http://192.168.1.9:8000/api/auth/register/', values)
        .then(response => {
          navigation.navigate('Login');
      })
      .catch(error => console.log(error));
    }}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
           onChangeText={handleChange('username')}
           placeholder="Nume"
           onBlur={handleBlur('username')}
           value={values.username}
         />
         <TextInput
           onChangeText={handleChange('email')}
           placeholder="Email"
           onBlur={handleBlur('email')}
           value={values.email}
         />
         <TextInput
           onChangeText={handleChange('password')}
           secureTextEntry={true}
           placeholder="Parola"
           onBlur={handleBlur('password')}
           value={values.password}
         />
         <TextInput
           onChangeText={handleChange('confirm_password')}
           secureTextEntry={true}
           placeholder="Confirmă parola"
           onBlur={handleBlur('confirm_password')}
           value={values.confirm_password}
         />
        <Picker
          selectedValue={values.branch}
          style={{ height: 50, width: 150 }}
          onValueChange={handleChange('branch')}
        >
          <Picker.Item label="Lupișori" value="Lupișori" />
          <Picker.Item label="Temerari" value="Temerari" />
          <Picker.Item label="Exploratori" value="Exploratori" />
          <Picker.Item label="Seniori" value="Seniori" />
        </Picker>

         <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>
 );
}

export default Register;
