import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal } from 'react-native';
import OnboardingLogo from '../components/OnboardingLogo';
import OnboardingInput from '../components/OnboardingInput';
import { API } from 'aws-amplify';



class SetupScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      //userEmail: 'test@calpoly.edu',
      userEmail: this.props.navigation.state.params.userEmail,
      deviceID: '',
      timeZone: '',
      primaryDevice: '',
      secondaryDevice: ''
    }
    this.timeZoneHandler = this.timeZoneHandler.bind(this);
    this.primDevHandler = this.primDevHandler.bind(this);
    this.secDevHandler = this.secDevHandler.bind(this);
    this.setDeviceIDHandler = this.setDeviceIDHandler.bind(this);
    this.logOnboardingInfo = this.logOnboardingInfo.bind(this);
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

  async logOnboardingInfo() {
    console.log("userEmail: " + this.state.userEmail);
    console.log("timeZone: " + this.state.timeZone);
    console.log("primaryDevice: " + this.state.primaryDevice);
    console.log("secondaryDevice: " + this.state.secondaryDevice);
    console.log("deviceID: " + this.state.deviceID);

    let requestBody = { "userEmail": this.state.userEmail, "timeZone": this.state.timeZone, 
                        "primaryDevice": this.state.primaryDevice, "secondaryDevice": this.state.secondaryDevice, 
                        "deviceID": this.state.deviceID };
    let jsonObj = {
      body: requestBody
    }
    const path = "/user"; // you can specify the path
    const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the API name
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