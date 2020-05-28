import React from 'react';
import {Dimensions, View, StyleSheet, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Arrow from '../assets/Arrow.svg';
import QuestionMark from '../assets/question-mark.svg'

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height
const iconSize = sheight * 0.025;

export default class ConfigureTimeZoneScreen extends React.Component {
    // TODO: Set up state to hold values
    constructor(props) {
        super(props);
        this.state = { 
            text: '',
        };
      }
    

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
    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Select Your Locale</Text>
                </View>

                <View style={styles.pickers}>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        placeholder={{ label: 'Time Zone', value: null, color: 'grey' }}
                        items={[
                            { label: 'Pacific Standard Time (UTC-8)', value: 'Pacific Standard Time (UTC-8)' },
                            { label: 'Mountain Standard Time (UTC-7)', value: 'Mountain Standard Time (UTC-7)' },
                            { label: 'Central Standard Time (UTC-6)', value: 'Mountain Standard Time (UTC-6)' },
                            { label: 'Eastern Standard Time (UTC-5)', value: 'Eastern Standard Time (UTC-5)' },
                            { label: 'Atlantic Standard Time (UTC-4)', value: 'Atlantic Standard Time (UTC-4)' },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <Arrow height={iconSize} width={iconSize} />;
                        }}
                    />

                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        placeholder={{ label: 'Utility Provider', value: null, color: 'grey' }}
                        items={[
                            { label: 'Pacific Gas and Electric Company (PG&E)', value: 'Pacific Gas and Electric Company (PG&E)' },
                            { label: 'SoCalGas', value: 'SoCalGas' },
                            { label: 'Southern California Gas Company', value: 'Southern California Gas Company' },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <Arrow height={iconSize} width={iconSize} />;
                        }}
                    />
                    
                     {/* ZipCode Input */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{flex: 1}}>
                        <TextInput 
                            style={styles.textContainer}
                            placeholder = "ZipCode"
                            placeholderTextColor= {Colors.accent1}
                            keyboardType = 'numeric'
                            value={this.state.text}
                            onChangeText={(text) => this.setState({text : text})}
                            clearButtonMode='always'
                        />
                         </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('ConfigPrimary')}>
                        <Text style={styles.title}>Confirm</Text>
                    </TouchableOpacity>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.primary
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
        color: Colors.secondary,
    },
    pickers: {
        flex: 6,
        alignItems: 'center',
        justifyContent: 'flex-start'
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
    iconPictures: {
        marginLeft: 10,
        width: 30,
        height: 30
      },
      modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00ff00',
        padding: 100
     },
     text: {
        color: '#3f2949',
        marginTop: 10
     }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 16,
        backgroundColor: Colors.faded,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 50,
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
        marginBottom: 10,
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