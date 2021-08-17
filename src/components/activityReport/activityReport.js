import axios from 'axios';
import React from 'react';
import { AuthState } from '../auth/context';
import { Button, Card, Image, Text } from 'react-native-elements';
import { ScrollView, StyleSheet, FlatList, Alert } from "react-native";

const App = (props) => {
  const report = props.route.params;
  const data = React.useContext(AuthState);
  return (
    <ScrollView>
      <Card>
        <Card.Title style={{flexDirection: 'row'}}>
          <Image source={require('../../assets/scout.png')}
            style={{width:200, height:60}} />
          <Image source={require('../../assets/logo.png')}
            style={{width:70, height:70}} />
        </Card.Title>
        <Card.Divider/>
        <Text h3 style={{textAlign:'center'}}> { report.title } {'\n'} </Text>
        <Text> <Text style={styles.boldText}> Ramura de vârstă: </Text> <Text style={styles.text}>  {report.branch} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Aria de dezvoltare: </Text> <Text style={styles.text}> {report.areas} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Loc de desfășurare: </Text> <Text style={styles.text}> {report.location} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Data: </Text> <Text style={styles.text}> {report.date} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Număr de participanți: </Text> <Text style={styles.text}> {report.participants} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Materiale necesare:{'\n'} </Text> <Text style={styles.text}> {report.materials} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Obiectivele activității:{'\n'} </Text> <Text style={styles.text}> {report.goals} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Descrierea activității:{'\n'} </Text> <Text style={styles.text}> {report.description} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Puncte tari:{'\n'} </Text> <Text style={styles.text}> {report.strengths} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Puncte slabe:{'\n'} </Text> <Text style={styles.text}> {report.weaknesses} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Îmbunătățiri:{'\n'} </Text> <Text style={styles.text}> {report.improvements} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Raport realizat de: </Text> <Text style={styles.text}> {report.username} {'\n'} </Text> </Text>
        <Card.Divider/>
        <Button
          onPress={() => {
            if (report.username == data.user.username)
              props.navigation.navigate('EditActivityReport', report);
            else
              Alert.alert("Eroare", "Doar creatorul poate edita!");
          }}
          title="Editează"
        />
        <Button
          onPress={() => {
            if (report.username == data.user.username) {
              axios.delete('http://192.168.1.9:8000/api/activityReport/' + report.id + '/')
              .then(response => {
                  props.navigation.navigate('Meniu');
              }).catch(error => {
                console.log(error)
            })} else {
              Alert.alert("Eroare", "Doar creatorul poate edita!");
            }}}
          title="Șterge"
        />
      </Card>
    </ScrollView>
  );
}

export default App;

const styles = StyleSheet.create({
  text : {
      fontSize: 18,
  },
  boldText : {
      fontSize: 18,
      fontWeight: 'bold',
  }
})
