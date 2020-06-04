import React from 'react';
import { StyleSheet, Text, View, Image, Switch, TouchableOpacity } from 'react-native';
import Colors from '../assets/colors.js';
import { API } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import QuestionMark from '../assets/question-mark.svg';

class NotificationSelectionScreen extends React.Component {
  static navigationOptions = {
    headerRight: <QuestionMark/>,
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontWeight: "bold",
        fontFamily: 'RedHatDisplay-Regular'
    },
    gesturesEnabled: false,
}
  constructor(props) {
    super(props)
    this.state = {
      userEmail: "",
      primaryDeviceSwitch: "",
      secondaryDeviceSwitch: "",
      chargeInterruptSwitch: ""
    }
    this.primaryDeviceToggle = this.primaryDeviceToggle.bind(this);
    this.secondaryDeviceToggle = this.secondaryDeviceToggle.bind(this);
    this.chargeInterruptToggle = this.chargeInterruptToggle.bind(this);
    this.onlogInfo = this.onlogInfo.bind(this);
  }

  // retrieving user email
  async componentDidMount() {
    this.setState({ userEmail: await SecureStore.getItemAsync("secure_email")});

    let query = {
      "queryStringParameters": {
          "userEmail": this.state.userEmail
      }};

    // get notification preferences from database
    let primaryNotif;
    let secondaryNotif;
    let chargeInterruptNotif;

    console.log("making notification settings get request")
        await API.get("LambdaProxy", "/settings", query)            
          .then(
          response => {
              if (response != null) {
                  console.log(response)
                    primaryNotif = response["NotifyPri"];
                    secondaryNotif = response["NotifySec"];
                    chargeInterruptNotif = response["NotifySec"];

                    this.setState({ primaryDeviceSwitch: primaryNotif});
                    this.setState({ secondaryDeviceSwitch: secondaryNotif});
                    this.setState({ chargeInterruptSwitch: chargeInterruptNotif});

                    // change to true/false values
                    if (primaryNotif == "1" || primaryNotif == "true")
                      primaryNotif = "true"
                    else
                      primaryNotif = "false"

                    if (secondaryNotif == "1" || secondaryNotif == "true")
                      secondaryNotif = "true"
                    else
                      secondaryNotif = "false"

                    if (chargeInterruptNotif == "1" || chargeInterruptNotif == "true")
                      chargeInterruptNotif = "true"
                    else
                      chargeInterruptNotif = "false"

              } else {
                  console.log("No device currently charging");
              }
          }
      ).catch(error => {
          console.log(error.response)
      });

  }

  primaryDeviceToggle(primaryNotif) {
    this.setState({ primaryDeviceSwitch: primaryNotif});
  };

  secondaryDeviceToggle(secondaryNotif) {
    this.setState({ secondaryDeviceSwitch: secondaryNotif})
  };

  chargeInterruptToggle(chargeInterruptNotif) {
    this.setState({ chargeInterruptSwitch: chargeInterruptNotif})
  };

  //onValueChange of the switch this function will be called
  async onlogInfo() {
    console.log("User Email: " + this.state.userEmail);
    console.log("Primary Device Switch: " + this.state.primaryDeviceSwitch);
    console.log("Secondary Device Switch: " + this.state.secondaryDeviceSwitch);
    console.log("Charge Interruptions Switch: " + this.state.chargeInterruptSwitch);

    let requestBody = {
      "Email": this.state.userEmail,
      "PrimaryDevice": this.state.primaryDeviceSwitch,
      "SecondaryDevice": this.state.secondaryDeviceSwitch,
      "ChargeInterruptions": this.state.chargeInterruptSwitch
    };
    
    let jsonObj = {
      body: requestBody
    }
    const path = "/settings"; // path from root of API
    const apiResponse = await API.put("LambdaProxy", path, jsonObj).catch(error => {console.log(error.response)}); //replace the desired API name
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
          <Text style={{ ...styles.optionText}}>Primary Device</Text>
          
          <Switch
            style={{position: 'absolute', marginLeft: '80%'}}
            trackColor={{true: Colors.accent1}}
            onValueChange={this.primaryDeviceToggle}
            value={this.state.primaryDeviceSwitch} />
        </View>

        {/* Secondary Device Notification */}
        <View style={styles.backgroundScheduleBox}>
          <Image style={styles.iconPictures} source={require('../assets/home-icon.png')} />
          <Text style={{ ...styles.optionText}}>Secondary Device</Text>
          <Switch
            style={{position: 'absolute', marginLeft: '80%'}}
            trackColor={{true: Colors.accent1}}
            onValueChange={this.secondaryDeviceToggle}
            value={this.state.secondaryDeviceSwitch} />
        </View>

        {/* Interruptions Notification */}
        <View style={{...styles.backgroundScheduleBox, marginBottom: 100}}>
          <Image style={styles.iconPictures} source={require('../assets/pause-icon.png')} />
          <Text style={{ ...styles.optionText}}>Charge Interruptions</Text>
          <Switch
            style={{position: 'absolute', marginLeft: '80%'}}
            trackColor={{true: Colors.accent1}}
            onValueChange={this.chargeInterruptToggle}
            value={this.state.chargeInterruptSwitch} />
        </View >

        <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.title}>Confirm</Text>
                    </TouchableOpacity>
          </View>

      </View>
    );
  }
}

// styling elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    minWidth: '100%'
  },
  optionText: {
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 20,
    color: Colors.accent1,
    marginLeft: 30
  },
  title: {
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 24,
    color: Colors.secondary
},
  headersText: {
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 14,
    color: Colors.lightFade,
    padding: 15
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    backgroundColor: Colors.accent1,
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 25,
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
    marginTop: 15,
  },
});

export default NotificationSelectionScreen;