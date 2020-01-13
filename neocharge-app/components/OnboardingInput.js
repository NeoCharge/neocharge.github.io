import React, {useState} from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const OnboardingInput = props => {

    const [deviceID, setDeviceID] = useState('');

    const deviceInputHandler = (enteredText) => {
      setDeviceID(enteredText);
    };

    return (
        <View style={styles.inputContainer}>
            <View style={styles.deviceInfoContainer}>
                <Text style={styles.promptText}>Device ID</Text>
                <TextInput
                    placeholder="Enter Decive ID Here"
                    style={styles.input}
                    onChangeText={deviceInputHandler}
                    value={deviceID}
                />
            </View>
            <View style={styles.deviceInfoContainer}>
                <Text style={styles.promptText}>Select Time Zone</Text>
                
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    deviceInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    promptText: {
        textAlign: "center",
        fontSize: 20
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    }
});

export default OnboardingInput;