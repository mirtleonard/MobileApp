import { Button } from 'react-native-elements';
import { View } from 'react-native';
import React from 'react';


const App = () => {
  const options = { noData: true, }
  return (
    <View>
      <Button
        title = 'choose image'
        onPress = {() => ImagePicker.launchImageLibrary(options, (response) => {
            console.log("response", response);
        })}>
      </Button>
    </View>
  );
}

export default App;
