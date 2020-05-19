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
      pushToken: '',
      hasLoggedData: false
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
    this.setState({ deviceID: device.toUpperCase() });
  }

  // TODO is this function necessary? there is another "hasValidDeviceID()" that is being used
  // that takes in the deviceID as a parameter. -josh
  async hasValidDeviceID() {
    let jsonObj = {
      "deviceID": this.state.deviceID
    };
    const path = "/deviceid"; // path from root of API
    const apiResponse = await API.get("LambdaProxy", path, jsonObj); //replace the desired API name
    console.log("response: " + apiResponse);
  }

  async logOnboardingInfo() {

    //check to see if the user has already clicked the continue button
    //if they have, then don't enter, because it will create another user entry in the DB
    if (!this.state.hasLoggedData) {
      console.log("userEmail: " + this.state.userEmail);
      console.log("timeZone: " + this.state.timeZone);
      console.log("primaryDevice: " + this.state.primaryDevice);
      console.log("secondaryDevice: " + this.state.secondaryDevice);
      console.log("deviceID: " + this.state.deviceID);

      // check that user has filled out all fields
      if(this.state.deviceID == '' || this.state.timeZone == '' || 
        this.state.primaryDevice == '' || this.state.secondaryDevice == '') {
          console.log("user left at least one field blank");
          alert("Please fill out every field.");
          return;
      }

      console.log(this.state.pushToken);
      console.log(typeof this.state.pushToken);

      // TODO is there a reason we should still leave this here for testing? -josh
      //let devID = "XSD-934859734-TTYZ";

      let hasValidID = await validDeviceIDCheck(this.state.deviceID);

      if (hasValidID) {
        let requestBody = {
          "userEmail": this.state.userEmail, "timeZone": this.state.timeZone,
          "primaryDevice": this.state.primaryDevice, "secondaryDevice": this.state.secondaryDevice,
          "deviceID": this.state.deviceID, "pushToken": this.state.pushToken
        };
        let jsonObj = {
          "body": requestBody
        }
        const path = "/user";
        const apiResponse = await API.put("LambdaProxy", path, jsonObj) //replace the desired API name
        .then(() => {
          console.log(apiResponse);
          this.state.hasLoggedData = true;
          this.props.navigation.navigate('App');
         })
        .catch(error => {
          console.log(error.code);
          alert("Something went wrong while setting up your account.\n" +
                "Please send an email to thejuicerzcapstone@gmail.com if this problem persists.");
        });
      }
    }
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

/*
// Returns true if the deviceID exists in our database.
// Returns false if it does not.
async function validDeviceIDCheck(deviceID) {
  const path = "/deviceid"; // you can specify the path

  console.log("path is " + path);
  let valid = await API.get("LambdaProxy", path,
    {
      "queryStringParameters": {
        "deviceID": deviceID
      }
    }).catch(error => { console.log(error.response) });

  console.log("response type: " + (typeof valid));

  console.log("api response: " + valid);
  return valid;
}
*/

// TODO NOTICE: I am using the 'patch' method as a way of avoiding making changes to
// the production environment Alpha Testers are using. Before our next deployment, we
// need to copy and paste the code of verifyDeviceID-JUIC207.py into verifyDeviceID.py
// and delete the /deviceid patch resource and call API.get() instead.
//
// Returns true if the deviceID exists in our database and is available.
// Returns false if the deviceID does not exist or is already
// in use by another account.
async function validDeviceIDCheck(deviceID) {
  const path = "/deviceid"; // you can specify the path
  console.log("path is " + path);
  let result = await API.patch("LambdaProxy", path,
    {
      "queryStringParameters": {
        "deviceID": deviceID
      }
    }).catch(error => { 
      console.log(error.response) 
      alert("Something went wrong while verifying device ID.")
      return false;
    });
    console.log("response type: " + (typeof result));
    console.log("api response: " + result);

  if (Object.keys(result).length === 0) {
    console.log("entered non valid id");
    alert("Must enter a valid device ID.");
    return false;
  }
  /* TODO NOTICE: uncomment this once we are done with Alpha Testers all using 'mydevice'!!
  if (result.inUse == 1) {
    console.log("entered deviceID is already in use");
    alert("Entered device ID is already in use by another account.");
    return false;
  }
  */
  return true;
}

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