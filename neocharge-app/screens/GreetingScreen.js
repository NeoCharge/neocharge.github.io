import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal, Image } from 'react-native';
import OnboardingLogo from '../components/OnboardingLogo';
import OnboardingInfo from '../components/OnboardingInfo';
import AppNavigator from '../navigation/AppNavigator';

const GreetingScreen = props => {

    const buttonPressHandler = () => {
        return (
            <View>
                <AppNavigator/>
            </View>
        );
      };

    return (
        <View>
            <View style={styles.logoContainer}>
                <OnboardingLogo />
            </View>
            <View style={styles.infoContainer}>
                <OnboardingInfo/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Continue" onPress={buttonPressHandler} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'column'
    },
    infoContainer: {

    },
    buttonContainer: {
        padding: 20
    }
});

export default GreetingScreen;