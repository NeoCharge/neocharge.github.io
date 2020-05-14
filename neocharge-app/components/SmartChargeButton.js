import React from 'react';
import { Dimensions, View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { API } from 'aws-amplify';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: "",
            smartChargeStyle: styles.off,
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

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.setSmartCharge.bind(this)} style={this.state.smartChargeStyle}>
                    <Text style={styles.boldtext}>Smart Charge</Text>
                </TouchableOpacity>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boldtext: {
        fontFamily: 'RedHatDisplay-Bold',
        color: Colors.secondary,
        fontSize: (swidth * 0.048),
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