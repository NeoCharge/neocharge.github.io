import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native';
import { Auth } from 'aws-amplify';

class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            EmailInputValue: '',
            PasswordInputValue: '',
            VerificationInputValue: '',
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
            <Button title="Sign up!" 
                onPress={() => SignUp(this.state.EmailInputValue, this.state.PasswordInputValue)} />
            <Text 
                style={styles.TextStyle} 
                onPress={ ()=>  this.props.navigation.navigate('SignIn')} >
            Already have an account? Click here to Sign-In.
            </Text>
            <TextInput
                style={{ height: 40, width: '40%', borderColor: 'gray', borderWidth: 1 }}
                placeholder='Verification Code'
                onChangeText={VerificationInputValue => this.setState({ VerificationInputValue })}
                autoCapitalize='none'
            />
            <Button title="Verify" 
                onPress={() => verifySignUp(this.state.EmailInputValue, this.state.VerificationInputValue, this.props)} />
             <Button title="Resend Code" 
                onPress={() => resendVerificationCode(this.state.EmailInputValue)} />
        </View>
      );
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
    }
});

async function SignUp(email, password) {
    try {
        console.log("fdklsajfkldsjaf " + email + " fjdksaf " + password)
    Auth.signUp({
        username: email,
        password: password,
        attributes: {
            email: email
        },
        validationData: []    
    })
        .then(data => console.log(data));
    } catch (err) {
        console.log(err);
    }
}

async function verifySignUp(email, code, props) {
    try {
        // After retrieving the confirmation code from the user
        Auth.confirmSignUp(email, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true    
        }).then(data => console.log(data));
        props.navigation.navigate('App');
    } catch (err) {
        console.log(err);
    }
}

async function resendVerificationCode(email) {
    try {
        Auth.resendSignUp(email).then(() => {
            console.log('code resent successfully')});
    } catch (err) {
        console.log(err);
    }
}

