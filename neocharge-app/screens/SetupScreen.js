import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';
import OnboardingLogo from '../components/OnboardingLogo';
import OnboardingInput from '../components/OnboardingInput';

const SetupScreen = props => {

  return (
    <View>
      <View style={styles.logoContainer}>
        <OnboardingLogo />
      </View>
      <View style={styles.infoContainer}>
        <OnboardingInput />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Continue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 1
  },
  addGoalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
});

export default SetupScreen;