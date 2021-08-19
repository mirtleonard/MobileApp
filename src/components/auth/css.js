import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    margin:15,
    height:40,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#428AF8',
  },
  btnEnter: {
    justifyContent : 'center',
    flexDirection: 'row',
    backgroundColor: '#5BC0DE',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    padding: 10,
  }
});

export default styles;
