import axios from 'axios';
import Reports from "../../Router.js";
import React, { useState } from "react";
import { Updates } from '../../Router.js';
import { Button, Card, Input } from 'react-native-elements';
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
  const [reports, setReports] = React.useState();
  const [title, setTitle] = React.useState('');
  const [username, setUsername] = React.useState('');
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

  function filter(data) {
    let filtered = [];
    for (const x in data) {
      if (data[x].title.toUpperCase().includes(title.toUpperCase()))
        if (data[x].username.toUpperCase().includes(username.toUpperCase()))
          filtered.push(data[x]);
    }
    return filtered;
  }

const Filter = () => {
  return(
      <Card>
        <Card.Title style={{textAlign: 'center'}}>
          Filtre
        </Card.Title>
        <Input
           onChangeText={setUsername}
           value={username}
           label="Creator"
        />
        <Input
           onChangeText={setTitle}
           value={title}
           label="Titlu"
        />
      </Card>
    );
}

  const renderItem = ({ item }) => (
    <Item item = { item } />
  );
  return (
    <View>
      <FlatList
        ListHeaderComponent={Filter}
        data = { filter(reports) }
        renderItem = { renderItem }
      />
    </View>
  );
}

export default App;
