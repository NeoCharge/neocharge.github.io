import React from 'react';
import { Dimensions, View, StyleSheet, Text, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../assets/colors';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height

const iconSize = sheight * 0.045;

export default class ConfigurePrimaryScreen extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: Colors.primary,
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
                <Text style={styles.title}>Primary</Text>
                <Text style={styles.title}>Device</Text>

                <View style={styles.pickers}>
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        placeholder={{ label: 'Select', value: null }}
                        items={[
                            { label: 'Appliance', value: 'Appliance' },
                            { label: 'Electric Vehicle', value: 'Electric Vehicle' },
                        ]}
                        style={pickerSelectStyles}
                    />

                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        placeholder={{ label: 'Make', value: null }}
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
                    />


                </View>

                <Button title="Confirm"
                    onPress={() => this.props.navigation.navigate('ConfigSecondary')} />

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.primary
    },
    subcontainer: {
        flex: 3,
        flexDirection: 'column',
        paddingBottom: 20,
    },
    title: {
        fontFamily: 'RedHatDisplay-Bold',
        fontSize: 24,
        color: Colors.secondary,
        paddingLeft: (swidth * .05),
        alignSelf: 'flex-start'
    },
    pickers: {
        flex: 1,
        alignItems: 'center',
        width: swidth * .9
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Colors.faded,
        borderRadius: 25,
        backgroundColor: Colors.faded,
        color: Colors.accent2,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: Colors.accent1,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    placeholder: {
        color: Colors.accent1
    }
});