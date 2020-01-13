import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal, Image } from 'react-native';
import OnboardingLogo from '../components/OnboardingLogo';
import OnboardingInfo from '../components/OnboardingInfo';

const GreetingScreen = props => {

    return (
        <View>
            <View style={styles.logoContainer}>
                <OnboardingLogo />
            </View>
            <View style={styles.infoContainer}>
                <OnboardingInfo/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'column',
        //padding: 160
        //justifyContent: '',
        //alignItems: 'center'
    },
    infoContainer: {

    }
});

export default GreetingScreen;