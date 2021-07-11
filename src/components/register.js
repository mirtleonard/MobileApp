import axios from 'axios';
import { Formik } from 'formik';
import React, { useState } from "react";
import DatePicker from 'react-native-datepicker';
import { Button, TextInput, View, Picker } from 'react-native';

const Register = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState(new Date())
  return(
  <Formik
     initialValues={{ email: '', password: '', username: '', confirm_passowrd: '', branch: 'Temerari' }}
     onSubmit={(values) => {
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
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Lupișori" value="Lupișori" />
          <Picker.Item label="Temerari" value="Temerari" />
          <Picker.Item label="Exploratori" value="Exploratori" />
          <Picker.Item label="Seniori" value="Seniori" />
        </Picker>

        <DatePicker
          mode="date"
          date={date}
          onDateChnage={setDate}
        />
         <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>
 );
}

export default Register;
