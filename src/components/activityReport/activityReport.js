import axios from 'axios';
import React from 'react';
import { Button, Card } from 'react-native-elements';
import { View, StyleSheet, FlatList, Text } from "react-native";

const App = (props) => {
  const report = props.route.params.report;
  return (
    <View>
      <Card>
        <Text> { report.id } </Text>
      </Card>
    </View>
  );
}

export default App;
