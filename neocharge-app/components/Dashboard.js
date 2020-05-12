import React from 'react';
import { Dimensions, View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { API, Auth } from 'aws-amplify';
import Battery from '../assets/Battery.svg';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

const kPauseText = "Stop Charge";
const kChargeText = "Charge Now";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: "",
            smartChargeStyle: styles.off,
            pauseStyle: styles.off,
            pauseText: kPauseText
        }
    }

    async componentDidMount() {
        this.state.userEmail = await SecureStore.getItemAsync("secure_email");
        console.log("email on dashboard: " + this.state.userEmail);

        let query = {
            "queryStringParameters": {
                "userEmail": this.state.userEmail
            }
        };

        // Get SmartCharge Status
        const path = "/smartcharge"; // path from root of API
        console.log("making smartcharge GET request");

        let isSet = await API.get("LambdaProxy", path, query)
            .catch(error => { console.log(error.response) });

        console.log("response: " + isSet);

        console.log("smart charge status: " + isSet);
        if (isSet) {
            this.setState({ smartChargeStyle: styles.on })
        } else {
            this.setState({ smartChargeStyle: styles.off })
        }
        console.log(this.state.userEmail);

        // Get Pause Status
        console.log("making pause GET request");

        let pauseIsSet = await API.get("LambdaProxy", "/pausecharge", query)
            .catch(error => { console.log(error.response) });

        console.log("response: " + pauseIsSet);

        console.log("pause status: " + pauseIsSet);
        if (pauseIsSet) {
            this.setState({ pauseStyle: styles.on, pauseText: kChargeText })
        } else {
            this.setState({ pauseStyle: styles.off, pauseText: kPauseText })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async setSmartCharge() {
        if (this.state.smartChargeStyle == styles.smartChargeOn) {
            this.setState({ smartChargeStyle: styles.off })
        } else {
            this.setState({ smartChargeStyle: styles.on })
        }

        console.log(this.state.userEmail);
        console.log(typeof this.state.userEmail);

        let requestBody = {
            "userEmail": this.state.userEmail
        };
        let jsonObj = {
            body: requestBody
        };
        const path = "/smartcharge";
        const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the desired API name
        console.log("smartcharge: " + apiResponse);
    }

    //TODO: put logic of actual pausing/connection to backend in here
    async setPause() {
        if (this.state.pauseStyle == styles.pauseOn) {
            this.setState({ pauseStyle: styles.off, pauseText: kPauseText })
            console.log("unpaused");
        } else {
            //TODO: find out what might be a good way to indicate textually to the user that the 
            //charge is paused, i.e. changed the text below to "RESUME"????
            this.setState({ pauseStyle: styles.on, pauseText: kChargeText })
            console.log("paused");
        }

        let requestBody = {
            "userEmail": this.state.userEmail
        };
        let jsonObj = {
            body: requestBody
        };
        const path = "/pausecharge";
        await API.put("LambdaProxy", path, jsonObj)
            .catch(error => {
                console.log(error.response)
            });
    }

    render() {
        return (
            <View style={styles.container}>
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

                <View style={styles.charging}>
                    <TouchableOpacity onPress={this.setSmartCharge.bind(this)} style={this.state.smartChargeStyle}>
                        <Text style={styles.boldtext}>Smart Charge</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.setPause.bind(this)} style={this.state.pauseStyle}>
                        <Text style={styles.boldtext}>{this.state.pauseText}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 6
    },
    battery: {
        flex: 2.5,
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
        width: (.80 * swidth / 2)
    },
    mileage: {
        alignItems: 'flex-start',
        width: (.80 * swidth / 2)
    },
    stattext: {
        fontFamily: 'RedHatDisplay-Bold',
        color: Colors.secondary,
        fontSize: 30,
    },

    charging: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },

    text: {
        fontFamily: 'RedHatDisplay-Regular',
        color: Colors.secondary,
        fontSize: 25,
        lineHeight: 25
    },
    boldtext: {
        fontFamily: 'RedHatDisplay-Bold',
        color: Colors.secondary,
        fontSize: 20,
    },
    on: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: Colors.accent1,
        borderRadius: 5,
        width: (.80 * swidth / 2)
    },
    off: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: Colors.faded,
        borderRadius: 5,
        width: (.80 * swidth / 2)
    }
});