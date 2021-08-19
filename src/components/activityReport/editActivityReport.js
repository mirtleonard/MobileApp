import axios from 'axios';
import { Formik } from 'formik';
import FormData from 'form-data';
import DatePicker from '../date';
import React, { useState } from 'react';
import { Dates } from '../../Router.js';
import { Updates } from '../../Router.js';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button, Card, Text, Input, Image } from 'react-native-elements';

function getValue(x) {
  const {id, ...y} = x;
  return y;
}

const App = (props) => {
  let date = new Date(Date.now());
  date = new Date();
  const { updated, setUpdated } = React.useContext(Updates);
  const form = new FormData();
  const id =  props.route.params ?  JSON.stringify(props.route.params.id) + '/' : '';
  const data = props.route.params ? getValue(props.route.params) : {
        username: 'admin',
        branch: 'Lupișori',
        areas: 'intelectuală',
        title: '',
        location: '',
        duration: '',
        participants: '',
        materials: '',
        goals: '',
        date: new Date('2021-01-01'),
        description: '',
        strengths: '',
        weaknesses: '',
        improvements: '',
    }
  return(
    <Formik
       initialValues={data}
       onSubmit={(values) => {
        axios({method: id ? 'put' : 'post', url: 'http://192.168.1.9:8000/api/activityReport/' + id, data : values})
        .then(response => {
          if (form._parts[0]) {
            form.append('type', 'activity');
            form.append('id', response.data.id);
            axios.post('http://192.168.1.9:8000/api/file/',  form, {
              'Content-Type': 'multipart/form-data'})
              .then(response => {
                console.log(response);
              }).catch(error => console.log(error));
          }
        setUpdated(!updated);
        let parent = props.navigation.getParent();
        if (parent) {
          //parent =  parent.getParent()
          parent.jumpTo('Profile');
        } else
          props.navigation.navigate('Dashboard');
        }).catch(error => {
          console.log(error);
          Alert.alert("Eroare", "Nu ați introdus toate datele!");
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView>
          <Card>
            <Card.Title style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/scout.png')}
                style={{width:200, height:60}} />
              <Image source={require('../../assets/logo.png')}
                style={{width:70, height:70}} />
            </Card.Title>
            <Card.Divider/>

            <Text style={styles.text}>
              Ramură:
            </Text>

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

            <Text style={styles.text}>
              Arie de dezvoltare:
            </Text>

            <Picker
              onValueChange={handleChange('areas')}
              selectedValue={values.areas}
              label = 'Arie de dezvoltare'

            >
              <Picker.Item label="Intelectuală" value="intelectuală" />
              <Picker.Item label="Spirituală" value="spirituală" />
              <Picker.Item label="Caracter" value="caracter" />
              <Picker.Item label="Afectivă" value="afectivă" />
              <Picker.Item label="Socială" value="socială" />
              <Picker.Item label="Fizică" value="fizică" />
            </Picker>
            <Input
               onChangeText={handleChange('title')}
               value={values.title}
               label='Titlu'
            />
            <Text style={styles.text}>
              Data:
            </Text>
            <DatePicker
              value={values.date}
              mode="date"
              name='date'
              onChange={handleChange}
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
            <Text style={styles.text}>
              Imagini:
            </Text>
            <Button
              title='choose image'
              buttonStyle={{padding:20}}
              type='clear'
              onPress={() => ImagePicker.launchImageLibrary({ selectionLimit: 0, mediaType: 'photo',},
                (response) => {
                  for (const x in response.assets)
                      form.append('files', {
                        'uri' : response.assets[x].uri,
                        'name' : response.assets[x].fileName,
                        'type' : response.assets[x].type,
                      });
              })}
            />
            <Button
                buttonStyle={{backgroundColor: '#55a0d9'}}
                onPress={handleSubmit}
                title="Adaugă Raport"
            />
          </Card>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  text:{
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#8f989f',
  }
});

export default App;
