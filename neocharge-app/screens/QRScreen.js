import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Colors from '../assets/colors.js';
import HomeOption from '../components/HomeOption';
import OnboardingInput from '../components/OnboardingInput';

class QRScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
        
        <View style = {styles.container}>
        <Text style = {styles.instructionTxt}> Line up the QR code on your unit with this square </Text>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} 
            style={styles.QRScreen}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}> 

            <View style = {styles.borderBox}/> 
            
            </BarCodeScanner>
        
       
        {/* Manual Button */}
        <View style = {styles.buttonContainer}>   
            <Button
            onPress={() => this.props.navigation.navigate('SignUp')}
            title = "Enter serial number manually"/>
            
        </View>


        {scanned && (
          <Button title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
            
          />
        )}
      </View>
    );
  }


  // TODO: have user navigate to a screen to enter device id manually
  async manualEntry() {
    console.log("navigate to another screen")
    //this.props.navigation.navigate('Auth');
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.navigation.navigate('SignIn')
  };
}


  export default QRScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flexDirection: 'column',
        paddingTop: '30%',
        alignItems: 'center',
        height: '100%',
        borderWidth: 5
      },
      buttonContainer: {
        flex: 1,
        marginTop: '10%',
        width: '100%',
        height: '100%'
      },
      QRScreen: {
        width: '80%',
        height: "55%",
        borderRadius: 15
      },
      instructionTxt: {
        color: 'white',
        fontSize: 20,
        width: '70%',
        alignItems: 'center',
        marginBottom: '10%',
        textAlign: "center"
      },
      borderBox: {
        borderColor: '#1a7552',
        borderWidth: 5,
        flex: 1,
        borderRadius: 4
      }
});


