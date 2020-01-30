import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            EmailInputValue: '',
            PasswordInputValue: '',
            ErrorMessage: '',
            jsonDeviceLogs: []
        }
    }

    static navigationOptions = {
      title: 'Please sign up',
    };

  
    render() {
      return (
        <View style={styles.container} >
            <Text>SIGN-UP SCREEN</Text>
            <Text style={styles.ErrorText}>{this.state.ErrorMessage}</Text>
            <TextInput
                style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
                placeholder='Email'
                onChangeText={EmailInputValue => this.setState({ EmailInputValue })}
                autoCapitalize='none'
            />
            <TextInput
                style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1 }}
                placeholder='Password'
                onChangeText={PasswordInputValue => this.setState({ PasswordInputValue })}
                secureTextEntry={true}
                autoCapitalize='none'
            />
            <Button title="Sign up!" onPress={() => this.SignUp()} />
            <Text 
                style={styles.TextStyle} 
                onPress={ () =>  this.props.navigation.navigate('SignIn')} >
            Already have an account? Click here to Sign-In.
            </Text>
        </View>
      );
    }

    // Function that registers the inputted email and password when a user clicks the "Sign-Up" button
    SignUp = async() => {
        const email = this.state.EmailInputValue;
        const password = this.state.PasswordInputValue;
        var didError = false;
        try {
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
                    didError = true;
                    if (typeof(error.code) === "undefined") {
                        console.log("Email and password cannot be empty.");
                        this.setState({ErrorMessage: "Email and password cannot be empty."});
                    } else if (error.code === 'UsernameExistsException') {
                        console.log("Email already in use.");
                        this.setState({ErrorMessage: "Email already in use."});
                    } else if (error.code === 'InvalidParameterException') {
                        console.log("Invalid password entered");
                        this.setState({ErrorMessage: "Passwords must contain at least 8 characters."});
                    } else {
                        console.log("Something else went wrong.");
                        this.setState({ErrorMessage: "Something else went wrong."});
                    }
                 });
            // Continue to verification page if Sign-Up was successful
            if (didError === false) {
                this.props.navigation.navigate('Verify', {userEmail : email});
            }
        } catch (err) {
            console.log("catching error: " + err);
        }
    }

}
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextStyle: {
        color: '#E88227',
        textDecorationLine: 'underline'
    },
    ErrorText: {
        color: '#ff0000'
    }
});

// async function SignUp(email, password, props, state) {
//     try {
//         const check = await Auth.signUp({
//             username: email,
//             password: password,
//             attributes: {
//                 email: email
//             },
//             validationData: []    
//         })
//         //.then(data => console.log(data))
//         //.catch(error => this.setState({ ErrorCode: error.code }))
//         .catch(error => {
//                 console.log(error.code);
//                 if (typeof(error.code) === "undefined") {
//                     console.log("Email and password cannot be empty.");
//                     state.ErrorMessage = "Email and password cannot be empty.";
//                 } else if (error.code === 'UsernameExistsException') {
//                     // The error happens if the email entered is already in use
//                     console.log("Email already in use.");
//                     state.ErrorMessage = "Email already in use.";
//                 } else if (error.code === 'InvalidParameterException') {
//                     // The error happens when an invalid password is entered.
//                     console.log("Invalid password entered");
//                     state.ErrorMessage = "Passwords must contain at least 8 characters.";
//                 } else {
//                     console.log("Something else went wrong.");
//                     state.ErrorMessage = "Something else went wrong.";
//                 }
//              });

//         console.log(this);
//         forceUpdate();
//         console.log(check);
//         console.log(check.userConfirmed);
//         // Continue to verification page if user has not yet been verified
//         if (check.userConfirmed === false) {
//             props.navigation.navigate('Verify', {userEmail : email});
//         }
//     } catch (err) {
//         console.log("catching error: " + err);
//     }
// }

