import React from 'react';
import { View, StyleSheet, Image, Text, Button } from 'react-native';

const OnboardingInfo = props => {

    return (
        <View style={styles.infoContainer}>
            <View style={styles.usageContainer}>
                <Image style={{ width: 90, height: 90 }} source={require('../assets/LineChart.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.textInfo}>View power usage</Text>
                    <Text style={styles.textInfo}>and spending history</Text>
                </View>
            </View>
            <View style={styles.usageContainer}>
                <Image style={{ width: 90, height: 90 }} source={require('../assets/Calendar.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.textInfo}>Schedule charging</Text>
                    <Text style={styles.textInfo}>sessions</Text>
                </View>
            </View>
            <View style={styles.usageContainer}>
                <Image style={{ width: 90, height: 90 }} source={require('../assets/Leaf.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.textInfo}>Know how green</Text>
                    <Text style={styles.textInfo}>your energy is</Text>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    usageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    textInfo: {
        textAlign: "center",
        fontSize: 20
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    }
});

export default OnboardingInfo;