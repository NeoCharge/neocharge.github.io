import React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import { Svg, Line } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../assets/colors';
import { API } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import Appliance from './Appliance.js';
import Car from './Car.js';

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
            pDevice: 'Logo', // names for image, default is NeoChargeLogo
            sDevice: 'Logo',
            tabPressed: NONE
        }
    }

    async componentDidMount() {
        this.state.userEmail = await SecureStore.getItemAsync("secure_email");

        // TODO: optimize this, the only difference is that this first request updates which tab is pressed
        // Default tab that is pressed is the side that is charging
        await this.getRequest();
        this.defaultTab();

        // Set interval to poll database for most recent change
        this.interval = setInterval(async () => {
            await this.getRequest();
        }, DELAY);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async defaultTab() {
        if (this.state.port === PRIMARY) {
            this.setState({
                primaryHighlight: Colors.accent1,
                secondaryHighlight: Colors.primary,
                tabPressed: PRIMARY
            })
        } else if (this.state.port === SECONDARY) {
            this.setState({
                secondaryHighlight: Colors.accent1,
                primaryHighlight: Colors.primary,
                tabPressed: SECONDARY
            })
        } else if (this.state.port === BOTH) {
            // TODO: What happens to the tabs if both ports are charging?
        } else { // Secondary is the default tab
            this.setState({
                primaryHighlight: Colors.primary,
                secondaryHighlight: Colors.accent1,
                tabPressed: SECONDARY
            })
        }
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
                        this.setState({
                            port: response["CurDevice"],
                            primChargeRate: response["PriChargeRate"],
                            secChargeRate: response["SecChargeRate"],
                            pDevice: response["PrimDev"],
                            sDevice: response['SecDev']
                        })
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
        } else {
            this.setState({
                pStatus: notCharging,
                sStatus: notCharging
            })
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

    showTab() {
        if (this.state.tabPressed == PRIMARY) {
            return <Appliance imgName={this.state.pDevice} status={this.state.pStatus} />
        } else if (this.state.tabPressed == SECONDARY) {
            return <Car imgName={this.state.sDevice} status={this.state.sStatus} />
        } else {
            return <Car imgName={this.state.sDevice} status={this.state.sStatus} />
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

                        {/* Line only shows if it is charging */}
                        <Svg height='2' width='100%' style={styles.line} >
                            {this.state.secChargeRate > 0 &&
                                <Line x1="0" y1="0" x2='100%' y2="0" stroke={Colors.secondary} strokeWidth="5" />
                            }
                        </Svg>

                        <Text style={styles.tabText}>{this.state.secChargeRate} kW</Text>
                    </TouchableOpacity>
                </View>

                {this.showTab()}

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
    }
});