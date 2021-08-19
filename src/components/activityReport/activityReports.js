import axios from 'axios';
import React, { useState } from "react";
import { Updates } from '../../Router.js';
import { Picker } from '@react-native-picker/picker';
import { Button, Card, Input } from 'react-native-elements';
import { View, FlatList, Text, StyleSheet, ScrollView } from "react-native";

function getActivityReport(navigation, id) {
    axios
    .get('http://192.168.1.9:8000/api/activityReport/' + id)
    .then(response => {
      navigation.navigate('ViewActivityReport', response.data);
    })
    .catch(error => console.log(error));
}

const App = (props) => {
  const [reports, setReports] = React.useState('');
  const [branch, setBranch] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [area, setArea] = React.useState('');
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

  function filter(data) {
    let filtered = [];
    for (const x in data) {
      if (data[x].title.toUpperCase().includes(title.toUpperCase()))
        if (data[x].branch.toUpperCase().includes(branch.toUpperCase()))
          if (data[x].areas.toUpperCase().includes(area.toUpperCase()))
            if (data[x].username.toUpperCase().includes(username.toUpperCase()))
              filtered.push(data[x]);
    }
    return filtered;
  }

  const renderItem = ({ item }) => (
      <Item item = { item } />
  );

  const Filter = () => (
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

        <Text style={styles.text}>
          Ramură:
        </Text>

        <Picker
          onValueChange={setBranch}
          selectedValue={branch}
          label = 'Ramură'
        >
          <Picker.Item label="Selectează" value="" />
          <Picker.Item label="Lupișori" value="Lupișori" />
          <Picker.Item label="Temerari" value="Temerari" />
          <Picker.Item label="Exploratori" value="Exploratori" />
          <Picker.Item label="Seniori" value="Seniori" />
        </Picker>

        <Text style={styles.text}>
          Arie de dezvoltare:
        </Text>

        <Picker
          onValueChange={setArea}
          selectedValue={area}
          label = 'Arie de dezvoltare'
        >
          <Picker.Item label="Intelectuală" value="intelectuală" />
          <Picker.Item label="Spirituală" value="spirituală" />
          <Picker.Item label="Caracter" value="caracter" />
          <Picker.Item label="Afectivă" value="afectivă" />
          <Picker.Item label="Socială" value="socială" />
          <Picker.Item label="Fizică" value="fizică" />
          <Picker.Item label="Selectează" value="" />
        </Picker>

      </Card>
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

const styles = StyleSheet.create({
  text:{
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
    color: '#8f989f',
  }
});


export default App;
