import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';

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
                <TextInput
                    style={styles.inputContainer}
                    placeholder='Email'
                    onChangeText={EmailInputValue => this.setState({ EmailInputValue })}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputContainer}
                    placeholder='Password'
                    onChangeText={PasswordInputValue => this.setState({ PasswordInputValue })}
                    secureTextEntry={true}
                    autoCapitalize='none'
                />

                <Button title="Sign in" 
                onPress={() => this.SignIn()} />
                
                <Text 
                    style={styles.ClickableText} 
                    onPress={ ()=>  this.props.navigation.navigate('SignUp')}>
                    Don't have an account? Click here to Sign-Up.
                </Text>
            </View>
        </View>
      );
    }


    SignIn = async() => {
        const email = this.state.EmailInputValue;
        const password = this.state.PasswordInputValue;
        var didError = false;
        try {
            const user = await Auth.signIn(email, password)
                .catch(error => {
                    console.log(error.code);
                    didError = true;
                    if (typeof(error.code) === "undefined") {
                        console.log("Email and password cannot be empty.");
                        this.setState({ErrorMessage: "Email and password cannot be empty."});
                    } else if (error.code === 'UserNotConfirmedException') {
                        // The error happens if the user didn't finish the confirmation step when signing up
                        console.log("This account has not yet been verified.");
                        this.setState({ErrorMessage: "This account has not yet been verified."});
                        this.props.navigation.navigate('Verify', {userEmail : email});
                    } else if (error.code === 'PasswordResetRequiredException') {
                        // The error happens when the password is reset in the Cognito console
                        // In this case you need to call forgotPassword to reset the password
                        console.log("This account's password has been reset.");
                        this.setState({ErrorMessage: "Your account's password has been reset. Please click \"Forgot Password\" to create a new password."});
                    } else if (error.code === 'NotAuthorizedException') {
                        // The error happens when the incorrect password is provided
                        console.log("Incorrect Password");
                        this.setState({ErrorMessage: "Incorrect Password"});
                    } else if (error.code === 'UserNotFoundException') {
                        // The error happens when the supplied username/email does not exist in the Cognito user pool
                        console.log("Specified user could not be found.");
                        this.setState({ErrorMessage: "The specified user could not be found. Please try another email."});
                    } else if (error.code === 'NetworkError') {
                        console.log("Network error.");
                        this.setState({ErrorMessage: "Network error."});
                    } else {
                        console.log("Something else went wrong");
                        this.setState({ErrorMessage: "Something else went wrong."});
                    }
                });
            console.log(user);
            if (didError === false) {
                this.props.navigation.navigate('App');
            }
        } catch (err) {
            console.log("catching error: " + err);
        }
    }

    
  }
export default SignInScreen;

const styles = StyleSheet.create({
    screen: {
        padding: 30,
        backgroundColor: "#242424", //dark gray
        flex: 1,
    },
    contents: {
        top: '20%',
        bottom: '20%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        color: '#fff', //white
        fontSize: 20,
        marginBottom: '5%',
    },
    ErrorText: {
        color: '#ff0000', //red
        flexDirection: 'column',
        marginBottom: '5%',
    },
    inputContainer: {
        height: 40,
        width: '80%',
        color: 'white',
        borderColor: 'gray',
        paddingLeft: 10,
        borderWidth: 1,
        marginBottom: '5%',
    },
    ClickableText: {
        color: '#E88227', //oragne
        textDecorationLine: 'underline',
        marginTop: '10%',
    },
});

