import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import UserInput from './UserInput';
import AppNavigator from './navigation/AppNavigator';
import GreetingScreen from './screens/GreetingScreen';

Amplify.configure(aws_exports);

/*export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator/>
    </View>
  );
}*/

export default function App() {
  return (
    <View style={styles.container}>
      <GreetingScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
