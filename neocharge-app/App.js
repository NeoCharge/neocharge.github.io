import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import UserInput from './UserInput';
import AppNavigator from './navigation/AppNavigator';
import GreetingScreen from './screens/GreetingScreen';
import SetupScreen from './screens/SetupScreen';

Amplify.configure(aws_exports);

// This line disables the redbox with stacktrace for all console.error messages.
console.reportErrorsAsExceptions = false;

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator/>
    </View>
  );
}

/*export default function App() {
  return (
    <View style={styles.container}>
      <SetupScreen/>
    </View>
  );
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
