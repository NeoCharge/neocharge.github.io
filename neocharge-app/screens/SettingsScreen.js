import React from 'react';
import { Dimensions, StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import Colors from '../assets/colors.js';
import { API, Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import Arrow from '../assets/Arrow.svg';
import QuestionMark from '../assets/question-mark.svg'
import RNPickerSelect from 'react-native-picker-select';

let AppConfig = require('../app.json');
const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height
const iconSize = sheight * 0.025;

class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerRight: <QuestionMark />,
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
      isVisible: false,
      userEmail: "",
    }
  }
  async componentDidMount() {
    this.setState({ userEmail: await SecureStore.getItemAsync("secure_email") });
  }

  render() {
    return (
      // <View style={styles.container}>
      //   {/* display user account */}
        // <Text style={{ ...styles.headersText, marginLeft: 40 }}>Account</Text>
        // <View style={styles.backgroundScheduleBox}>
        //   <Image style={{ marginLeft: 10, width: 55, height: 55 }} source={require('../assets/female-icon.png')} />
        //   <Text style={styles.userProfileText}>{this.state.userEmail}</Text>
        // </View>

        // {/* Manual Settings */}
        // <Text style={{ ...styles.headersText, marginLeft: '5%' }}>Time Zone</Text>
        // <View style = {styles.containerTimeZone}>
        // <View style={styles.pickers}>
          // <RNPickerSelect
          //   onValueChange={(value) => console.log(value)}
          //   placeholder={{ label: 'PST', value: null }}
          //   items={[
          //     { label: 'Pacific Standard Time (UTC-8)', value: 'PST' },
          //     { label: 'Mountain Standard Time (UTC-7)', value: 'MST' },
          //     { label: 'Central Standard Time (UTC-6)', value: 'CST' },
          //     { label: 'Eastern Standard Time (UTC-5)', value: 'EST' },
          //     { label: 'Atlantic Standard Time (UTC-4)', value: 'AST' },
          //     ]}
          //     style={pickerSelectStyles}
          //     useNativeAndroidPickerStyle={false}
          //     Icon={() => {
          //     return <Arrow height={iconSize} width={iconSize} />;
          //     }}
          // />
        //   </View>
          
          // <Text style={{ ...styles.headersText, marginLeft: '5%' }}>Primary Device</Text>
      //     <View style={styles.pickers}>
          // <RNPickerSelect
          //   onValueChange={(value) => console.log(value)}
          //   placeholder={{ label: 'Appliance', value: null, color: 'grey' }}
          //   items={[
          //       { label: 'Appliance', value: 'Appliance' },
          //       { label: 'Electric Vehicle', value: 'EV' },
          //   ]}
          //     style={pickerSelectStyles}
          //     useNativeAndroidPickerStyle={false}
          //     Icon={() => {
          //     return <Arrow height={iconSize} width={iconSize} />;
          //     }}
          // />
      //     </View>

          // <Text style={{ ...styles.headersText, marginLeft: '5%' }}>Secondary Device</Text>
      //     <View style={styles.pickers}>
      //     <RNPickerSelect
      //       onValueChange={(value) => console.log(value)}
      //       placeholder={{ label: 'Select', value: null, color: 'grey' }}
      //       items={[
      //         { label: 'BMW', value: 'BMW' },
      //         { label: 'Chevrolet', value: 'Chevrolet' },
      //         { label: 'Ford', value: 'Ford' },
      //         { label: 'KIA', value: 'KIA' },
      //         { label: 'Mercedes', value: 'Mercedes' },
      //         { label: 'Nissan', value: 'Nissan' },
      //         { label: 'Tesla', value: 'Tesla' },
      //         { label: 'Volkswagen', value: 'Volkswagen' },
      //     ]}
      //     style={pickerSelectStyles}
      //         style={pickerSelectStyles}
      //         useNativeAndroidPickerStyle={false}
      //         Icon={() => {
      //         return <Arrow height={iconSize} width={iconSize} />;
      //         }}
      //     />
      //     </View>

      //   </View>

        // {/* Version */}
        // <Text style={{ ...styles.versionText, marginRight: 20 }}>v {AppConfig.expo.version}</Text>

        // {/* SignOut Button */}
        // <View style={styles.logoutContainer}>
        //   <View style={styles.logoutButtonContainer}>
        //     <Button
        //       onPress={() => this.confirmSignOut()}
        //       title="Sign Out"
        //     />
        //   </View>
        // </View>
      
      //   {/* Delete Account */}
      //   <View style={styles.deleteAccountContainer}>
      //     <View style={styles.deleteAccountButtonContainer}>
      //       <Button
      //         onPress={() => this.confirmDeleteAccount()}
      //         title="Delete Account Data"
      //       />
      //     </View>
      //   </View>

      // </View>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Account</Text>
        </View>

        <View style={styles.backgroundScheduleBox}>
          <Image style={{ marginLeft: 10, width: 55, height: 55, borderRadius: 24}} source={require('../assets/female-icon.png')} />
          <Text style={styles.userProfileText}>{this.state.userEmail}</Text>
        </View>

      <Text style={{ ...styles.headersText, marginLeft: '5%' }}>Time Zone</Text>
      <View style={styles.pickers}>
        <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              placeholder={{ label: 'PST', value: null }}
              items={[
                { label: 'Pacific Standard Time (UTC-8)', value: 'PST' },
                { label: 'Mountain Standard Time (UTC-7)', value: 'MST' },
                { label: 'Central Standard Time (UTC-6)', value: 'CST' },
                { label: 'Eastern Standard Time (UTC-5)', value: 'EST' },
                { label: 'Atlantic Standard Time (UTC-4)', value: 'AST' },
                ]}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                return <Arrow height={iconSize} width={iconSize} />;
                }}
        />

        <Text style={{ ...styles.headersText}}>Primary Device</Text>
        <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            placeholder={{ label: 'Appliance', value: null, color: 'grey' }}
            items={[
                { label: 'Appliance', value: 'Appliance' },
                { label: 'Electric Vehicle', value: 'EV' },
            ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
              return <Arrow height={iconSize} width={iconSize} />;
              }}
        />
        
        <Text style={{ ...styles.headersText}}>Secondary Device</Text>
          <RNPickerSelect
              onValueChange={(value) => this.setState({ make: value })}
              placeholder={{ label: 'Make', value: null, color: 'grey' }}
              items={[
                  { label: 'BMW', value: 'BMW' },
                  { label: 'Chevrolet', value: 'Chevrolet' },
                  { label: 'Ford', value: 'Ford' },
                  { label: 'KIA', value: 'KIA' },
                  { label: 'Mercedes', value: 'Mercedes' },
                  { label: 'Nissan', value: 'Nissan' },
                  { label: 'Tesla', value: 'Tesla' },
                  { label: 'Volkswagen', value: 'Volkswagen' },
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                  return <Arrow height={iconSize} width={iconSize} />;
              }}
          />

          {/* Signout Option */}
          <Text
            style={{...styles.clickableText, marginTop: '14%'}}
            onPress={() => this.confirmSignOut()}>
            Sign Out
          </Text>

          {/* Delete Account Option */}
          <Text
            style={{...styles.clickableText, marginTop: '4%'}}
            onPress={() => this.confirmDeleteAccount()}>
            Delete Account Data
          </Text>

          {/* Version */}
          <Text style={{ ...styles.versionText, marginRight: 20 }}>v {AppConfig.expo.version}</Text>

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

  async confirmDeleteAccount() {
    Alert.alert(
      'Delete Account Data',
      'Are you sure you want to delete your account data?\n\n' +
      'This will free your device so it can be linked to another account.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log("canceled sign out"),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.areYouSure() },
      ],
      { cancelable: false },
    );
  }

  async areYouSure() {
    Alert.alert(
      'Are you sure?',
      '',
      [{
          text: 'Cancel',
          onPress: () => console.log("canceled sign out"),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.DeleteAccount() },
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

  async DeleteAccount() {
    console.log("ACCOUNT IS BEING DELETED");
    let path = "/user"
    let jsonObj = {
      "queryStringParameters": {
        "userEmail": this.state.userEmail
      }
    };
    await API.del("LambdaProxy", path, jsonObj)
      .then(response => {
        console.log(response)
        this.SignOut()
      })
      .catch(error => {
        console.log("Something went wrong while deleting user...")
        console.log(error.response)
      });
  }
}
export default SettingsScreen;

// styling elements
const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.primary,
//     minWidth: '100%'
//   },
//   containerTimeZone: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     backgroundColor: Colors.primary,
//   },
//   deviceSelectionContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   optionText: {
//     fontSize: 20,
//     color: Colors.secondary,
//     marginLeft: 30
//   },
  headersText: {
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Regular',
    color: Colors.lightFade,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Bold',
    color: Colors.lightFade,
    marginBottom: 10,
    marginTop: '45%',
    textAlign: 'right',
    alignSelf: 'stretch'
  },
  userProfileText: {
    fontSize: 20,
    fontFamily: 'RedHatDisplay-Regular',
    marginLeft: 15,
    color: Colors.accent1
  },
  backgroundScheduleBox: {
    fontFamily: 'RedHatDisplay-Bold',
    backgroundColor: Colors.faded,
    flexDirection: 'row',
    width: swidth*0.9,
    alignItems: 'center',
    position: 'absolute',
    marginTop: 55,
    borderRadius: 25
  },
//   buttonTimeZone: {
//     backgroundColor: Colors.appleBlue,
//     padding: 10,
//     paddingLeft: 70,
//     width: '100%',
//     height: 50,
//     justifyContent: 'center'
//   },
//   timeIcon: {
//     marginLeft: 10,
//     width: 28,
//     height: 28,
//     position: 'absolute',
//     marginTop: 10
//   },
//   iconPictures: {
//     marginLeft: 10,
//     width: 30,
//     height: 30
//   },
//   logoutContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   logoutButtonContainer: {
//     backgroundColor: Colors.appleBlue,
//     position: 'absolute',
//     justifyContent: 'center',
//     height: 40,
//     borderColor: '#51a0d5',
//     borderWidth: 1,
//     bottom: '50%',
//     width: '90%',
//     borderRadius: 10
//   },
//   deleteAccountContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   deleteAccountButtonContainer: {
//     backgroundColor: Colors.appleBlue,
//     position: 'absolute',
//     justifyContent: 'center',
//     height: 40,
//     borderColor: '#51a0d5',
//     borderWidth: 1,
//     bottom: '50%',
//     width: '90%',
//     borderRadius: 10
//   },
//   pickers: {
//     alignItems: 'center',
//     justifyContent: 'flex-start'
// },
container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: Colors.primary,
},
sliderContainer: {
  flex: 1,
  marginLeft: 10,
  marginRight: 10,
  alignItems: 'stretch',
  justifyContent: 'center',
  color: Colors.accent1,
  width: swidth * 0.9,
},
sliderTitle: {
  fontFamily: 'RedHatDisplay-Bold',
  fontSize: 14,
  color: Colors.accent1,
},
titleContainer: {
  flex: 1,
  alignSelf: 'flex-start',
  paddingLeft: (swidth * .05),
  paddingTop: (swidth * .05)
},
title: {
  fontFamily: 'RedHatDisplay-Bold',
  fontSize: 24,
  color: Colors.secondary
},
pickers: {
  flex: 6,
  alignItems: 'center',
  justifyContent: 'flex-start'
},
buttonContainer: {
  justifyContent: 'center',
  marginBottom: 60
},
button: {
  backgroundColor: Colors.accent1,
  paddingHorizontal: 25,
  paddingVertical: 5,
  borderRadius: 25,
},
textContainer: {
  fontFamily: 'RedHatDisplay-Bold',
  fontSize: 16,
  backgroundColor: Colors.faded,
  paddingVertical: 12,
  paddingHorizontal: 15,
  borderWidth: 1,
  borderColor: Colors.faded,
  borderRadius: 25,
  color: Colors.accent1,
  paddingRight: 30, // to ensure the text is never behind the icon
  width: swidth * .9,
  marginBottom: 60
},
container1: {
  flex: 4,
  alignSelf: 'flex-start',
  paddingLeft: (swidth * .05),
  paddingTop: (swidth * .05),
  marginTop: 60
},
textCon: {
  fontFamily: 'RedHatDisplay-Bold',
  width: swidth,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
clickableText: {
  fontFamily: 'RedHatDisplay-Bold',
  color: Colors.accent1,
  fontSize: 20,
},

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontFamily: 'RedHatDisplay-Bold',
      fontSize: 16,
      backgroundColor: Colors.faded,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: Colors.faded,
      borderRadius: 25,
      color: Colors.accent1,
      paddingRight: 30, // to ensure the text is never behind the icon
      width: swidth * .9,
      marginBottom: 5
  },
  inputAndroid: {
      fontFamily: 'RedHatDisplay-Bold',
      fontSize: 16,
      backgroundColor: Colors.faded,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: Colors.faded,
      borderRadius: 25,
      color: Colors.accent1,
      paddingRight: 30, // to ensure the text is never behind the icon
      width: swidth * .9,
      marginBottom: 5
  },
  placeholder: {
      color: Colors.accent1
  },
  iconContainer: {
      right: 15,
      top: 12,
      transform: [{ rotate: '90deg' }]
  }
});
