import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { API, Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      var userEmail = await SecureStore.getItemAsync("secure_email");
      var userPassword = await SecureStore.getItemAsync("secure_password");
      console.log("userEmail: " + userEmail);
      console.log("userPassword: " + userPassword);

      const path = "/user"; // you can specify the path
      let getuser = await API.get("LambdaProxy", path,
        {
          "queryStringParameters": {
              "userEmail": userEmail
          }
        })
        .catch(error => {console.log(error.response)}); //replace the API name
      const setupComplete = (getuser.length > 0); // the user exists in our users table
      console.log("completed API call");
      console.log("setupComplete: " + setupComplete);

      // Uncomment these lines if you'd like to go to Auth pages
      //userEmail = 'none';
      //userPassword = 'none';

      // This will switch to the:
      //  -Auth screens if the user is not signed in
      //  -Verification screen if the user has an account but it is not yet verified
      //  -Setup screen if the user has not yet completed the first time setup
      //  -App (Home) screen
      var signInSuccess = true;
      await Auth.signIn(userEmail, userPassword)
        .catch(error => {
            signInSuccess = false;
            if(error.code === 'UserNotConfirmedException') {
              // The error happens if the user didn't finish the confirmation step when signing up
              console.log("This account has not yet been verified.");
              this.props.navigation.navigate('Verify', {userEmail: userEmail});
            }
            else {
              console.log("AuthLoading error on authentication: " + error.code);
              this.props.navigation.navigate('SignUp'); //TODO add return after this line and merge if(signInSuccess && setupComplete)
            }
      });
      if (signInSuccess) {
        if(setupComplete) {
          this.props.navigation.navigate('App');
        }
        else {
          this.props.navigation.navigate('Setup', {userEmail: userEmail});
        }
      }
    }
    catch (error) {
      console.log("AuthLoading error on authentication: " + error);
      this.props.navigation.navigate('SignUp');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
        <View style={styles.screen} >
            <Image style={styles.imageStyle} source={require('../assets/neocharge.png')} />
            <Text style={styles.TextStyle}>Loading...</Text>
            <ActivityIndicator />
        </View>
    );
  }

}
export default AuthLoadingScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    backgroundColor: "#242424",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageStyle: {
      height: '50%',
      width: '50%',
      resizeMode: 'contain'
  },
  TextStyle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: '5%',
  },
});