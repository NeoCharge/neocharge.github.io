import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import HomeOption from '../components/HomeOption';
import SmartChargeButton from '../components/SmartChargeButton';
import PauseButton from '../components/PauseButton';
import Dashboard from '../components/Dashboard';
import Colors from '../assets/colors';
import ChargingHistoryIcon from '../assets/ChargingHistory.svg';
import ScheduleChargeIcon from '../assets/ScheduleCharge.svg';
import SmartSettingsIcon from '../assets/SmartSettings.svg';
import NotificationsIcon from '../assets/Notifications.svg';

import { API, Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

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

    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            pushToken: '',
            hasLoggedData: false
        };
    }

    // push notification 
    async componentDidMount() {
        this.setState({ userEmail: await SecureStore.getItemAsync("secure_email") });

        registerForPushNotificationsAsync(this.state.userEmail).then(value => {
            this.state.pushToken = value;
        });

        this.logOnboardingInfo();
    }

    async logOnboardingInfo() {

        //check to see if the user has already clicked the continue button
        //if they have, then don't enter, because it will create another user entry in the DB
        if (!this.state.hasLoggedData) {
            // console.log("userEmail: " + this.state.userEmail);
            // console.log("timeZone: " + this.props.navigation.state.params.timeZone);
            // console.log("primaryDevice: " + this.props.navigation.state.params.primaryDevice);
            // console.log("secondaryDevice: " + this.state.secondaryDevice);
            // console.log("deviceID: " + this.props.navigation.state.params.deviceID);
            // console.log(this.state.pushToken);

            // TODO is there a reason we should still leave this here for testing? -josh
            //let devID = "XSD-934859734-TTYZ";

            let requestBody = {
                "userEmail": this.state.userEmail,
                "timeZone": this.props.navigation.state.params.timeZone,
                "primaryDevice": this.props.navigation.state.params.primaryDevice,
                "secondaryDevice": this.props.navigation.state.params.secondaryDevice,
                "deviceID": this.props.navigation.state.params.deviceID,
                "pushToken": this.state.pushToken
            };

            let jsonObj = {
                "body": requestBody
            }

            const path = "/user";
            const apiResponse = await API.put("LambdaProxy", path, jsonObj) //replace the desired API name
                .then(() => {
                    console.log(apiResponse);
                    this.state.hasLoggedData = true;
                })
                .catch(error => {
                    console.log(error.code);
                    alert("Something went wrong while setting up your account.\n" +
                        "Please send an email to thejuicerzcapstone@gmail.com if this problem persists.");
                });
        } else {
            console.log("It didn't log info because hadLoggedData was true")
        }
    };

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
                        img={<ChargingHistoryIcon width={iconSize} height={iconSize} />}
                        name='Charging History' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'SchedulingHome'}
                        img={<ScheduleChargeIcon width={iconSize} height={iconSize} />}
                        name='Schedule Charge' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'Settings'}
                        img={<SmartSettingsIcon width={iconSize} height={iconSize} />}
                        name='Smart Settings' />

                    <HomeOption nav={this.props.navigation}
                        screenName={'Notifications'}
                        img={<NotificationsIcon width={iconSize} height={iconSize} />}
                        name='Notifications' />
                </View>

            </View>
        );
    }
}

async function registerForPushNotificationsAsync(userEmail) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // only asks if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // On Android, permissions are granted on app installation, so
    // `askAsync` will never prompt the user

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
        alert('No notification permissions!');
        return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log("value is " + token);
    console.log("type is " + typeof token);

    return token;
    //if (!userHasToken()) {
    //logPushNotifcationToken(token, userEmail);
    //}

};

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