import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import HomeOption from '../components/HomeOption';
import Dashboard from '../components/Dashboard';
import Colors from '../assets/colors';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tab}>
                    <Text style={styles.text}>PRIMARY</Text>
                    <Text style={styles.text}>SECONDARY</Text>
                </View>
                <View style={styles.subcontainer1}>
                    <Image
                        source={require('../assets/car-icon.png')}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={{ ...styles.text, marginBottom: 10 }}>CHARGING</Text>
                </View>

                <Dashboard />

                <View style={styles.subcontainer2}>
                    <HomeOption nav={this.props.navigation}
                        screenName={'ChargingHistory'}
                        img={require('../assets/history-icon.png')}
                        name='CHARGING HISTORY' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'SchedulingHome'}
                        img={require('../assets/schedule-icon.png')}
                        name='SCHEDULE CHARGE' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'Settings'}
                        img={require('../assets/smart-settings-icon.png')}
                        name='SMART SETTINGS' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'SchedulingHome'}
                        img={require('../assets/notification-icon.png')}
                        name='NOTIFICATIONS' />
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 15
    },
    subcontainer1: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    subcontainer2: {
        flex: 3,
        flexDirection: 'column',
        paddingBottom: 20,
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined,
        margin: 25
    },
    text: {
        color: Colors.secondary,
        fontSize: 20
    }
});