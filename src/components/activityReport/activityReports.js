import axios from 'axios';
import React, { useState } from "react";
import { Updates } from '../../Router.js';
import { Button, Card } from 'react-native-elements';
import { View, FlatList, Text } from "react-native";

function getActivityReport(navigation, id) {
    axios
    .get('http://192.168.1.9:8000/api/activityReport/' + id)
    .then(response => {
      navigation.navigate('ViewActivityReport', response.data);
    })
    .catch(error => console.log(error));
}

const App = (props) => {
  const [reports, setReports] = React.useState();
  const {updated} = React.useContext(Updates);
  React.useEffect(async () => {
    try {
        axios.get('http://192.168.1.9:8000/api/activityReport')
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
      <Text style={{textAlign: 'center'}}>  { item.branch }  </Text>
      <Text style={{textAlign: 'center'}}>  { item.date }  </Text>
      <Button
        type='clear'
        title = 'Vezi raport'
        onPress = {() => getActivityReport(props.navigation.getParent(), item.id)}>
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
