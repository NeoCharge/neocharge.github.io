import React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import Colors from '../assets/colors';
import Devices from '../assets/devices';
import Battery from '../assets/Battery.svg';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

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

                {/* TODO: Make battery clickable, and stats reflect actual numbers */}
                <View style={styles.subcontainer2}>
                    <View style={styles.battery}>
                        <Battery width={swidth / 2} height={swidth * .2} />
                    </View>

                    <View style={styles.stats}>
                        <View style={styles.time}>
                            <Text style={styles.stattext}>2 hrs</Text>
                            <Text style={styles.text}>remaining</Text>
                        </View>

                        <View style={styles.mileage}>
                            <Text style={styles.stattext}>120 mi</Text>
                            <Text style={styles.text}>range</Text>
                        </View>
                    </View>
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

    line: {
        marginVertical: 5
    },
    subcontainer1: {
        flex: 4,
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
    },

    subcontainer2: {
        flex: 4,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    battery: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

    stats: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: swidth
    },
    time: {
        alignItems: 'flex-end',
        width: (swidth * .4)
    },
    mileage: {
        alignItems: 'flex-start',
        width: (swidth * .4)
    },
    stattext: {
        fontFamily: 'RedHatDisplay-Bold',
        color: Colors.secondary,
        fontSize: (swidth * 0.072),
    },
    text: {
        fontFamily: 'RedHatDisplay-Regular',
        color: Colors.secondary,
        fontSize: 25,
        lineHeight: (swidth * 0.06)
    },
});