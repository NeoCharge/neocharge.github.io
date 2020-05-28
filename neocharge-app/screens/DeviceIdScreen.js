import * as React from 'react';
import { Icon, Dimensions, View, StyleSheet, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Colors from '../assets/colors.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QuestionMark from '../assets/question-mark.svg'

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

class DeviceIdScreen extends React.Component {
  static navigationOptions = {
    headerRight: <QuestionMark/>,
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontWeight: "bold",
        fontFamily: 'RedHatDisplay-Regular'
    },
  }

   // TODO: Set up state to hold values
    constructor(props) {
        super(props);
        this.state = { deviceID: ''};
        this.confirmID = this.confirmID.bind(this);
    }

    async confirmID(deviceID) {
        let validID = deviceID.toLowerCase()
        if (validID == 'mydevice') {
            this.props.navigation.navigate('ConfigTimeZone')
        }
        else {
            alert("Error, Invalid Device ID Provided");
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
                <View style={{flex: 1}}>
                     <TextInput 
                        style={styles.textContainer}
                        placeholder = "Device ID"
                        placeholderTextColor= {Colors.accent1}
                        value={this.state.deviceID}
                        onChangeText={(deviceID) => this.setState({deviceID : deviceID})}
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