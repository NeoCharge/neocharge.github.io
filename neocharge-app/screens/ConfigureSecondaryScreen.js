import React from 'react';
import { Dimensions, View, StyleSheet, Text, Button, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Arrow from '../assets/Arrow.svg';
import QuestionMark from '../assets/question-mark.svg'
import Slider from 'react-native-slider';

const swidth = Dimensions.get('screen').width
const sheight = Dimensions.get('screen').height
const iconSize = sheight * 0.025;

export default class ConfigureSecondaryScreen extends React.Component {

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
            left: 0};
      }

    render() {
        const left = this.state.value * (swidth-60)/100 - 15;
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Secondary Device</Text>
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

                    {/* Car Model Input */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{flex: 6}}>
                            <TextInput 
                                style={styles.textContainer}
                                placeholder = "Model"
                                placeholderTextColor= {Colors.accent1}
                                value={this.state.model}
                                onChangeText={(model) => this.setState({model : model})}
                                clearButtonMode='always'
                            />

                            <TextInput 
                                style={styles.textContainer}
                                placeholder = "Battery"
                                placeholderTextColor= {Colors.accent1}
                                value={this.state.battery}
                                onChangeText={(battery) => this.setState({battery : battery})}
                                clearButtonMode='always'
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
              
              {/* Charge Rate Title */}
               <View style = {styles.container1}> 
                <Text style = {
                    {fontFamily: 'RedHatDisplay-Bold', 
                    fontSize: 20, 
                    color: Colors.accent1,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'}}> Charge Rate</Text>
            
                {/* Charge Rate Value Display */}
                <Text style={{width: 250, fontFamily: 'RedHatDisplay-Bold',textAlign:'left', left: left, marginTop: 10, color: Colors.lightFade } }>
                    {Math.floor( this.state.value )} amps
                </Text>

            {/* Charge Rate Control */}
                <Slider
                    style={{ width: swidth * 0.9, justifyContent: 'center'}}
                    step={1}
                    minimumValue={this.state.minDistance}
                    maximumValue={this.state.maxDistance}
                    value={this.state.value}
                    onValueChange={(value) => this.setState({value})} 
                    thumbTintColor={Colors.accent1}
                    maximumTrackTintColor= {Colors.secondary}
                    minimumTrackTintColor={Colors.accent1}
                />
                <View style={styles.textCon}>
                    <Text style={{color: Colors.lightFade, fontFamily: 'RedHatDisplay-Bold'}}>{this.state.minDistance} amps</Text>
                    <Text style={{color: Colors.lightFade, paddingRight: swidth * 0.1, fontFamily: 'RedHatDisplay-Bold'}}>{this.state.maxDistance} amps</Text>
                </View>
           

            </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('PushNotification')}>
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