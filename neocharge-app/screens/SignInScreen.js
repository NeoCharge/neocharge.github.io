import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';

class SignInScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            EmailInputValue: '',
            PasswordInputValue: '',
            jsonDeviceLogs: []
        }
    }
  
    render() {
      return (
        <View style={styles.container} >
            <Text>SIGN-IN SCREEN</Text>
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

            <Button title="Sign in!" 
            onPress={() => SignIn(this.state.EmailInputValue, this.state.PasswordInputValue, this.props)} />
            
            <Text 
                style={styles.TextStyle} 
                onPress={ ()=>  this.props.navigation.navigate('SignUp')} >
            Don't have an account? Click here to Sign-Up.
            </Text>
        </View>
      );
    }
    
  }
export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextStyle: {
        color: '#E88227',
        textDecorationLine: 'underline'
    }
});

async function SignIn(email, password, props) {
    console.log("Click!");
    try {
        const user = await Auth.signIn(email, password);
        console.log(user);
        props.navigation.navigate('App');
    } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
            // The error happens if the user didn't finish the confirmation step when signing up
            // In this case you need to resend the code and confirm the user
            // About how to resend the code and confirm the user, please check the signUp part
            console.log(err);
        } else if (err.code === 'PasswordResetRequiredException') {
            // The error happens when the password is reset in the Cognito console
            // In this case you need to call forgotPassword to reset the password
            // Please check the Forgot Password part.
            console.log(err);
        } else if (err.code === 'NotAuthorizedException') {
            // The error happens when the incorrect password is provided
            console.log(err);
        } else if (err.code === 'UserNotFoundException') {
            // The error happens when the supplied username/email does not exist in the Cognito user pool
            console.log(err);
        } else {
            console.log(err);
        }
    }
}