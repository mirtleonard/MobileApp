import { Button, Input, Card, Image } from 'react-native-elements';
import { ScrollView, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import  DatePicker from 'react-native-datepicker';
import { Updates } from '../../Router.js';
import { Formik } from 'formik';
import axios from 'axios';
import React from 'react';


function getValue(x) {
  const {id, ...y} = x;
  return y;
}

const App = (props) => {
  const { updated, setUpdated } = React.useContext(Updates);
  const form = new FormData();
  const id =  props.route.params ?  JSON.stringify(props.route.params.id) + '/' : '';
  const data = props.route.params ? getValue(props.route.params) : {
        username: 'admin',
        center: 'Centrul Local AMD Pildești',
        eventType: 'Local, Regional, Național, Internațional',
        title: '',
        location: '',
        members: '',
        description: '',
    }
  return (
    <Formik
        initialValues={data}
        onSubmit={(values) => {
        axios({method: id ? 'put' : 'post', 'url': 'http://192.168.1.9:8000/api/eventReport/' + id, 'data': values})
        .then(response => {
          if (form._parts[0]) {
            form.append('type', 'event');
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
          props.navigation.navigate('Meniu');
        }).catch(error => console.log(error));
          Alert.alert("Eroare", "Nu ați introdus toate datele!");
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
            <Input
               onChangeText={handleChange('center')}
               value={values.center}
               label='Centru'
            />
            <Input
               onChangeText={handleChange('title')}
               value={values.title}
               label='Titlu'
            />
            <Input
               onChangeText={handleChange('eventType')}
               value={values.eventType}
               label='Tip de eveniment'
            />
            <Input
               onChangeText={handleChange('members')}
               value={values.members}
               label='Participanți'
            />
            <Input
               onChangeText={handleChange('location')}
               value={values.location}
               label='Locație'
            />
            <Input
               onChangeText={handleChange('description')}
               value={values.description}
               label='Descriere'
               multiline
            />
            <Button
              title = 'choose image'
              type='clear'
              onPress = {() => ImagePicker.launchImageLibrary({selectionLimit: 0, mediaType: 'photo',},
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
              onPress={handleSubmit}
              title = 'Adaugă Raport'
            />
          </Card>
        </ScrollView>
      )}
    </Formik>
  );
}

export default App;
