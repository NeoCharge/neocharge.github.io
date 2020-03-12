import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../assets/colors';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class Dashboard extends React.Component {


    setSmartCharge = () => {
        console.log("going to change smart charge here");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.battery}>
                    <View style={styles.mileage}>
                        <Text style={{ fontSize: 40, color: Colors.secondary }}>120</Text>
                        <Text style={styles.text}>mi</Text>
                    </View>

                    <Image
                        source={require('../assets/empty-battery.png')}
                        style={styles.batteryIcon}
                        resizeMode='contain'
                    />

                    <View>
                        <Text style={styles.boldtext}>2 HOURS</Text>
                        <Text style={styles.text}>REMAINING</Text>
                    </View>
                </View>

                <View style={styles.charging}>
                    <View style={{ ...styles.circle, marginRight: 15 }}>
                        <Text style={{ fontSize: 40, color: Colors.secondary }}>9.6</Text>
                        <Text style={styles.text}>KWH</Text>
                    </View>

                    <View style={styles.pause}>
                        <Text style={styles.smalltext}>PAUSE</Text>
                    </View>
                    <TouchableHighlight onPress={this.setSmartCharge}>
                        <View style={{ ...styles.circle, marginLeft: 15 }}>

                            <Image
                                source={require('../assets/smart-icon.png')}
                                style={styles.smartIcon}
                                resizeMode='contain'
                            />
                            <Text style={styles.text}>SMART</Text>

                        </View>
                    </TouchableHighlight>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    battery: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: Colors.secondary,
        borderRadius: 15,
        padding: 10,
        width: '90%'
    },
    charging: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    batteryIcon: {
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined,
        margin: 10
    },
    smartIcon: {
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined
    },
    mileage: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    smalltext: {
        color: Colors.secondary,
        fontSize: 15
    },
    text: {
        color: Colors.secondary,
        fontSize: 20
    },
    boldtext: {
        color: Colors.secondary,
        fontSize: 25
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: 130,
        height: 130,
        borderRadius: 130,
        borderColor: Colors.secondary,
        borderWidth: 2
    },
    pause: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 60,
        width: 80,
        height: 80,
        borderRadius: 80,
        borderColor: Colors.accent2,
        borderWidth: 2
    },
});