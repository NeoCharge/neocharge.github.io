import React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import Colors from '../assets/colors';
import Battery from '../assets/Battery.svg';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>
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

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 4
    },
    battery: {
        flex: 2.5,
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
        width: (.80 * swidth / 2)
    },
    mileage: {
        alignItems: 'flex-start',
        width: (.80 * swidth / 2)
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