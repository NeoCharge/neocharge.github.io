import * as React from 'react';
import { Icon, Dimensions, View, StyleSheet, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Colors from '../assets/colors.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QuestionMark from '../assets/question-mark.svg';
import { API } from 'aws-amplify';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

class DeviceIdScreen extends React.Component {
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
    }

    constructor(props) {
        super(props);
        this.state = { deviceID: '' };
        this.confirmID = this.confirmID.bind(this);
    }

    async confirmID(deviceID) {
        let id = deviceID.toUpperCase()
        let response = await validDeviceIDCheck(id);

        if (response == true) {
            this.props.navigation.navigate('ConfigTimeZone', { deviceID: id })
        }
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Input Your Device ID</Text>
                </View>

                {/* Device ID Input */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={styles.textContainer}
                            placeholder="Device ID"
                            placeholderTextColor={Colors.accent1}
                            value={this.state.deviceID}
                            onChangeText={(deviceID) => this.setState({ deviceID: deviceID })}
                            clearButtonMode='always'
                        />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.confirmID(this.state.deviceID)}>
                        <Text style={styles.title}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

// TODO NOTICE: I am using the 'patch' method as a way of avoiding making changes to
// the production environment Alpha Testers are using. Before our next deployment, we
// need to copy and paste the code of verifyDeviceID-JUIC207.py into verifyDeviceID.py
// and delete the /deviceid patch resource and call API.get() instead.
//
// Returns true if the deviceID exists in our database and is available.
// Returns false if the deviceID does not exist or is already
// in use by another account.
async function validDeviceIDCheck(deviceID) {
    const path = "/deviceid"; // you can specify the path
    console.log("path is " + path);
    let result = await API.patch("LambdaProxy", path,
        {
            "queryStringParameters": {
                "deviceID": deviceID
            }
        }).catch(error => {
            console.log(error.response)
            alert("Something went wrong while verifying device ID.")
            return false;
        });
    console.log("response type: " + (typeof result));
    console.log("api response: " + result);

    if (Object.keys(result).length === 0) {
        console.log("entered non valid id");
        alert("Must enter a valid device ID.");
        return false;
    }
    /* TODO NOTICE: uncomment this once we are done with Alpha Testers all using 'mydevice'!!
    if (result.inUse == 1) {
      console.log("entered deviceID is already in use");
      alert("Entered device ID is already in use by another account.");
      return false;
    }
    */
    return true;
}

export default DeviceIdScreen;

const styles = StyleSheet.create({
    container: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.primary
    },
    titleContainer: {
        alignSelf: 'flex-start',
        paddingLeft: (swidth * .05),
        paddingTop: (swidth * .05),
        paddingBottom: (swidth * .05),
    },
    title: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 24,
        color: Colors.secondary,
    },
    title: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 24,
        color: Colors.secondary,
    },
    buttonContainer: {
        flex: 4,
        justifyContent: 'center'
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
        width: swidth * .9
    },
});