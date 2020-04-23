import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../assets/colors';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { API, Auth } from 'aws-amplify';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: "",
            smartChargeStyle: styles.smartChargeOff,
            pauseStyle: styles.pauseOff,
            pauseText: "PAUSE"
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
            this.setState({ smartChargeStyle: styles.smartChargeOn })
        } else {
            this.setState({ smartChargeStyle: styles.smartChargeOff })
        }
        console.log(this.state.userEmail);

        // Get Pause Status
        console.log("making pause GET request");

        let pauseIsSet = await API.get("LambdaProxy", "/pausecharge", query)
            .catch(error => { console.log(error.response) });

        console.log("response: " + pauseIsSet);

        console.log("pause status: " + pauseIsSet);
        if (pauseIsSet) {
            this.setState({ pauseStyle: styles.pauseOn, pauseText: "RESUME" })
        } else {
            this.setState({ pauseStyle: styles.pauseOff, pauseText: "PAUSE" })
        }
    }

    async setSmartCharge() {
        if (this.state.smartChargeStyle == styles.smartChargeOn) {
            this.setState({ smartChargeStyle: styles.smartChargeOff })
        } else {
            this.setState({ smartChargeStyle: styles.smartChargeOn })
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
            this.setState({ pauseStyle: styles.pauseOff, pauseText: "PAUSE" })
            console.log("unpaused");
        } else {
            //TODO: find out what might be a good way to indicate textually to the user that the 
            //charge is paused, i.e. changed the text below to "RESUME"????
            this.setState({ pauseStyle: styles.pauseOn, pauseText: "RESUME" })
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
                    <View style={styles.mileage}>
                        <Text style={{ fontSize: 40, color: Colors.secondary }}>120</Text>
                        <Text style={styles.text}>mi</Text>
                    </View>

                    <Image
                        source={require('../assets/empty-battery.png')}
                        style={styles.batteryIcon}
                        resizeMode='contain'
                    />

                    <View>
                        <Text style={styles.boldtext}>2 HOURS</Text>
                        <Text style={styles.text}>REMAINING</Text>
                    </View>
                </View>

                <View style={styles.charging}>
                    <View style={{ ...styles.circle }}>
                        <Text style={{ fontSize: 40, color: Colors.secondary }}>9.6</Text>
                        <Text style={styles.text}>KWH</Text>
                    </View>

                    <TouchableOpacity style={this.state.pauseStyle} onPress={this.setPause.bind(this)}>
                        <View>
                            <Text style={styles.smalltext}>{this.state.pauseText}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.setSmartCharge.bind(this)} style={this.state.smartChargeStyle}>
                        <View >
                            <Image
                                source={require('../assets/smart-icon.png')}
                                style={styles.smartIcon}
                                resizeMode='contain'
                            />
                            <Text style={styles.text}>SMART</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    battery: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: Colors.secondary,
        borderRadius: 15,
        padding: 10,
        width: '90%'
    },
    charging: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    batteryIcon: {
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined,
        margin: 10
    },
    smartIcon: {
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined
    },
    mileage: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    smalltext: {
        color: Colors.secondary,
        fontSize: 15
    },
    text: {
        color: Colors.secondary,
        fontSize: 20
    },
    boldtext: {
        color: Colors.secondary,
        fontSize: 25
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: 130,
        height: 130,
        borderRadius: 130,
        borderColor: Colors.secondary,
        borderWidth: 2,
        marginRight: 15
    },
    smartChargeOff: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: 130,
        height: 130,
        borderRadius: 130,
        borderColor: Colors.secondary,
        borderWidth: 2,
        marginLeft: 15
    },
    smartChargeOn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: 130,
        height: 130,
        borderRadius: 130,
        borderColor: "#ffd700",
        borderWidth: 2,
        marginLeft: 15,
        color: "#ffd700"
    },
    pauseOn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 60,
        width: 90,
        height: 90,
        borderRadius: 90,
        borderColor: Colors.accent2,
        borderWidth: 2
    },
    pauseOff: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 60,
        width: 90,
        height: 90,
        borderRadius: 90,
        borderColor: Colors.secondary,
        borderWidth: 2
    }
});