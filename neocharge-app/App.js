import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import TestAPI from './TestAPI';
import UserInput from './UserInput';
import GraphComponent from './GraphComponent';

Amplify.configure(aws_exports);

export default function App() {
  return (

    <View style={styles.container}>
      {/* <Text>Welcome!</Text>
      <Button
        title='Add User'
        onPress={() => Alert.alert('Simple Button pressed')}
      /> */}
      <TestAPI />
      <GraphComponent />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
