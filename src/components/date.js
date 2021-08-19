import React from 'react';
import { Button } from 'react-native-elements';
import DateTimePicker from 'react-native-date-picker';
import {StyleSheet, View, Text, Platform} from 'react-native';


const App = (props) => {
  const [isPickerShow, setIsPickerShow] = React.useState(false);
  const [date, setDate] = React.useState(new Date(Date.now()));

  const changePickerState = () => {
    setIsPickerShow(!isPickerShow);
  };

  const onChange = (value) => {
    setDate(value);
  };

  return (
    <View>
    {!isPickerShow && (
      <View style={styles.container}>
        {/* Display the selected date */}
        <View style={styles.pickedDateContainer}>
          <Text style={styles.pickedDate}>{date.toUTCString()}</Text>
        </View>

        {/* The button that used to trigger the date picker */}
        <View style={styles.btnContainer}>
          <Button type="clear" title="Schimbă Data" onPress={changePickerState} />
        </View>
      </View>
    )}
      {/* The date picker */}
    {isPickerShow && (
      <View>
        <DateTimePicker
          date={date}
          mode={props.mode}
          onDateChange={onChange}
          style={styles.datePicker}
        />
        <View style={styles.btnContainer}>
          <Button type="clear" title="Done" onPress={changePickerState} />
        </View>
      </View>
    )}
    </View>
  );
};

// just add some styles to make our app look more beautiful
// This is not the focus of this article
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  pickedDateContainer: {
    borderRadius: 10,
  },
  pickedDate: {
    fontSize: 17,
    color: 'black',
  },
  button: {

  },
  btnContainer: {
    padding: 10,
  },
  // This only works on iOS
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default App;
