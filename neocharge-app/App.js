import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
<<<<<<< HEAD
import TestAPI from './TestAPI';
import UserInput from './UserInput';
import GraphComponent from './GraphComponent';
=======
import AppNavigator from './navigation/AppNavigator';
>>>>>>> 7ad03ce40c237740242af84f90cd832934e93586

Amplify.configure(aws_exports);

export default function App() {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      {/* <Text>Welcome!</Text>
      <Button
        title='Add User'
        onPress={() => Alert.alert('Simple Button pressed')}
      /> */}
      <TestAPI />
      <GraphComponent />
=======
      <AppNavigator />
>>>>>>> 7ad03ce40c237740242af84f90cd832934e93586
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
