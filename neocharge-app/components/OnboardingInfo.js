import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const OnboardingInfo = props => {

    return (
        <View style={styles.infoContainer}>
            <View style={styles.usageContainer}>
                <Image style={{width: 100, height: 100}} source={require('../assets/LineChart.png')} />
                <View style={styles.textContainer}> 
                    <Text style={styles.textInfo}>View power usage</Text>
                    <Text style={styles.textInfo}>and spending history</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    usageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%'
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