import React from 'react';
import { Dimensions, View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../assets/colors';
import Devices from '../assets/devices';
import { API } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import Battery from '../assets/Battery.svg';
import { Svg, Line } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            device: '',
            port: NONE,
            primaryHighlight: Colors.primary,
            secondaryHighlight: Colors.primary,
            userEmail: '',
            primChargeRate: 0,
            secChargeRate: 0,
            pStatus: notCharging,
            sStatus: notCharging,
            pImage: Devices.images["Logo"],
            sImage: Devices.images["Logo"],
            tabPressed: NONE
        }
    }

    async componentDidMount() {
        this.state.userEmail = await SecureStore.getItemAsync("secure_email");

        // TODO: optimize this, the only difference is that this first request updates which tab is pressed
        // Default tab that is pressed is the side that is charging
        await this.getFirstRequest();

        // Set interval to poll database for most recent change
        this.interval = setInterval(async () => {
            await this.getRequest();
        }, DELAY);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async getFirstRequest() {
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
            this.setState({
                pStatus: charging,
                sStatus: notCharging,
                device: primDev,
                primaryHighlight: Colors.accent1,
                secondaryHighlight: Colors.primary,
                tabPressed: PRIMARY
            })
        } else if (this.state.port === SECONDARY) {
            this.setState({
                pStatus: notCharging,
                sStatus: charging,
                device: secDev,
                secondaryHighlight: Colors.accent1,
                primaryHighlight: Colors.primary,
                tabPressed: SECONDARY
            })
        } else if (this.state.port === BOTH) {
            // TODO: What happens to the tabs if both ports are charging?
            // this.setState({ status: dualCharging })
            // this.setState({ device: 'Both' })
            // this.setState({ primaryHighlight: Colors.accent1 })
            // this.setState({ secondaryHighlight: Colors.accent1 })
        } else {
            this.setState({
                pStatus: notCharging,
                sStatus: notCharging,
                primaryHighlight: Colors.primary,
                secondaryHighlight: Colors.primary,
                tabPressed: NONE
            })
        }

        this.setState({
            pImage: Devices.images[primDev],
            sImage: Devices.images[secDev]
        })
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
            this.setState({
                pStatus: charging,
                sStatus: notCharging,
                device: primDev,
            })
        } else if (this.state.port === SECONDARY) {
            this.setState({
                pStatus: notCharging,
                sStatus: charging,
                device: secDev,
            })
        } else if (this.state.port === BOTH) {
            // TODO: What happens to the tabs if both ports are charging?
            // this.setState({ status: dualCharging })
            // this.setState({ device: 'Both' })
            // this.setState({ primaryHighlight: Colors.accent1 })
            // this.setState({ secondaryHighlight: Colors.accent1 })
        } else {
            this.setState({
                pStatus: notCharging,
                sStatus: notCharging
            })
        }

        this.setState({
            pImage: Devices.images[primDev],
            sImage: Devices.images[secDev]
        })

        // // If device name does not have an associated picture, show NeoCharge Logo
        // if (Devices.images[this.state.device] === undefined) {
        //     this.setState({ image: Devices.images["Logo"] })
        // } 

        // else if (this.state.device == 'Both') {
        //     this.setState({ image: Devices.images["Dual"] })
        // } 

        // else {
        //     // Find image based on the curDevice name, must match constant in devices.js
        //     this.setState({ image: Devices.images[this.state.device] })
        // }
    }

    showChargingStats() {
        if (this.state.tabPressed == PRIMARY) {
            return <View style={{ ...styles.subcontainer1, flex: 8 }}>
                <View style={styles.car}>
                    {this.state.pImage}
                </View>

                <Text style={styles.chargeStatus}>{this.state.pStatus}</Text>
            </View>
        } else if (this.state.tabPressed == SECONDARY) {
            return <View style={styles.subcontainer1}>
                <View style={styles.car}>
                    {this.state.sImage}
                </View>

                <Text style={styles.chargeStatus}>{this.state.sStatus}</Text>
            </View>
        } else {
            return null
        }

    }

    changeTab(side) {
        if (side == PRIMARY) {
            this.setState({
                tabPressed: PRIMARY,
                primaryHighlight: Colors.accent1,
                secondaryHighlight: Colors.primary
            })
        } else {
            this.setState({
                tabPressed: SECONDARY,
                primaryHighlight: Colors.primary,
                secondaryHighlight: Colors.accent1
            })
        }
    }


    render() {

        return (
            <View style={styles.container}>

                <View style={styles.tabs}>
                    <TouchableOpacity onPress={this.changeTab.bind(this, PRIMARY)}
                        style={{ ...styles.tab, backgroundColor: this.state.primaryHighlight }}>
                        <Text style={styles.tabText}>Primary</Text>

                        {/* Line only shows if it is charging */}
                        <Svg height='2' width='100%' style={styles.line} >
                            {this.state.primChargeRate > 0 &&
                                <Line x1="0" y1="0" x2='100%' y2="0" stroke={Colors.secondary} strokeWidth="5" />
                            }
                        </Svg>
                        <Text style={styles.tabText}>{this.state.primChargeRate} kW</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.changeTab.bind(this, SECONDARY)}
                        style={{ ...styles.tab, backgroundColor: this.state.secondaryHighlight }}>
                        <Text style={styles.tabText}>Secondary</Text>
                        <Svg height='2' width='100%' style={styles.line} >
                            {this.state.secChargeRate > 0 &&
                                <Line x1="0" y1="0" x2='100%' y2="0" stroke={Colors.secondary} strokeWidth="5" />
                            }
                        </Svg>
                        <Text style={styles.tabText}>{this.state.secChargeRate} kW</Text>
                    </TouchableOpacity>
                </View>

                {this.showChargingStats()}

                {this.state.tabPressed == SECONDARY &&
                    /* TODO: Make battery clickable, and stats reflect actual numbers */
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
                }

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