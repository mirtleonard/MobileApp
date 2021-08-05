import { ScrollView, Text, StyleSheet } from 'react-native';
import { Button, Input, Card } from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import  DatePicker from 'react-native-datepicker';
import { Formik } from 'formik';
import axios from 'axios';
import React from 'react';


const App = () => {
  const options = { selectionLimit: 0, }
  return (
    <Formik
        initialValues={{ username: 'admin', branch: 'Lupișori', area: 'intelectuală', title: '', location: '',
          duration: '', participants: '', materials: '', goals: '', date: new Date(),
          description: '', strengths: '', weaknesses: '', improvements: ''
       }}
       onSubmit={(values) => {
         console.log(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView>
          <Card>
            <Input
               onChangeText={handleChange('title')}
               value={values.title}
               label='Centru'
            />
            <Input
               onChangeText={handleChange('duration')}
               value={values.duration}
               label="Titlu"
            />
            <Input
               onChangeText={handleChange('duration')}
               value={values.duration}
               label="Participanți"
            />
            <Input
               onChangeText={handleChange('location')}
               value={values.location}
               label="Locație"
            />
            <Input
               onChangeText={handleChange('duration')}
               value={values.duration}
               label="Descriere"
               multiline
            />
            <Button
              title = 'choose image'
              onPress = {() => ImagePicker.launchImageLibrary(options, (response) => {
                  axios.post('http://192.168.1.9:8000/api/activityReport/', response.assets)
                  .then(response => {
                    console.log(response);
                  }).catch(error => console.log(error));
              })}>
            </Button>
            <Button
              onPress={handleSubmit}
              title = "Adaugă Raport" >
            </Button>
          </Card>
        </ScrollView>
      )}
    </Formik>
  );
}

export default App;
