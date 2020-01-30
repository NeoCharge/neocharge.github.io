import React from 'react';
import { StyleSheet, View } from 'react-native';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import AppNavigator from './navigation/AppNavigator';
import GreetingScreen from './screens/GreetingScreen';
import SetupScreen from './screens/SetupScreen';

Amplify.configure(aws_exports);

/*export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}*/

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
