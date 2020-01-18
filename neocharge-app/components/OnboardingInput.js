import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Button, Picker } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown'

const OnboardingInput = props => {

    const timeZoneInputs = ['PST', 'MST', 'CST', 'EST'];
    const deviceInputs = ['Vehicle', 'Washer/Dryer', 'None'];

    const [deviceID, setDeviceID] = useState('');

    const deviceInputHandler = (enteredText) => {
        setDeviceID(enteredText);
        props.setDeviceIDHandler(enteredText);
    };

    const timeZoneHandler = (selectedVal) => {
        props.timeZoneHandler(timeZoneInputs[selectedVal]);
    };

    const primDevHandler = (selectedVal) => {
        props.primDevHandler(deviceInputs[selectedVal]);
    };

    const secDevHandler = (selectedVal) => {
        props.secDevHandler(deviceInputs[selectedVal]);
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
                <View style={styles.pickerContainer}>
                    <ModalDropdown options={timeZoneInputs} onSelect={timeZoneHandler} />
                </View>
            </View>
            <View style={styles.deviceInfoContainer}>
                <Text style={styles.promptText}>Select Primary Device</Text>
                <View style={styles.pickerContainer}>
                    <ModalDropdown options={deviceInputs} onSelect={primDevHandler} />
                </View>
            </View>
            <View style={styles.deviceInfoContainer}>
                <Text style={styles.promptText}>Select Secondary Device</Text>
                <View style={styles.pickerContainer}>
                    <ModalDropdown options={deviceInputs} onSelect={secDevHandler} />
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    deviceInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: '90%',
        padding: 10
    },
    promptText: {
        textAlign: "center",
        fontSize: 20
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    itemStyle: {
        fontSize: 10
    }
});

export default OnboardingInput;