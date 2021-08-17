import axios from 'axios';
import Reports from "../../Router.js";
import React, { useState } from "react";
import { Button, Card } from 'react-native-elements';
import { View, StyleSheet, FlatList, Text } from "react-native";

function getActivityReport(navigation, id) {
    axios
    .get('http://192.168.1.9:8000/api/eventReport/' + id)
    .then(response => {
      const report = response.data;
      navigation.navigate('EventReport', report);
    })
    .catch(error => console.log(error));
}

const App = (props) => {
  let [reports, setReports] = React.useState();
  React.useEffect(async () => {
    try {
        axios.get('http://192.168.1.9:8000/api/eventReport')
        .then(result => {
            setReports(result.data.results);
        });
    } catch(error) {
        console.log(error);
    }
  }, []);

  const Item = ({ item }) => (
    <Card>
      <Card.Title> { item.title } </Card.Title>
      <Text>  { item.center }  </Text>
      <Button
        title = 'See report'
        onPress = {() => getActivityReport(props.navigation, item.id)}>
      </Button>
    </Card>
  );
  const renderItem = ({ item }) => (
    <Item item = { item } />
  );
  return (
    <View>
      <FlatList
        data = { reports }
        renderItem = { renderItem }
      />
    </View>
  );
}

export default App;
