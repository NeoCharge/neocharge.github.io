import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';

class VerificationScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            UserEmail: this.props.navigation.state.params.userEmail,
            VerificationInputValue: '',
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
            <View>
                <Text>VERIFICATION SCREEN</Text>
            </View>
            <View>
                <Text style={styles.TextStyle}>An email has been sent to {this.state.UserEmail}.</Text>
                <Text style={styles.TextStyle}>Please enter the included code to verify your account.</Text>
            </View>
            <View>
                <Text style={styles.ErrorText}>{this.state.ErrorMessage}</Text>
            </View>
            <View>
                <TextInput
                    style={{ height: 40, width: '40%', borderColor: 'gray', borderWidth: 1 }}
                    placeholder='Verification Code'
                    onChangeText={VerificationInputValue => this.setState({ VerificationInputValue })}
                    autoCapitalize='none'
                />
                <Button title="Verify" onPress={() => this.verifySignUp()} />
            </View>
            <View>
                <Button title="Resend Code" 
                        onPress={() => this.resendVerificationCode()} />
            </View>
            <View>
                <Text 
                    style={styles.TextStyle} 
                    onPress={ () =>  this.cancelVerification()} >
                    Would you like to use a different email? Click here to return to sign-up.
                </Text>
            </View>
        </View>
      );
    }
  
    // Uses the entered verification code to verify the account
    verifySignUp = async() => {
        const email = this.state.UserEmail;
        const code = this.state.VerificationInputValue;
        var didError = false;
        try {
            // After retrieving the confirmation code from the user
            await Auth.confirmSignUp(email, code, {
                // Optional. Force user confirmation irrespective of existing alias. By default set to True.
                forceAliasCreation: true    
            })
            .then(data => console.log(data))
            .catch (error => {
                console.log(error.code);
                didError = true;
                if (typeof(error.code) === "undefined") {
                    console.log("Please enter a verification code.");
                    this.setState({ErrorMessage: "Please enter a verification code."})
                } else if (error.code === 'CodeMismatchException') {
                    console.log("The entered verification code is not valid.");
                    this.setState({ErrorMessage: "The entered verification code is not valid."});
                } else {
                    console.log("Something else went wrong.");
                    this.setState({ErrorMessage: "Something else went wrong."});
                }
            });
            // Continue to the "first-time-setup" screen upon successful verification
            if (didError === false) {
                this.props.navigation.navigate('Setup')
            }
        } catch (err) {
            console.log("catching error: " + err);
        }
    }

    // Resends a new verification code via email
    resendVerificationCode = async() => {
        const email = this.state.UserEmail;
        try {
            await Auth.resendSignUp(email).then(() => {
                console.log('code resent successfully')});
        } catch (err) {
            console.log(err);
            this.setState({ErrorMessage: "Something went wrong when attempting to send a new verification code."});
        }
    }

    // Returns the user to the Sign-Up screen
    cancelVerification = async() => {
        this.props.navigation.navigation('Auth');
    }

}
export default VerificationScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextStyle: {
        color: '#E88227',
        //textDecorationLine: 'underline'
    },
    ErrorText: {
        color: '#ff0000'
    }
});

// async function verifySignUp(email, code, props) {
//     try {
//         // After retrieving the confirmation code from the user
//         Auth.confirmSignUp(email, code, {
//             // Optional. Force user confirmation irrespective of existing alias. By default set to True.
//             forceAliasCreation: true    
//         }).then(data => console.log(data))
//         .then(props.navigation.navigate('App'));
//     } catch (err) {
//         console.log(err.response);
//         ErrorMessage => this.setState("The entered verification code is not valid.");
//     }
// }

// async function resendVerificationCode(email) {
//     try {
//         Auth.resendSignUp(email).then(() => {
//             console.log('code resent successfully')});
//     } catch (err) {
//         console.log(err);
//     }
// }

