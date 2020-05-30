import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../assets/colors';
import Devices from '../assets/devices';

export default class Dashboard extends React.Component {
    render() {
        const image = Devices.images[this.props.imgName]

        return (
            <View style={styles.container}>
                <View style={styles.subcontainer1}>
                    <View style={styles.image}>
                        {image != undefined ? image : Devices.images['None']}
                    </View>

                    <Text style={styles.chargeStatus}>{this.props.status}</Text>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },

    subcontainer1: {
        flex: 8,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    image: {
        width: '100%',
        height: '75%',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },

    chargeStatus: {
        fontFamily: 'RedHatDisplay-Bold',
        letterSpacing: 2, // only works on iOS
        color: Colors.secondary,
        fontSize: 25,
        paddingVertical: 10
    }
});