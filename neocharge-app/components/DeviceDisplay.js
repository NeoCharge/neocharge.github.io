import React from 'react';
import { Dimensions, View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../assets/colors';
import Devices from '../assets/devices';
import { API } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import CarIcon from '../assets/CarIcon.svg';
import { Svg, Line } from 'react-native-svg';


const DELAY = 5000;
const NONE = 0;
const PRIMARY = 1;
const SECONDARY = 2;
const BOTH = 3;

const charging = 'CHARGING';
const notCharging = 'NOT IN USE';
const dualCharging = 'DUAL CHARGING';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

export default class DeviceDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            device: '',
            port: NONE,
            image: Devices.images["Logo"],
            primaryHighlight: Colors.primary,
            secondaryHighlight: Colors.primary,
            userEmail: '',
            primChargeRate: 0,
            secChargeRate: 0,
            status: notCharging
        }
    }

    async componentDidMount() {

        this.state.userEmail = await SecureStore.getItemAsync("secure_email");

        await this.getRequest();

        // Set interval to poll database for most recent change
        this.interval = setInterval(async () => {
            await this.getRequest();
        }, DELAY);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async getRequest() {
        const jsonObj = {
            "queryStringParameters": {
                "userEmail": this.state.userEmail
            }
        };

        let primDev;
        let secDev;

        // console.log("making device display request")
        await API.get("LambdaProxy", "/chargerate", jsonObj)
            .then(
                response => {
                    if (response != null) {
                        this.setState({ port: response["CurDevice"] })
                        this.setState({ primChargeRate: response["PriChargeRate"] })
                        this.setState({ secChargeRate: response["SecChargeRate"] })
                        primDev = response["PrimDev"]
                        secDev = response["SecDev"]
                    } else {
                        console.log("No device currently charging");
                    }
                }
            ).catch(error => {
                console.log(error.response)
            });

        if (this.state.port === PRIMARY) {
            this.setState({ status: charging })
            this.setState({ device: primDev })
            this.setState({ primaryHighlight: Colors.accent1 })
            this.setState({ secondaryHighlight: Colors.primary })
        } else if (this.state.port === SECONDARY) {
            this.setState({ status: charging })
            this.setState({ device: secDev })
            this.setState({ secondaryHighlight: Colors.accent1 })
            this.setState({ primaryHighlight: Colors.primary })
        } else if (this.state.port === BOTH) {
            this.setState({ status: dualCharging })
            this.setState({ device: 'Both' })
            this.setState({ primaryHighlight: Colors.accent1 })
            this.setState({ secondaryHighlight: Colors.accent1 })
        } else {
            this.setState({ status: notCharging })
            this.setState({ primaryHighlight: Colors.primary })
            this.setState({ secondaryHighlight: Colors.primary })
        }

        // If device name does not have an associated picture, show NeoCharge Logo
        if (Devices.images[this.state.device] === undefined) {
            this.setState({ image: Devices.images["Logo"] })
        } else if (this.state.device == 'Both') {
            this.setState({ image: Devices.images["Dual"] })
        } else {
            // Find image based on the curDevice name, must match constant in devices.js
            this.setState({ image: Devices.images[this.state.device] })
        }
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.tabs}>
                    <View style={{ ...styles.tab, backgroundColor: this.state.primaryHighlight }}>
                        <Text style={styles.tabText}>Primary</Text>
                        <Svg height='2' width='100%' style={styles.line} >
                            <Line x1="0" y1="0" x2='100%' y2="0" stroke={Colors.secondary} strokeWidth="5" />
                        </Svg>
                        <Text style={styles.tabText}>{this.state.primChargeRate} kW</Text>
                    </View>

                    <View style={{ ...styles.tab, backgroundColor: this.state.secondaryHighlight }}>
                        <Text style={styles.tabText}>Secondary</Text>
                        <Svg height='2' width='100%' style={styles.line}>
                            <Line x1="0" y1="0" x2='100%' y2="0" stroke={Colors.secondary} strokeWidth="5" />
                        </Svg>
                        <Text style={styles.tabText}>{this.state.secChargeRate} kW</Text>
                    </View>
                </View>

                <View style={styles.subcontainer1}>
                    <View style={styles.car}>
                        {this.state.image}
                    </View>

                    <View>
                        <Text style={styles.chargeStatus}>{this.state.status}</Text>
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
    tabs: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: (.8 * (swidth / 2)),
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5
    },
    tabText: {
        fontFamily: 'RedHatDisplay-Bold',
        color: Colors.secondary,
        fontSize: 20
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
    car: {
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