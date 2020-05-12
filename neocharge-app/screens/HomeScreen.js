import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeOption from '../components/HomeOption';
import Dashboard from '../components/Dashboard';
import BannerIcon from '../components/BannerIcon';
import DeviceDisplay from '../components/DeviceDisplay';
import Colors from '../assets/colors';
import ChargingHistory from '../assets/ChargingHistory.svg';
import ScheduleCharge from '../assets/ScheduleCharge.svg';
import SmartSettings from '../assets/SmartSettings.svg';
import Notifications from '../assets/Notifications.svg';

const iconSize = 40;

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

                <View style={styles.subcontainer}>
                    <HomeOption nav={this.props.navigation}
                        screenName={'ChargingHistory'}
                        img={<ChargingHistory width={iconSize} height={iconSize} />}
                        name='Charging History' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'SchedulingHome'}
                        img={<ScheduleCharge width={iconSize} height={iconSize} />}
                        name='Schedule Charge' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'Settings'}
                        img={<SmartSettings width={iconSize} height={iconSize} />}
                        name='Smart Settings' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'Notifications'}
                        img={<Notifications width={iconSize} height={iconSize} />}
                        name='Notifications' />
                </View>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 10,
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
    subcontainer: {
        flex: 6,
        flexDirection: 'column',
        paddingBottom: 20,
    },
    text: {
        color: Colors.secondary,
        fontSize: 20
    }
});