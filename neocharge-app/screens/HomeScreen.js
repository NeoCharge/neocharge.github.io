import React from 'react';
import { View, StyleSheet, Text, Image, useEffect } from 'react-native';
import HomeOption from '../components/HomeOption';
import Dashboard from '../components/Dashboard';
import BannerIcon from '../components/BannerIcon';
import Colors from '../assets/colors';
import Devices from '../assets/devices';
import { API } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';

const DELAY = 5000;
const NONE = 0;
const PRIMARY = 1;
const SECONDARY = 2;

export default class PrimaryDeviceScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            device: '',
            port: NONE,
            image: Devices.images["Logo"],
            primary: Colors.primary,
            secondary: Colors.primary,
            userEmail: ''
        }
    }

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

    async componentDidMount() {
        this.state.userEmail = await SecureStore.getItemAsync("secure_email");
        this.interval = setInterval(this.getRequest, DELAY);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getRequest = () => {
        API.get("LambdaProxy", "/chargeHistory",
            {
                "queryStringParameters": {
                    "email": this.state.userEmail
                }
            })
            .then(
                response => {
                    if (response != null) {
                        this.setState({ device: response["curDevice"] });
                        this.setState({ port: response["port"] });
                    } else {
                        console.log("No device currently charging");
                    }
                }
            ).catch(error => {
                console.log(error.response)
            });

        if (this.state.port === PRIMARY) {
            this.setState({ primary: Colors.faded })
            this.setState({ secondary: Colors.primary })
        } else if (this.state.port === SECONDARY) {
            this.setState({ secondary: Colors.faded })
            this.setState({ primary: Colors.primary })
        } else {
            this.setState({ primary: Colors.primary })
            this.setState({ secondary: Colors.primary })
        }

        if (Devices.images[this.state.device] === undefined) {
            this.setState({ image: Devices.images["Logo"] })
        } else {
            // Find image based on the curDevice name, must match constant in devices.js
            this.setState({ image: Devices.images[this.state.device] })
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.tabs}>
                    <View style={{ ...styles.tab, backgroundColor: this.state.primary }}>
                        <Text style={styles.text}>PRIMARY</Text>
                    </View>

                    <View style={{ ...styles.tab, backgroundColor: this.state.secondary }}>
                        <Text style={styles.text}>SECONDARY</Text>
                    </View>
                </View>
                <View style={styles.subcontainer1}>
                    <Image
                        source={this.state.image}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={{ ...styles.text, color: Colors.secondary, marginBottom: 10 }}>CHARGING</Text>
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