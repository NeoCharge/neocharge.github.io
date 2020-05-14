import React from 'react';
import { Dimensions, View, StyleSheet, Text, Image } from 'react-native';
import Colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { API } from 'aws-amplify';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

const kPauseText = "Stop Charging";
const kChargeText = "Charge Now";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userEmail: "",
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

    //TODO: put logic of actual pausing/connection to backend in here
    async setPause() {
        if (this.state.pauseStyle == styles.on) {
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
                <TouchableOpacity onPress={this.setPause.bind(this)} style={this.state.pauseStyle}>
                    <Text style={styles.boldtext}>{this.state.pauseText}</Text>
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
        backgroundColor: Colors.faded,
        borderRadius: 5,
        width: (swidth * .4)
    },
    off: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: Colors.red,
        borderRadius: 30,
        width: (swidth * .4)
    }
});