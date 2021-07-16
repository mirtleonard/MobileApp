import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

function getActivityReports(navigation, url){
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
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.container}>
      <Card>
        <Button
          title = 'See activity reports'
          onPress = {() => getActivityReports(navigation, 'http://192.168.1.9:8000/api/activityReport')}>
        </Button>
        <Button
          title = 'See event reports'
          onPress = {() => getActivityReports(navigation, 'http://192.168.1.9:8000/api/eventReport')}>
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
