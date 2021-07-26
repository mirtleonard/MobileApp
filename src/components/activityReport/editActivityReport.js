import axios from 'axios';
import React from "react";
import { Formik } from 'formik';
import  DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import { Button, Card, Input } from 'react-native-elements';
import { View, StyleSheet, Text, ScrollView } from "react-native";

const App = (props) => {
  return(
    <Formik
       initialValues={{ username: 'admin', branch: 'Lupișori', area: 'intelectuală', title: '', location: '',
          duration: '', participants: '', materials: '', goals: '', date: new Date(),
          description: '', strengths: '', weaknesses: '', improvements: '',
       }}
       onSubmit={(values) => {
         console.log(values);
         axios
          .post('http://192.168.1.9:8000/api/activityReport/', values)
          .then(response => {
            props.navigation.navigate('Home');
        })
        .catch(error => console.log(error));
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
            <DatePicker
              style={{width: '100%', margin:10, marginBottom:20}}
              useNativeDriver={true}
              date={values.date}
              mode="date"
              placeholder="select date"
              onDateChange={handleChange('date')}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  borderBottomWidth: 2,
                },
                dateText: {
                  fontSize: 20
                }
              }}
            />
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
