import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Colors from '../assets/colors.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API } from 'aws-amplify';

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
      scanned: false,
      deviceID: '' 
    };
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

  handleBarCodeScanned = async ({data}) => {
    this.setState({ 
      scanned: true, 
      deviceID: data 
    });
    
    let id = data.toUpperCase()
    let response = await validDeviceIDCheck(id);

    if (response == true) {
      this.props.navigation.navigate('ConfigTimeZone', { deviceID: id })
    }
  };
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


