import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';
import OnboardingLogo from '../components/OnboardingLogo';
import OnboardingInput from '../components/OnboardingInput';
import { API } from 'aws-amplify';

const SetupScreen = props => {

  const [deviceID, setDeviceID] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [primaryDevice, setPrimaryDevice] = useState('');
  const [secondaryDevice, setSecondaryDevice] = useState('');



  const timeZoneHandler = (selectedVal) => {
      setTimeZone(selectedVal);
  };

  const primDevHandler = (selectedVal) => {
      setPrimaryDevice(selectedVal);
  };

  const secDevHandler = (selectedVal) => {
      setSecondaryDevice(selectedVal);
  };

  const setDeviceIDHandler = (device) => {
    setDeviceID(device);
  }

  async function logOnboardingInfo() {
    console.log("timeZone: " + timeZone);
    console.log("primaryDevice: " + primaryDevice);
    console.log("secondaryDevice: " + secondaryDevice);
    console.log("deviceID: " + deviceID);

    let requestBody = {"timeZone":timeZone, "primaryDevice":primaryDevice, "secondaryDevice":secondaryDevice, "deviceID":deviceID};
    let jsonObj = {
      body:requestBody
    }
    const path = "/user"; // you can specify the path
    const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the API name
    console.log(apiResponse);
  };

  return (
    <View>
      <View style={styles.logoContainer}>
        <OnboardingLogo />
      </View>
      <View style={styles.infoContainer}>
        <OnboardingInput 
        primDevHandler={primDevHandler} 
        timeZoneHandler={timeZoneHandler} 
        secDevHandler={secDevHandler}
        setDeviceIDHandler={setDeviceIDHandler}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Continue" onPress={logOnboardingInfo}/>
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