import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import HomeOption from '../components/HomeOption';
import SmartChargeButton from '../components/SmartChargeButton';
import PauseButton from '../components/PauseButton';
import Dashboard from '../components/Dashboard';
import Colors from '../assets/colors';
import ChargingHistory from '../assets/ChargingHistory.svg';
import ScheduleCharge from '../assets/ScheduleCharge.svg';
import SmartSettings from '../assets/SmartSettings.svg';
import Notifications from '../assets/Notifications.svg';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

const iconSize = sheight * 0.045;

export default class HomeScreen extends React.Component {
    // Adding header title, color and font weight
    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.primary,
            borderBottomWidth: 0,
            height: 0
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Dashboard />

                {/*TODO: Change what each button does based on which tab is showing */}
                <View style={styles.buttons}>
                    <SmartChargeButton />
                    <PauseButton />
                </View>

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

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    subcontainer: {
        flex: 3,
        flexDirection: 'column',
        paddingBottom: 20,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});