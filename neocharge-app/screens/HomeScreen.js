import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import HomeOption from '../components/HomeOption';
import Dashboard from '../components/Dashboard';
import BannerIcon from '../components/BannerIcon';
import DeviceDisplay from '../components/DeviceDisplay';
import Colors from '../assets/colors';

export default class HomeScreen extends React.Component {
    // Adding header title, color and font weight
    static navigationOptions = {
        title: "Home",
        headerLeft: <BannerIcon />,
        headerStyle: {
            backgroundColor: Colors.accent2
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };

    render() {

        return (
            <View style={styles.container}>

                <DeviceDisplay />
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
                        screenName={'Notifications'}
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
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        marginTop: 15
    },
    tab: {
        padding: 15,
        borderRadius: 5
    },
    title: {
        backgroundColor: Colors.secondary
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
    // image: {
    //     flex: 1,
    //     alignSelf: 'stretch',
    //     height: undefined,
    //     width: undefined,
    //     margin: 25
    // },
    text: {
        color: Colors.secondary,
        fontSize: 20
    }
});