import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

function getReports(navigation, url){
  axios
    .get(url)
    .then(response => {
      const reports = response.data;
      if (url == 'http://192.168.1.9:8000/api/activityReport')
        navigation.navigate('ActivityReports', {reports});
      else
        navigation.navigate('EventReports', {reports});
    })
    .catch(error => console.log(error));
}

const App = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card>
        <Button
          title = 'See activity reports'
          onPress = {() => getReports(navigation, 'http://192.168.1.9:8000/api/activityReport')}>
        </Button>
        <Button
          title = 'See event reports'
          onPress = {() => getReports(navigation, 'http://192.168.1.9:8000/api/eventReport')}>
        </Button>
        <Button
          title = 'Edit activity reports'
          onPress = {() => navigation.navigate('EditActivityReport')}>
        </Button>
        <Button
          title = 'Edit event reports'
          onPress = {() => navigation.navigate('EditEventReport')}>
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});

export default App;
