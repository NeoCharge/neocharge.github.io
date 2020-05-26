import React from 'react';
import { Dimensions, View, StyleSheet, Text, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Arrow from '../assets/Arrow.svg';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

const iconSize = sheight * 0.025;

export default class ConfigureSecondaryScreen extends React.Component {

    static navigationOptions = {
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Secondary{'\n'}Device</Text>
                </View>

                <View style={styles.pickers}>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        placeholder={{ label: 'Select', value: null, color: 'grey' }}
                        items={[
                            { label: 'Appliance', value: 'Appliance' },
                            { label: 'Electric Vehicle', value: 'Electric Vehicle' },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <Arrow height={iconSize} width={iconSize} />;
                        }}
                    />

                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
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
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('Home')}>
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
        flex: 2,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: Colors.accent1,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 25,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 16,
        backgroundColor: Colors.faded,
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.faded,
        borderRadius: 25,
        color: Colors.accent2,
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