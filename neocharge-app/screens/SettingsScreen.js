import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../assets/colors.js';
import { Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import DeviceSelection from '../components/DeviceSelection';
import RNPickerSelect from 'react-native-picker-select';

let AppConfig = require('../app.json');

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      userEmail: "",
    }
  }
  async componentDidMount() {
    this.setState({ userEmail: await SecureStore.getItemAsync("secure_email")});
  }

  render() {
    return (
      <View style={styles.container}>

        {/* display user account */}
        <Text style={{ ...styles.headersText, marginLeft: 40 }}>Account</Text>
        <View style={styles.backgroundScheduleBox}>
          <Image style={{ marginLeft: 10, width: 55, height: 55 }} source={require('../assets/female-icon.png')} />
          <Text style={styles.userProfileText}>{this.state.userEmail}</Text>
        </View>

        {/* Push Notification Options */}
        <Text style={{ ...styles.headersText, marginLeft: 40 }}>General</Text>

        {/* Primary Device Notification */}
        <View style={styles.backgroundScheduleBox}>
          <Image style={styles.iconPictures} source={require('../assets/electric-car-icon.png')} />
          <Text style={{ ...styles.optionText, paddingRight: 147 }}>Configure Vehicle</Text>
          <Image style={styles.iconPictures} source={require('../assets/rightArrow.png')} />

        </View>

        {/* Secondary Device Notification */}
        <View style={styles.backgroundScheduleBox}>
          <Image style={styles.iconPictures} source={require('../assets/home-icon.png')} />
          <Text style={{ ...styles.optionText, paddingRight: 120 }}>NeoCharge Device</Text>
          <Image style={{ ...styles.iconPictures, marginLeft: 27 }} source={require('../assets/rightArrow.png')} />
        </View>

        {/* Manual Settings */}
        <Text style={{ ...styles.headersText, marginLeft: 40 }}>Time Zone</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }} >
          <Text style={{ ...styles.headersText, marginLeft: 40 }}>Primary Device</Text>
          <Text style={{ ...styles.headersText, marginLeft: 110 }}>Secondary Device</Text>
        </View>

        {/* Configure Primary and Secondary Device */}
        <View style={styles.deviceSelectionContainer}>
          <DeviceSelection />
          <DeviceSelection />
        </View>

      {/* Time Zone Selection */}
    <View style={styles.containerTimeZone}>
      <View style={styles.buttonTimeZone}>
          <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              placeholder = {{label: 'Select a time', value: null}}
              items={[
                  { label: 'Pacific Standard Time', value: 'Pacific Standard Time' },
                  { label: 'Central Standard Time', value: 'Central Standard Time' },
                  { label: 'Mountain Standard Time', value: 'Mountain Standard Time' },
                  { label: 'Eastern Standard Time', value: 'Eastern Standard Time' },
                  { label: 'Alaska Standard Time', value: 'Alaska Standard Time' },
                  { label: 'Atlantic Standard Time', value: 'Atlantic Standard Time' },
                  { label: 'Hawaii-Aleutian Standard Time', value: 'Hawaii-Aleutian Standard Time' },
              ]}
          />
          <Image style={styles.timeIcon} source={require('../assets/timezone-icon.png')} />
          </View>
        </View>

        {/* Version */}
        <Text style={{ ...styles.versionText, marginRight: 20 }}>v {AppConfig.expo.version}</Text>

        {/* SignOut Button */}
        <View style={styles.logoutContainer}>
          <View style={styles.logoutButtonContainer}>
            <Button
              onPress={() => this.confirmSignOut()}
              title="Sign Out"
            />
          </View>
        </View>

      </View>
    );
  }

  async confirmSignOut() {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log("canceled sign out"),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.SignOut() },
      ],
      { cancelable: false },
    );
  }

  async SignOut() {
    var noErrors = true;
    try {
      await Auth.signOut()
        .then(data => console.log(data))
        .catch(error => {
          noErrors = false;
          console.log(error);
        });
      if (noErrors) {
        await SecureStore.deleteItemAsync("secure_email");
        await SecureStore.deleteItemAsync("secure_password");
        this.props.navigation.navigate('Auth');
      }
    } catch (err) {
      console.log("catching error: " + err);
    }
  }
}
export default SettingsScreen;

const AppStackNavigator = createStackNavigator({
  Schedule: { screen: SettingsScreen }
});
const Apps = createAppContainer(AppStackNavigator);

// styling elements
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    minWidth: '100%'
  },
  containerTimeZone: {
    flex: 1,
    backgroundColor: Colors.primary,
    minWidth: '100%',
    minHeight: 60,
    position: 'absolute',
    marginTop: '73%'
  },
  deviceSelectionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    marginBottom: 10,
    marginTop: 15,
  },
  versionText: {
    fontSize: 14,
    color: 'grey',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    textAlign : 'right'
  },
  userProfileText: {
    fontSize: 20,
    marginLeft: 20,
    color: 'white'
  },
  switch: {
    marginRight: 10,
    alignItems: 'stretch',
  },
  backgroundScheduleBox: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxHeight: 60,
    backgroundColor: Colors.appleBlue,
    alignItems: 'center',
    marginRight: 90
  },
  buttonTimeZone: {
    backgroundColor: Colors.appleBlue,
    padding: 10,
    paddingLeft: 70,
    width: '100%',
    height: 50,
    justifyContent: 'center'
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
  logoutContainer: {
    marginBottom: 30
  }
});
