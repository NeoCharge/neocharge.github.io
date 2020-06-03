import React from 'react';
import { Dimensions, View, StyleSheet, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Arrow from '../assets/Arrow.svg';
import QuestionMark from '../assets/question-mark.svg'

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height
const iconSize = sheight * 0.025;

export default class ConfigureTimeZoneScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeZone: '',
            utility: '', // TODO: Put this value somewhere in the database
            zipCode: '' // TODO: Put this value somewhere in the database
        };
    }


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

    navigateTo() {
        if (this.state.timeZone == '' || this.state.utility == '' || this.state.zipCode == '') {
            alert('All fields must be filled out.')
        } else {
            this.props.navigation.navigate('ConfigPrimary', {
                deviceID: this.props.navigation.state.params.deviceID,
                timeZone: this.state.timeZone
            })
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Select Your Locale</Text>
                </View>

                <View style={styles.pickers}>
                    <RNPickerSelect
                        onValueChange={(value) => this.setState({ timeZone: value })}
                        placeholder={{ label: 'Time Zone', value: null, color: 'grey' }}
                        items={[
                            { label: 'Pacific Standard Time (UTC-8)', value: 'PST' },
                            { label: 'Mountain Standard Time (UTC-7)', value: 'MST' },
                            { label: 'Central Standard Time (UTC-6)', value: 'CST' },
                            { label: 'Eastern Standard Time (UTC-5)', value: 'EST' },
                            { label: 'Atlantic Standard Time (UTC-4)', value: 'AST' },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <Arrow height={iconSize} width={iconSize} />;
                        }}
                    />

                    <RNPickerSelect
                        onValueChange={(value) => this.setState({ utility: value })}
                        placeholder={{ label: 'Utility Provider', value: null, color: 'grey' }}
                        items={[  // TODO: Make values abbreviations of the companies?
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
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={styles.textContainer}
                                placeholder="ZipCode"
                                placeholderTextColor={Colors.accent1}
                                keyboardType='numeric'
                                value={this.state.zipCode}
                                onChangeText={(value) => this.setState({ zipCode: value })}
                                clearButtonMode='always'
                            />
                        </View>
                    </TouchableWithoutFeedback>
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
        fontFamily: 'RedHatDisplay-Bold',
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