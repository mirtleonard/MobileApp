import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


export const CustomAlert = () => {
  const [showAlert, setShow] = React.useState(false);
  return (
  <View style={styles.container}>

      <Text>I'm AwesomeAlert</Text>
      <TouchableOpacity onPress={() => {
        setShow(true);
      }}>
        <View style={styles.button}>
          <Text style={styles.text}>Try me!</Text>
        </View>
      </TouchableOpacity>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="AwesomeAlert"
        message="I have a message for you!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, delete it"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
            setShow(false);
        }}
        onConfirmPressed={() => {
            setShow(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});
