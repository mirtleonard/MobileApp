import axios from 'axios';
import React, { useState } from "react";
import { Button, Card } from 'react-native-elements';
import { View, StyleSheet, FlatList, Text } from "react-native";

function getActivityReport(navigation, id) {
    axios
    .get('http://192.168.1.9:8000/api/eventReport/' + id)
    .then(response => {
      const report = response.data;
      navigation.navigate('EventReport', {report});
    })
    .catch(error => console.log(error));
}

const App = (props) => {
  const Item = ({ item }) => (
    <Card>
      <Card.Title> { item.title } </Card.Title>
      <Text>  { item.branch }  </Text>
      <Button
        title = 'See report'
        onPress = {() => getActivityReport(props.navigation, item.id)}>
      </Button>
    </Card>
  );
  const reports = props.route.params.reports.results;
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
