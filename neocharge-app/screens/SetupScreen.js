import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';
import OnboardingLogo from '../components/OnboardingLogo';
import OnboardingInput from '../components/OnboardingInput';
import { API, Auth } from 'aws-amplify';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


class SetupScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: this.props.navigation.state.params.userEmail,
      deviceID: '', timeZone: '',
      primaryDevice: '',
      secondaryDevice: '',
      pushToken: ''
    }

    this.timeZoneHandler = this.timeZoneHandler.bind(this);
    this.primDevHandler = this.primDevHandler.bind(this);
    this.secDevHandler = this.secDevHandler.bind(this);
    this.setDeviceIDHandler = this.setDeviceIDHandler.bind(this);
    this.logOnboardingInfo = this.logOnboardingInfo.bind(this);
  }

  componentDidMount() {
    registerForPushNotificationsAsync(this.state.userEmail).then(value => {
      this.state.pushToken = value;
    });
    console.log(this.state.pushToken);
    console.log(typeof this.state.pushToken);
  }


  timeZoneHandler(selectedVal) {
    this.setState({ timeZone: selectedVal });
  };

  primDevHandler(selectedVal) {
    this.setState({ primaryDevice: selectedVal });
  };

  secDevHandler(selectedVal) {
    this.setState({ secondaryDevice: selectedVal });
  };

  setDeviceIDHandler(device) {
    this.setState({ deviceID: device });
  }

  async hasValidDeviceID() {
    let jsonObj = {
      "deviceID": this.state.deviceID
    };
    const path = "/deviceid"; // path from root of API
    const apiResponse = await API.get("LambdaProxy", path, jsonObj); //replace the desired API name
    console.log("response: " + apiResponse);
  }

  async logOnboardingInfo() {
    console.log("userEmail: " + this.state.userEmail);
    console.log("timeZone: " + this.state.timeZone);
    console.log("primaryDevice: " + this.state.primaryDevice);
    console.log("secondaryDevice: " + this.state.secondaryDevice);
    console.log("deviceID: " + this.state.deviceID);


    let requestBody = {
      "userEmail": this.state.userEmail, "timeZone": this.state.timeZone,
      "primaryDevice": this.state.primaryDevice, "secondaryDevice": this.state.secondaryDevice,
      "deviceID": this.state.deviceID, "pushToken": this.state.pushToken
    };
    let jsonObj = {
      body: requestBody
    }
    const path = "/user"; // path from root of API

    console.log(this.state.pushToken);
    console.log(typeof this.state.pushToken);

    const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the desired API name
    console.log(apiResponse);
    this.props.navigation.navigate('App');

  };


  render() {
    return (
      <View>
        <View style={styles.logoContainer}>
          <OnboardingLogo />
        </View>
        <View style={styles.infoContainer}>
          <OnboardingInput
            primDevHandler={this.primDevHandler.bind(this)}
            timeZoneHandler={this.timeZoneHandler.bind(this)}
            secDevHandler={this.secDevHandler.bind(this)}
            setDeviceIDHandler={this.setDeviceIDHandler.bind(this)} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Continue" onPress={this.logOnboardingInfo} />
        </View>
      </View>
    );
  };
}

async function registerForPushNotificationsAsync(userEmail) {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // only asks if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  // On Android, permissions are granted on app installation, so
  // `askAsync` will never prompt the user

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log("value is " + token);
  console.log("type is " + typeof token);

  return token;
  //if (!userHasToken()) {
  //logPushNotifcationToken(token, userEmail);
  //}


};

async function logPushNotifcationToken(token, userEmail) {

  console.log(token)
  console.log(typeof token)


  let requestBody = { "pushToken": token, "userEmail": userEmail };
  let jsonObj = {
    body: requestBody
  }
  const path = "/pushtoken"; // you can specify the path
  const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the API name
  console.log(apiResponse);
  //this.props.navigation.navigate('App');

};


//TODO: write a function to see if the user has a token already
//do we want to prompt the user every time they open the app if they aren't set up with push notifications??
//return true if user has token associated, false if no token associated.
async function userHasToken() {
  //return false for now
  return false;
}

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