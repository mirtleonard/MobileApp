import axios from 'axios';
import Reports from "../../Router.js";
import React, { useState } from "react";
import { Updates } from '../../Router.js';
import { Button, Card } from 'react-native-elements';
import { View, StyleSheet, FlatList, Text } from "react-native";

function getEventReport(navigation, id) {
    axios
    .get('http://192.168.1.9:8000/api/eventReport/' + id)
    .then(response => {
      const report = response.data;
      navigation.navigate('ViewEventReport', report);
    })
    .catch(error => console.log(error));
}

const App = (props) => {
  let [reports, setReports] = React.useState();
  const {updated} = React.useContext(Updates);
  React.useEffect(async () => {
    try {
        axios.get('http://192.168.1.9:8000/api/eventReport')
        .then(result => {
            setReports(result.data.results);
        });
    } catch(error) {
        console.log(error);
    }
  }, [updated]);

  const Item = ({ item }) => (
    <Card>
      <Card.Title> { item.title } </Card.Title>
      <Card.Divider/>
      <Text style={ {textAlign: 'center'}}>  { item.beginingDate }  </Text>
      <Text style={ {textAlign: 'center'}}>  { item.eventType }  </Text>
      <Button
        type='clear'
        title = 'See report'
        onPress = {() => getEventReport(props.navigation.getParent(), item.id)}>
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
