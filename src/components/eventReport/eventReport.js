import axios from 'axios';
import React from 'react';
import { Updates } from '../../Router';
import { AuthState } from '../../Router';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Button, Card, Image, Text } from 'react-native-elements';
import { ScrollView, StyleSheet, FlatList, View, Alert } from "react-native";

const App = (props) => {
  const report = props.route.params;
  const data = React.useContext(AuthState);
  const [show, setShow] = React.useState(false);
  const {updated, setUpdated} = React.useContext(Updates);
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
        <Text> <Text style={styles.boldText}> Centru: </Text> <Text style={styles.text}>  {report.center} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Tip eveniment: </Text> <Text style={styles.text}> {report.eventType} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Participanți: </Text> <Text style={styles.text}> {report.members} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Descrierea evenimentului:{'\n'} </Text> <Text style={styles.text}> {report.description} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Loc de desfășurare: </Text> <Text style={styles.text}> {report.location} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Data de început: </Text> <Text style={styles.text}> {report.beginingDate} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Data de sfârșit: </Text> <Text style={styles.text}> {report.endDate} {'\n'} </Text> </Text>
        <Text> <Text style={styles.boldText}> Raport realizat de: </Text> <Text style={styles.text}> {report.username} {'\n'} </Text> </Text>
        <Card.Divider/>
        <AwesomeAlert
          show={show}
          showProgress={true}
          title={report.title}
          message="Sigur vrei să ștergi raportul?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Anulează"
          confirmText="Șterge"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
              setShow(false);
          }}
          onConfirmPressed={() => {
            setShow(false);
            axios.delete('http://192.168.1.9:8000/api/eventReport/' + report.id + '/')
                .then(response => {
                    setUpdated(!updated);
                    props.navigation.navigate('Meniu');
                }).catch(error => {
                  console.log(error)
            });
          }}
        />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Button
            buttonStyle ={{
              margin: 10,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 5,
              backgroundColor: '#55a0d9',

            }}
            onPress={() => {
              if (report.username == data.user.username)
                props.navigation.navigate('EditEventReport', report);
              else
                Alert.alert("Eroare", "Doar creatorul poate edita!");
            }}
            title="Editează"
          />
          <Button
            color='#fc0303'
            buttonStyle ={{
              margin: 10,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 5,
              backgroundColor: 'red',
            }}
            onPress={() => {
              if (report.username == data.user.username) {
                setShow(true);
              } else {
                Alert.alert("Eroare", "Doar creatorul poate edita!");
              }}}
            title="Șterge"
          />
          </View>
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
