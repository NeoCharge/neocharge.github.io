import React from 'react';
import { Dimensions, View, StyleSheet, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Arrow from '../assets/Arrow.svg';
import QuestionMark from '../assets/question-mark.svg'
import Slider from 'react-native-slider';
import { API, Auth } from 'aws-amplify';
import * as SecureStore from 'expo-secure-store';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height
const iconSize = sheight * 0.025;

export default class ConfigureSecondaryScreen extends React.Component {

    static navigationOptions = {
        headerRight: <QuestionMark />,
        headerStyle: {
            backgroundColor: Colors.primary
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold",
            fontFamily: 'RedHatDisplay-Regular'
        },
        gesturesEnabled: false,
    }

    // TODO: Set up state to hold values
    constructor(props) {
        super(props);
        this.state = {
            model: '',
            make: '',
            value: 0,
            minDistance: 0,
            maxDistance: 50,
            left: 0,
            userEmail: '',
            pushToken: '',
            hasLoggedData: false,
            secondaryDevice: ''
        };
    }

    // push notification 
    async componentDidMount() {
        this.setState({ userEmail: await SecureStore.getItemAsync("secure_email") })

        registerForPushNotificationsAsync(this.state.userEmail).then(value => {
            this.state.pushToken = value;
        });
        console.log(this.state.pushToken);
        console.log(typeof this.state.pushToken);
    }

    async logOnboardingInfo() {

        //check to see if the user has already clicked the continue button
        //if they have, then don't enter, because it will create another user entry in the DB
        if (!this.state.hasLoggedData) {
            console.log("userEmail: " + this.state.userEmail);
            console.log("timeZone: " + this.props.navigation.state.params.timeZone);
            console.log("primaryDevice: " + this.props.navigation.state.params.primaryDevice);
            console.log("secondaryDevice: " + this.state.secondaryDevice);
            console.log("deviceID: " + this.props.navigation.state.params.deviceID);
            console.log(this.state.pushToken);

            // TODO is there a reason we should still leave this here for testing? -josh
            //let devID = "XSD-934859734-TTYZ";

            let requestBody = {
                "userEmail": this.state.userEmail,
                "timeZone": this.props.navigation.state.params.timeZone,
                "primaryDevice": this.props.navigation.state.params.primaryDevice,
                "secondaryDevice": this.state.secondaryDevice,
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
                    // this.props.navigation.navigate('App');
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

    navigateTo() {
        if (this.state.secondaryDevice == '' || this.state.make == '') {
            alert('All fields must be filled out.')
        } else {
            this.logOnboardingInfo()
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        const left = this.state.value * (swidth - 60) / 100 - 15;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Secondary Device</Text>
                </View>

                <View style={styles.pickers}>
                    <RNPickerSelect
                        onValueChange={(value) => this.setState({ secondaryDevice: value })}
                        placeholder={{ label: 'Select', value: null, color: 'grey' }}
                        items={[
                            { label: 'Appliance', value: 'Appliance' },
                            { label: 'Electric Vehicle', value: 'EV' },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <Arrow height={iconSize} width={iconSize} />;
                        }}
                    />

                    <RNPickerSelect
                        onValueChange={(value) => this.setState({ make: value })}
                        placeholder={{ label: 'Make', value: null, color: 'grey' }}
                        items={[
                            { label: 'BMW', value: 'BMW' },
                            { label: 'Chevrolet', value: 'Chevrolet' },
                            { label: 'Ford', value: 'Ford' },
                            { label: 'KIA', value: 'KIA' },
                            { label: 'Mercedes', value: 'Mercedes' },
                            { label: 'Nissan', value: 'Nissan' },
                            { label: 'Tesla', value: 'Tesla' },
                            { label: 'Volkswagen', value: 'Volkswagen' },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <Arrow height={iconSize} width={iconSize} />;
                        }}
                    />

                    {/* Car Model Input */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ flex: 6 }}>
                            <TextInput
                                style={styles.textContainer}
                                placeholder="Model"
                                placeholderTextColor={Colors.accent1}
                                value={this.state.model}
                                onChangeText={(model) => this.setState({ model: model })}
                                clearButtonMode='always'
                            />

                            <TextInput
                                style={styles.textContainer}
                                placeholder="Battery"
                                placeholderTextColor={Colors.accent1}
                                value={this.state.battery}
                                onChangeText={(battery) => this.setState({ battery: battery })}
                                clearButtonMode='always'
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Charge Rate Title */}
                <View style={styles.container1}>
                    <Text style={
                        {
                            fontFamily: 'RedHatDisplay-Bold',
                            fontSize: 20,
                            color: Colors.accent1,
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start'
                        }}> Charge Rate</Text>

                    {/* Charge Rate Value Display */}
                    <Text style={{ width: 250, fontFamily: 'RedHatDisplay-Bold', textAlign: 'left', left: left, marginTop: 10, color: Colors.lightFade }}>
                        {Math.floor(this.state.value)} amps
                </Text>

                    {/* Charge Rate Control */}
                    <Slider
                        style={{ width: swidth * 0.9, justifyContent: 'center' }}
                        step={1}
                        minimumValue={this.state.minDistance}
                        maximumValue={this.state.maxDistance}
                        value={this.state.value}
                        onValueChange={(value) => this.setState({ value })}
                        thumbTintColor={Colors.accent1}
                        maximumTrackTintColor={Colors.secondary}
                        minimumTrackTintColor={Colors.accent1}
                    />
                    <View style={styles.textCon}>
                        <Text style={{ color: Colors.lightFade, fontFamily: 'RedHatDisplay-Bold' }}>{this.state.minDistance} amps</Text>
                        <Text style={{ color: Colors.lightFade, paddingRight: swidth * 0.1, fontFamily: 'RedHatDisplay-Bold' }}>{this.state.maxDistance} amps</Text>
                    </View>


                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.navigateTo()}>
                        <Text style={styles.title}>Confirm</Text>
                    </TouchableOpacity>
                </View>

            </View >
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
        flex: 7,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.primary
    },
    sliderContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        color: Colors.accent1,
        width: swidth * 0.9,
    },
    sliderTitle: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 14,
        color: Colors.accent1,
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'flex-start',
        paddingLeft: (swidth * .05),
        paddingTop: (swidth * .05)
    },
    title: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 24,
        color: Colors.secondary
    },
    pickers: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        justifyContent: 'center',
        marginBottom: 60
    },
    button: {
        backgroundColor: Colors.accent1,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 25,
    },
    textContainer: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 16,
        backgroundColor: Colors.faded,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Colors.faded,
        borderRadius: 25,
        color: Colors.accent1,
        paddingRight: 30, // to ensure the text is never behind the icon
        width: swidth * .9,
        marginBottom: 60
    },
    container1: {
        flex: 4,
        alignSelf: 'flex-start',
        paddingLeft: (swidth * .05),
        paddingTop: (swidth * .05),
        marginTop: 60
    },
    textCon: {
        fontFamily: 'RedHatDisplay-Bold',
        width: swidth,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 16,
        backgroundColor: Colors.faded,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 60,
        borderWidth: 1,
        borderColor: Colors.faded,
        borderRadius: 25,
        color: Colors.accent1,
        paddingRight: 30, // to ensure the text is never behind the icon
        width: swidth * .9
    },
    inputAndroid: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 16,
        backgroundColor: Colors.faded,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 60,
        borderWidth: 0.5,
        borderColor: Colors.faded,
        borderRadius: 25,
        color: Colors.accent1,
        paddingRight: 30, // to ensure the text is never behind the icon
        width: swidth * .9
    },
    placeholder: {
        color: Colors.accent1
    },
    iconContainer: {
        right: 15,
        top: 12,
        transform: [{ rotate: '90deg' }]
    }
});