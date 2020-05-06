import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../assets/colors';
import Devices from '../assets/devices';
import { API } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';

const DELAY = 5000;
const NONE = 0;
const PRIMARY = 1;
const SECONDARY = 2;

export default class DeviceDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            device: '',
            port: NONE,
            image: Devices.images["Logo"],
            primaryHighlight: Colors.primary,
            secondaryHighlight: Colors.primary,
            userEmail: ''
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
        let priChargeRate;
        let secChargeRate;

        //console.log("making device display request")
        await API.get("LambdaProxy", "/chargerate", jsonObj)
            .then(
                response => {
                    if (response != null) {
                        //console.log(response)
                        this.setState({ port: response["CurDevice"] })
                        primDev = response["PrimDev"]
                        priChargeRate = response["PriChargeRate"]
                        secDev = response["SecDev"]
                        secChargeRate = response["SecChargeRate"]
                    } else {
                        console.log("No device currently charging");
                    }
                }
            ).catch(error => {
                console.log(error.response)
            });

        if (this.state.port === PRIMARY) {
            this.setState({ device: primDev })
            this.setState({ primaryHighlight: Colors.faded })
            this.setState({ secondaryHighlight: Colors.primary })
        } else if (this.state.port === SECONDARY) {
            this.setState({ device: secDev })
            this.setState({ secondaryHighlight: Colors.faded })
            this.setState({ primaryHighlight: Colors.primary })
        } else {
            this.setState({ primaryHighlight: Colors.primary })
            this.setState({ secondaryHighlight: Colors.primary })
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
                    <View style={{ ...styles.tab, backgroundColor: this.state.primaryHighlight }}>
                        <Text style={styles.tabText}>PRIMARY</Text>
                    </View>

                    <View style={{ ...styles.tab, backgroundColor: this.state.secondaryHighlight }}>
                        <Text style={styles.tabText}>SECONDARY</Text>
                    </View>
                </View>
                <View style={styles.subcontainer1}>
                    <Image
                        source={this.state.image}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <Text style={styles.text}>CHARGING</Text>
                </View>
            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
    },
    tabs: {
        flex: 1,
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
    subcontainer1: {
        flex: 3,
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: 30
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined,
    },
    tabText: {
        color: Colors.secondary,
        fontSize: 20,
    },
    text: {
        color: Colors.secondary,
        fontSize: 20,
        width: '100%',
        marginBottom: 10,
        paddingLeft: '25%',
        paddingRight: '25%'
    }
});