import axios from 'axios';
import { Formik } from 'formik';
import FormData from 'form-data';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { Button, Card, Input } from 'react-native-elements';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

const options = {
  selectionLimit: 0,
  mediaType: 'photo',
}

function b64toFile(b64Data, contentType='', name) {
  const Buffer = require('buffer/').Buffer;
  const buffer = Buffer.from(b64Data, 'base64');
  const blob = new Blob([buffer], {type: contentType});
  const file = new File([blob], name)
  console.log(file);
  return file;
}

const App = (props) => {
  const [path, setPath] = useState('');
  const data = new FormData();
  return(
    <Formik
       initialValues={{ username: 'admin', branch: 'Lupișori', area: 'intelectuală', title: '', location: '',
          duration: '', participants: '', materials: '', goals: '', date: '02.07.2002',
          description: '', strengths: '', weaknesses: '', improvements: ''
       }}

       onSubmit={(values) => {
         if (data._parts[0]) {
          axios.post('http://192.168.0.103:8000/api/file/',  data, {
            'Content-Type': 'multipart/form-data'})
          .then(response => {
            console.log(response);
          }).catch(error => console.log(error));
            props.navigation.navigate('Home');
        }
        console.log(values);
        axios.post('http://192.168.0.103:8000/api/activityReport/', values)
        .then(response => {
          console.log(response);
        }).catch(error => console.log(error));

      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView>
          <Card>
            <Picker
              onValueChange={handleChange('branch')}
              selectedValue={values.branch}
              label = 'Ramură'
            >
              <Picker.Item label="Lupișori" value="Lupișori" />
              <Picker.Item label="Temerari" value="Temerari" />
              <Picker.Item label="Exploratori" value="Exploratori" />
              <Picker.Item label="Seniori" value="Seniori" />
            </Picker>

            <Picker
              onValueChange={handleChange('area')}
              selectedValue={values.area}
              label = 'Arie de dezvoltare'
              style={{

              }}
            >
              <Picker.Item label="intelectuală" value="intelectuală" />
              <Picker.Item label="spirituală" value="spirituală" />
              <Picker.Item label="caracter" value="caracter" />
              <Picker.Item label="afectivă" value="afectivă" />
              <Picker.Item label="socială" value="socială" />
              <Picker.Item label="fizică" value="fizică" />
            </Picker>

            <Input
               onChangeText={handleChange('title')}
               value={values.title}
               label='Titlu'
            />
            <Text style={{
              marginLeft: 10,
              fontWeight: 'bold',
              color: '#a19594',
            }}>
              Data:
            </Text>
            <Input
               onChangeText={handleChange('location')}
               value={values.location}
               label="Locație"
            />
            <Input
               onChangeText={handleChange('duration')}
               value={values.duration}
               label="Durată"
            />
            <Input
               onChangeText={handleChange('participants')}
               value={values.participants}
               label="Participanți"
               multiline
            />
            <Input
               onChangeText={handleChange('materials')}
               value={values.materials}
               label="Materiale necesare"
               multiline
            />
            <Input
               onChangeText={handleChange('goals')}
               value={values.goals}
               label="Obiective"
               multiline
            />
            <Input
               onChangeText={handleChange('description')}
               value={values.description}
               label="Descriere"
               multiline
            />
            <Input
               onChangeText={handleChange('strengths')}
               value={values.strengths}
               label="Puncte tari"
               multiline
            />
            <Input
               onChangeText={handleChange('weaknesses')}
               value={values.weaknesses}
               label="Puncte slabe"
               multiline
            />
            <Input
               onChangeText={handleChange('improvements')}
               value={values.improvements}
               label="Îmbunătățiri"
               multiline
            />
            <Button
            title='choose image'
            onPress={() => ImagePicker.launchImageLibrary(options, (response) => {
                for (const x in response.assets)
                    data.append('files', {
                      'uri' : response.assets[x].uri,
                      'name' : response.assets[x].fileName,
                      'type' : response.assets[x].type,
                    });
            })}
            />
            <Button
                onPress={handleSubmit}
                title = "Adaugă Raport"
            />
          </Card>
        </ScrollView>
      )}
    </Formik>
  );
}

export default App;
