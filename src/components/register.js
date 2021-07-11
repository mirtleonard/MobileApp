import React, { useState } from "react";
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker';
import { Button, TextInput, View, Picker } from 'react-native';

const Register = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState(new Date())
  return(
  <Formik
     initialValues={{ email: '', password: '', name: '', confirm_passowrd: '' }}
     onSubmit={values => console.log(values)}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
           onChangeText={handleChange('name')}
           placeholder="Nume"
           onBlur={handleBlur('name')}
           value={values.name}
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
