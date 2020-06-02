import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import { Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import Colors from '../assets/colors';

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.SignUp = this.SignUp.bind(this);
        this.state = {
            EmailInputValue: '',
            PasswordInputValue: '',
            ConfirmPasswordInputValue: '',
            ErrorMessage: '',
            jsonDeviceLogs: []
        }
    }

    static navigationOptions = {
        title: 'Please sign up',
    };


    render() {
        return (
            <View style={styles.screen} >
                <View style={styles.contents} >
                    <Text style={styles.title}>Sign-Up</Text>
                    <Text style={styles.ErrorText}>{this.state.ErrorMessage}</Text>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder='Email'
                        placeholderTextColor={Colors.lightFade}
                        onChangeText={EmailInputValue => this.setState({ EmailInputValue })}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.inputContainer}
                        placeholder='Password'
                        placeholderTextColor={Colors.lightFade}
                        onChangeText={PasswordInputValue => this.setState({ PasswordInputValue })}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.inputContainer}
                        placeholder='Confirm Password'
                        placeholderTextColor={Colors.lightFade}
                        onChangeText={ConfirmPasswordInputValue => this.setState({ ConfirmPasswordInputValue })}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={this.SignUp} >
                    <Text style={styles.title}>Confirm</Text>
                </TouchableOpacity>
            </View>

            <Text 
                style={styles.clickableText}
                onPress={() => this.props.navigation.navigate('SignIn')}>
                Already have an account? Click here to Sign-In.
            </Text> 
                </View> 
            </View>
        );
    }

    // Function that registers the inputted email and password when a user clicks the "Sign-Up" button
    async SignUp() {
        const email = this.state.EmailInputValue;
        const password = this.state.PasswordInputValue;
        const confirmPassword = this.state.ConfirmPasswordInputValue;
        var noErrors = true;
        try {
            if (!(noErrors = this.checkValidInput(email, password, confirmPassword))) {
                return //return if the input was not valid
            }
            await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email
                },
                validationData: []
            })
                .then(data => console.log(data))
                .catch(error => {
                    console.log(error.code);
                    noErrors = false;
                    this.handleErrors(error.code);
                });
            // Continue to verification page if Sign-Up was successful
            if (noErrors) {
                this.setSecureStore("secure_email", email);
                this.setSecureStore("secure_password", password);
                // TODO should I await navigation in order to prevent memory leaks?
                this.props.navigation.navigate('Verify', { userEmail: email });
            }
        } catch (err) {
            console.log("catching error: " + err);
        }
    }

    checkValidInput(email, password, confirmPassword) {
        if (email.length === 0) {
            console.log("No email was given.");
            this.setState({ ErrorMessage: "Please enter an email address." });
            return false;
        }
        if (password.length < 8) {
            console.log("Invalid password entered");
            this.setState({ ErrorMessage: "Passwords must contain at least 8 characters." });
            return false;
        }
        if (password !== confirmPassword) {
            console.log("Passwords did not match.");
            this.setState({ ErrorMessage: "The entered passwords do not match. Please try again." });
            return false;
        }
        return true;
    }



    handleErrors(errorcode) {
        if (typeof (errorcode) === "undefined") {
            console.log("Email and password cannot be empty.");
            this.setState({ ErrorMessage: "Email and password cannot be empty." });
        }
        else if (errorcode === 'UsernameExistsException') {
            console.log("Email already in use.");
            this.setState({ ErrorMessage: "Email already in use." });
        }
        else if (errorcode === 'InvalidParameterException') {
            console.log("Invalid password entered");
            this.setState({ ErrorMessage: "Invalid password entered." });
        }
        else if (errorcode === 'NetworkError') {
            console.log("Network error.");
            this.setState({ ErrorMessage: "Network error." });
        } else {
            console.log("Something else went wrong.");
            this.setState({ ErrorMessage: "Something else went wrong." });
        }
    }

    setSecureStore = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    }

}
export default SignUpScreen;


const styles = StyleSheet.create({
    screen: {
        padding: 30,
        backgroundColor: Colors.primary, //dark gray
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
        fontFamily: 'RedHatDisplay-Bold',
        color: Colors.secondary, //white
        fontSize: 24,
        marginBottom: '5%',
    },
    ErrorText: {
        fontFamily: 'RedHatDisplay-Regular',
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
        marginTop: 10,
    },
    clickableText: {
        fontFamily: 'RedHatDisplay-Regular',
        color: Colors.accent2,
        textDecorationLine: 'underline',
        marginTop: '5%'
    },
    buttonContainer: {
        marginTop: '10%',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: Colors.accent1,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 25,
    },
});

