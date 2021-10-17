import React from 'react';
import { Button } from 'react-native-elements';
import DateTimePicker from 'react-native-date-picker';
import {StyleSheet, View, Text, Platform} from 'react-native';


const App = (props) => {
  const [date, setDate] = React.useState(new Date(props.value));
  const [isPickerShow, setIsPickerShow] = React.useState(false);
  React.useEffect(() => props.onChange({target: {name: 'date', value: date}}),[]);

  const changePickerState = () => {
    setIsPickerShow(!isPickerShow);
  };

  const onChange = (value) => {
    props.onChange({target: {name: props.name, value: value}});
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
