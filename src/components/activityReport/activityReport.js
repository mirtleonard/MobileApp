import axios from 'axios';
import React from 'react';
import { Updates } from '../../Router';
import { AuthState } from '../../Router';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Card, Image, Text, Button } from 'react-native-elements';
import { ScrollView, StyleSheet, FlatList, Alert, View } from "react-native";

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
        <AwesomeAlert
          show={show}
          showProgress={false}
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
            axios.delete('http://192.168.1.9:8000/api/activityReport/' + report.id + '/')
                .then(response => {
                    setUpdated(!updated);
                    props.navigation.navigate('Dashboard');
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
                props.navigation.navigate('EditActivityReport', report);
              else
                Alert.alert("Eroare", "Doar creatorul poate edita!");
            }}
            title="Editează"
          />
          <Button
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
