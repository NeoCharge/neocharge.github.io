import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';

class VerificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.verifySignUp = this.verifySignUp.bind(this);
        this.state = {
            UserEmail: this.props.navigation.state.params.userEmail,
            VerificationInputValue: '',
            ErrorMessage: '',
            ResentMessage: '',
            jsonDeviceLogs: []
        } 
    }
  
    render() {
      return (
        <View style={styles.screen} >
            <View style={styles.contents}>
                <Text style={styles.title}>Account Verification</Text>
                <Text style={styles.TextStyle}>An email has been sent to:</Text>
                <Text style={styles.TextStyle}>{this.state.UserEmail}</Text>
                <Text style={styles.TextStyle}>Please enter the included code to verify your account.</Text>
                <Text style={styles.ErrorText}>{this.state.ErrorMessage}</Text>
                <View style={styles.inputRow}>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder='Verification Code'
                        onChangeText={VerificationInputValue => this.setState({ VerificationInputValue })}
                        autoCapitalize='none'
                    />
                    <Button title="Verify" onPress={this.verifySignUp} />
                </View>
                <View style={styles.ButtonStyle}>
                    <Button title="Resend Code" 
                            onPress={() => this.resendVerificationCode2()} />
                </View>
                <Text style={styles.ResentStyle}>{this.state.ResentMessage}</Text>
                <Text 
                    style={styles.ClickableText} 
                    onPress={this.cancelVerification} >
                    Would you like to use a different email?{"\n"}Click here to return to sign-up.
                </Text>
            </View>
        </View>
      );
    }
  
    // Uses the entered verification code to verify the account
    async verifySignUp(event) {
        event.preventDefault();
        const email = this.state.UserEmail;
        const code = this.state.VerificationInputValue;
        var noErrors = true;
        try {
            // After retrieving the confirmation code from the user
            await Auth.confirmSignUp(email, code, {
                // Optional. Force user confirmation irrespective of existing alias. By default set to True.
                forceAliasCreation: true    
            })
            .then(data => console.log(data))
            .catch (error => {
                console.log(error.code);
                noErrors = false;
                this.handleErrors(error.code);
            });
            // Continue to the "first-time-setup" screen upon successful verification
            if (noErrors) {
                this.props.navigation.navigate('Setup')
            }
        } catch (err) {
            console.log("catching error: " + err);
        }
    }

    handleErrors(errorcode) {
        if (typeof(errorcode) === "undefined") {
            console.log("Please enter a verification code.");
            this.setState({ErrorMessage: "Please enter a verification code."})
        } 
        else if (errorcode === 'CodeMismatchException') {
            console.log("The entered verification code is not valid.");
            this.setState({ErrorMessage: "The entered verification code is not valid."});
        } 
        else if (errorcode === 'NetworkError') {
            console.log("Network error.");
            this.setState({ErrorMessage: "Network error."});
        } 
        else {
            console.log("Something else went wrong.");
            this.setState({ErrorMessage: "Something else went wrong."});
        }
    }
    

    // Resends a new verification code via email
    resendVerificationCode = async() => {
        const email = this.state.UserEmail;
        var noErrors = true;
        try {
            await Auth.resendSignUp(email)
            .catch(error => {
                noErrors = false;
                if (error.code === 'NetworkError') {
                    console.log("Network error.");
                    this.setState({ErrorMessage: "Network error while resending code."});
                } else {
                    console.log("Something else went wrong.");
                    this.setState({ErrorMessage: "Something went wrong attempting to resend code."});
                }
            });
            if (noErrors) {
                console.log("Code resent successfully.");
                this.setState({ResentMessage: "A new code has been sent."});
            }
        } catch (err) {
            console.log("catching error: " + err);
        }
    }

    resendVerificationCode2 = async() => {
        this.setState({ResentMessage: "A new code has been sent."});
    }

    // Returns the user to the Sign-Up screen and delete unverified user (?) TODO
    cancelVerification = () => {
        this.props.navigation.navigate('SignUp');
    }

}
export default VerificationScreen;

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
        color: '#fff',
        fontSize: 20,
        marginBottom: '5%',
    },
    ErrorText: {
        color: '#ff0000', //red
        flexDirection: 'column',
        marginTop: '5%',
        marginBottom: '5%',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: '5%',
    },
    inputContainer: {
        height: 40,
        width: '40%',
        color: 'white',
        borderColor: 'gray',
        paddingLeft: 10,
        borderWidth: 1,
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    ButtonStyle: {
        marginTop: '5%',
    },
    ResentStyle: {
        color: '#27b83a', //green
        marginBottom: '5%',
    },
    ClickableText: {
        color: '#E88227', //orange
        textDecorationLine: 'underline',
        textAlign: 'center',
    }
});

