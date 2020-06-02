import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import AppNavigator from './navigation/AppNavigator';

Amplify.configure(aws_exports);

// This line disables the redbox with stacktrace for all console.error messages.
console.reportErrorsAsExceptions = false;

export default function App() {
  Expo.Font.loadAsync({
    'RedHatDisplay-Regular': require('./assets/fonts/RedHatDisplay-Regular.ttf'),
    'RedHatDisplay-Bold': require('./assets/fonts/RedHatDisplay-Bold.ttf'),
  });

  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
