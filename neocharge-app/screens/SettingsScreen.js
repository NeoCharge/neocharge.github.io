import React from 'react';
import { StyleSheet, Text, View, Switch, Button, TouchableHighlight, Image, Alert } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../assets/colors.js';
//import ListPopover from 'react-native-list-popover';
import { Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import LogoutOption from '../components/LogoutOption';
import DeviceSelection from '../components/DeviceSelection';

let AppConfig = require('../app.json');

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
    }
  }

  // Adding header title, color and font weight
  // navigation placed here for page routing purposes 
  // static navigationOptions = {
  //   title: 'Settings',
  //   headerStyle: {backgroundColor: Colors.accent2},
  //   headerTintColor: 'white',
  //   headerTitleStyle: {fontWeight: 'bold'}
  // };

  render() {
    // hardcoded temporarily, fill in with real time data later on 
    const items = ['Central Standard Time', 'Mountain Standard Time', 'Pacific Standard Time',
      'Alaskan Standard Time', 'Hawaii-Aleutian Standard Time', 'Eastern Standard Time'];

    return (
      <View style={styles.container}>

        {/* display user account */}
        <Text style={{ ...styles.headersText, marginLeft: 40 }}>Account</Text>
        <View style={styles.backgroundScheduleBox}>
          <Image style={{ marginLeft: 10, width: 55, height: 55 }} source={require('../assets/female-icon.png')} />
          <Text style={styles.userProfileText}>Jane Doe</Text>
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

        {/* TimeZone Selection DropDown */}
        <View style={styles.containerTimeZone}>
          <TouchableHighlight
            style={styles.buttonTimeZone}
            onPress={() => this.setState({ isVisible: true })}>
            <Text style={{ marginLeft: 60, color: 'white', fontSize: 20 }}>{this.state.item || 'Select'}</Text>
          </TouchableHighlight>
          {/*<ListPopover
            list={items}
            isVisible={this.state.isVisible}
            onClick={(item) => this.setState({ item: item })}
            onClose={() => this.setState({ isVisible: false })}
          />*/ }
          <Image style={styles.timeIcon} source={require('../assets/timezone-icon.png')} />
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

// for navigation to other screens
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
