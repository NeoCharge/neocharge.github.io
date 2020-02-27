import React from 'react';
import { StyleSheet, Text, View, Image, Switch, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../assets/colors.js';
import {API} from 'aws-amplify';
// import DeviceInfo from 'react-native-device-info';

class NotificationSelectionScreen extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        primaryDeviceSwitch: false, 
        secondaryDeviceSwitch: false, 
        chargeInterruptSwitch: false 
      }
      this.primaryDeviceToggle = this.primaryDeviceToggle.bind(this);
      this.secondaryDeviceToggle = this.secondaryDeviceToggle.bind(this);
      this.chargeInterruptToggle = this.chargeInterruptToggle.bind(this);
      this.onlogInfo = this.onlogInfo.bind(this);
    }

    // Adding header title, color and font weight
    // navigation placed here for page routing purposes 
    static navigationOptions = {
        title: 'Notification Options',
        headerStyle: {backgroundColor: Colors.accent2},
        headerTintColor: 'white',
        headerTitleStyle: {fontWeight: 'bold'}
    };

 
    primaryDeviceToggle(value) {
      this.setState({ primaryDeviceSwitch: value });
    };

    secondaryDeviceToggle(value) { 
      this.setState({ secondaryDeviceSwitch: value })
    };

    chargeInterruptToggle(value) { 
      this.setState({ chargeInterruptSwitch: value })
    };

    //onValueChange of the switch this function will be called
   async onlogInfo() { 
      console.log("Primary Device Switch: " + this.state.primaryDeviceSwitch);
      console.log("Secondary Device Switch: " + this.state.secondaryDeviceSwitch);
      console.log("Charge Interruptions Switch: " + this.state.chargeInterruptSwitch); 

      // Dummy email currently being used. 
      // Needs to be changed to the email that user inputted on previous screens
      let requestBody = { "email": "sampleEmail@gmail.com",
                          "primarydevice": this.state.primaryDeviceSwitch, 
                          "secondardevice": this.state.secondaryDeviceSwitch,
                          "chargeinterruptions": this.state.chargeInterruptSwitch};
      let jsonObj = {
      body: requestBody
      }
      const path = "/settings"; // path from root of API
      const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the desired API name
      console.log(apiResponse);

    };
  
     
    render() {

        return (
          <View style={styles.container}>

          {/* Push Notification Options */}
          <Text style={styles.headersText}>Select the notifications you would like to receive on your mobile device.</Text>

          {/* Primary Device Notification */}
          <View style={styles.backgroundScheduleBox}>
            <Image style={styles.iconPictures} source={require('../assets/electric-car-icon.png')} />
            <Text style={{...styles.optionText, paddingRight: 147}}>Primary Device</Text>
            <Switch
              style={styles.switch}
              onValueChange={this.primaryDeviceToggle}
              value={this.state.primaryDeviceSwitch} />
          </View> 

          {/* Secondary Device Notification */}
          <View style={styles.backgroundScheduleBox}>
            <Image style={styles.iconPictures} source={require('../assets/home-icon.png')} />
            <Text style={{...styles.optionText, paddingRight: 120}}>Secondary Device</Text>
            <Switch
              style={styles.switch}
              onValueChange={this.secondaryDeviceToggle}
              value={this.state.secondaryDeviceSwitch} />
          </View>

          {/* Interruptions Notification */}
          <View style={styles.backgroundScheduleBox}>
            <Image style={styles.iconPictures} source={require('../assets/pause-icon.png')} />
            <Text style={{...styles.optionText, paddingRight: 100}}>Charge Interruptions</Text>
            <Switch
              style={styles.switch}
              onValueChange={this.chargeInterruptToggle}
              value={this.state.chargeInterruptSwitch} />
          </View >

          <View style={styles.logoutContainer}>
                <View style={styles.logoutButtonContainer}>
                    <Button onPress={this.onlogInfo}
                        title="Continue"
                        color='white'
                    />
            </View>
        </View>


          </View>
        );
    }
}


// for navigation to other screens
const AppStackNavigator = createStackNavigator({
  Schedule: { screen: NotificationSelectionScreen }});
const Apps = createAppContainer(AppStackNavigator);

// styling elements
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
      minWidth: '100%'
    },
    optionText: {
      fontSize: 20,
      color: Colors.secondary,
      marginLeft: 30
    },
    headersText: {
      fontSize: 14,
      color: 'grey',
      fontWeight: 'bold',
      padding: 15
    },
    timeIcon: {
      marginLeft: 10, 
      width: 28, 
      height: 28, 
      position: 'absolute', 
      marginTop: 10 
    },
    iconPictures: {
      marginLeft: 10, 
      width: 30, 
      height: 30
    },
    backgroundScheduleBox: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      maxHeight: 60,
      backgroundColor: Colors.appleBlue,
      alignItems: 'center',
      marginRight: 90,
      marginTop: 15
    },
    logoutContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logoutButtonContainer: {
      backgroundColor: Colors.appleBlue,
      position: 'absolute',
      justifyContent: 'center',
      height: 40,
      borderColor: '#51a0d5',
      borderWidth: 1,
      bottom: '50%',
      width: '90%',
      borderRadius: 10
    }
});
export default Apps;