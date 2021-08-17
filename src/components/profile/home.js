import axios from 'axios';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-elements';

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
      <Text h3> Welcome </Text>
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
