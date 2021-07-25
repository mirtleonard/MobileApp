import React from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { Button } from 'react-native-elements';
import { View } from 'react-native';


const App = () => {
  const options = { mediaType: 'photo'};
  return (
    <View>
      <Button
        title = 'choose image'
        onPress = {() => ImagePicker.launchImageLibrary(options, response = (response) => {
            console.log("response", response);
        })}>
      </Button>
    </View>
  );
}

export default App;
