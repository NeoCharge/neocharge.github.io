import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Colors from '../assets/colors.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

class QRScreen extends React.Component {
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
  constructor(props) {
    super(props);
    this.state = { 
      hasCameraPermission: null,
      scanned: false, };
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

      <View style={styles.container}>
        <Text style={styles.instructionTxt}> Line up the QR code on your unit with this square </Text>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={styles.QRScreen}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}>

          <View style={styles.borderBox} />

        </BarCodeScanner>


        {/* Manual Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}
            onPress={() => this.props.navigation.navigate('DeviceId')}>
            <Text style={styles.title}>Enter serial number manually</Text>
            </TouchableOpacity>
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

  handleBarCodeScanned = ({ type, data}) => {
    this.setState({ scanned: true });
    alert( `Bar code type: ${type} \n Data: ${data}`,
          [{
            text: 'OK', 
            onPress: () => {navigation.navigate('ConfigTimeZone')}
          }],
          {cancelable: false })
    this.props.navigation.navigate('ConfigTimeZone')
  };
}

export default QRScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flexDirection: 'column',
    paddingTop: '20%',
    alignItems: 'center',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 40,
    fontFamily: 'RedHatDisplay-Regular',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 18,
    color: Colors.accent1,
},
  QRScreen: {
    width: '75%',
    height: "50%"
  },
  instructionTxt: {
    color: 'white',
    fontSize: 20,
    width: '70%',
    alignItems: 'center',
    marginBottom: '12%',
    textAlign: "center",
    fontFamily: 'RedHatDisplay-Regular',
  },
  borderBox: {
    borderColor: Colors.accent1,
    borderWidth: 3,
    flex: 1,
  }
});


