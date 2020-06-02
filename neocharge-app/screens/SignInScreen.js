import React from 'react';
import { Dimensions, Image, View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { API, Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import Colors from '../assets/colors';
import LockIcon from '../assets/lock-icon.svg';
import MailIcon from '../assets/mail-icon.png';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height
const iconSize = sheight * 0.040;

class SignInScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            EmailInputValue: '',
            PasswordInputValue: '',
            ErrorMessage: '',
            jsonDeviceLogs: []
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.contents}>
                    <Text style={styles.title}>Sign-In</Text>
                    <Text style={styles.ErrorText}>{this.state.ErrorMessage}</Text>
                    <View style={styles.backgroundBox}>
                        <LockIcon width = {iconSize} height = {iconSize} marginRight= {10}/>
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='Email'
                            placeholderTextColor={Colors.lightFade}
                            onChangeText={EmailInputValue => this.setState({ EmailInputValue })}
                            autoCapitalize='none'
                        />
                    </View>

                    <View style={{...styles.backgroundBox, marginTop: '10%'}}>
                    <Image style = {styles.iconPictures}
                            source={require('../assets/mail-icon.png')} />
                        <TextInput
                            style={styles.inputContainer}
                            placeholder='Password'
                            placeholderTextColor={Colors.lightFade}
                            onChangeText={PasswordInputValue => this.setState({ PasswordInputValue })}
                            secureTextEntry={true}
                            autoCapitalize='none'
                        />
                    </View>


                    <View style={styles.buttonContainer}>
                        <Button 
                            title = "Sign in"
                            color= {Colors.secondary}
                            onPress={() => this.SignIn()} />
                    </View>

                    <Text
                        style={styles.ClickableText}
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                        Don't have an account? Click here to Sign-Up.
                </Text>
                </View>
            </View>
        );
    }


    async SignIn() {
        const email = this.state.EmailInputValue;
        const password = this.state.PasswordInputValue;
        let signInSuccess = true;
        try {
            if (!(signInSuccess = this.checkValidInput(email, password))) {
                return //return if the input was not valid
            }
            const user = await Auth.signIn(email, password)
                .catch(error => {
                    console.log(error.code);
                    signInSuccess = false;
                    this.handleErrors(error.code, email);
                });
            console.log(user);
            if (signInSuccess) {
                // save user credentials locally on phone
                this.setSecureStore("secure_email", email);
                this.setSecureStore("secure_password", password);
                
                // check if user has finished first time setup
                const path = "/user";
                // let session = await Auth.currentSession();
                // let authToken = session["idToken"]["jwtToken"];
                // console.log(authToken);
                let getuser = await API.get("LambdaProxy", path,
                  {
                    // headers: {
                    //   Authorization: authToken
                    // },
                    "queryStringParameters": {
                      "userEmail": email
                    }
        
                  })
                  .catch(error => { console.log(error.response) });
        
                const setupComplete = ((typeof getuser != undefined) && (getuser.length > 0)); // the user exists in our users table
                if (setupComplete) {
                    this.props.navigation.navigate('App');
                }
                else {
                    this.props.navigation.navigate('Setup', { userEmail: email });
                }
            }
        } catch (err) {
            console.log("catching error: " + err);
        }
    }


    checkValidInput(email, password) {
        if (email.length === 0) {
            console.log("No email was given.");
            this.setState({ ErrorMessage: "Please enter an email address." });
            return false;
        }
        if (password.length === 0) {
            console.log("No password was given.");
            this.setState({ ErrorMessage: "Please enter your password." });
            return false;
        }
        return true;
    }


    handleErrors(errorcode, email) {
        if (typeof (errorcode) === "undefined") {
            console.log("Email and password cannot be empty.");
            this.setState({ ErrorMessage: "Email and password cannot be empty." });
        }
        else if (errorcode === 'UserNotConfirmedException') {
            // The error happens if the user didn't finish the confirmation step when signing up
            console.log("This account has not yet been verified.");
            this.setState({ ErrorMessage: "This account has not yet been verified." });
            this.props.navigation.navigate('Verify', { userEmail: email });
        }
        else if (errorcode === 'PasswordResetRequiredException') {
            // The error happens when the password is reset in the Cognito console
            // In this case you need to call forgotPassword to reset the password
            console.log("This account's password has been reset.");
            this.setState({ ErrorMessage: "Your account's password has been reset.\nPlease click \"Forgot Password\" to create a new password." });
        }
        else if (errorcode === 'NotAuthorizedException') {
            // The error happens when the incorrect password is provided
            console.log("Incorrect Password");
            this.setState({ ErrorMessage: "Incorrect Password" });
        }
        else if (errorcode === 'UserNotFoundException') {
            // The error happens when the supplied username/email does not exist in the Cognito user pool
            console.log("Specified user could not be found.");
            this.setState({ ErrorMessage: "The specified user could not be found.\nPlease try another email." });
        }
        else if (errorcode === 'NetworkError') {
            console.log("Network error.");
            this.setState({ ErrorMessage: "Network error." });
        } else {
            console.log("Something else went wrong");
            this.setState({ ErrorMessage: "Something else went wrong." });
        }
    }

    setSecureStore = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    }
}
/*
async function userHasSetUp(email) {
    console.log("checking " + email + " has set up their account")
  
    let requestBody = { "userEmail":email};
    let jsonObj = {
      body: requestBody
    }
    const path = "/pushtoken"; // you can specify the path
    const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the API name
    console.log(apiResponse);
    //this.props.navigation.navigate('App');
}*/

export default SignInScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 30,
        backgroundColor: Colors.primary,
    },
    contents: {
        top: '20%',
        bottom: '20%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    backgroundBox: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        maxHeight: 60,
        alignItems: 'center',
      },
    title: {
        fontFamily: 'RedHatDisplay-Bold',
        color: Colors.secondary, //white
        fontSize: 24,
        marginBottom: '5%',
    },
    ErrorText: {
        color: '#ff0000', //red
        flexDirection: 'column',
        marginBottom: '5%',
    },
    inputContainer: {
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 16,
        height: 40,
        width: '80%',
        color: Colors.accent1,
        borderColor: 'gray',
        paddingLeft: 10,
        borderWidth: 1,
        marginBottom: '5%',
        borderRadius: 25,
        marginTop: 20,
    },
    ClickableText: {
        fontFamily: 'RedHatDisplay-Regular',
        color: Colors.accent2,
        textDecorationLine: 'underline',
        marginTop: '10%',
    },
    buttonContainer: {
        marginTop: 50,
        justifyContent: 'center',
        backgroundColor: Colors.accent1,
        borderRadius: 25,
        width: '50%',
        height: '15%'
    },
    button: {
        backgroundColor: Colors.accent1,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 25,
    },
    iconPictures: {
        justifyContent: 'center',
        width: 30,
        height: 30,
        marginRight: 10
        
    },
});

