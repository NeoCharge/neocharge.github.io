import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';
import OnboardingLogo from '../components/OnboardingLogo';
import OnboardingInput from '../components/OnboardingInput';
import { API } from 'aws-amplify';




class PushNotifInitScreen extends React.Component {

  componentDidMount() {
    registerForPushNotificationsAsync();
  }


  render() {
    return (
      <View>

      </View>
    );
  };
}

async function registerForPushNotificationsAsync() {
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
  console.log(token);
  console.log(typeof token);
  logPushNotifcationToken(token);


};

async function logPushNotifcationToken(token) {

  console.log("here\n");
  console.log(token)
  console.log(typeof token)


  let requestBody = { "pushToken": token };
  let jsonObj = {
    body: requestBody
  }
  const path = "/pushtoken"; // you can specify the path
  const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the API name
  console.log(apiResponse);
  //this.props.navigation.navigate('App');

};


export default PushNotifInitScreen;