import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // TODO use AsyncStorage to check if user has signed in before?
    await AsyncStorage.removeItem('userToken'); 
    const userToken = await AsyncStorage.getItem('userToken');

    //TODO only sleeping to demonstrate that this screen is navigated to
    //sleep(1000);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // TODO Get saved userTokens (email and password? [secure?]) and use them to authenticate user automatically.
    //      Send user to App if successful and Auth if not or if no tokens exist.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
        <View style={styles.screen} >
            <Image style={styles.imageStyle} source={require('../assets/neocharge.png')} />
            <Text style={styles.TextStyle}>Loading...</Text>
            <ActivityIndicator />
        </View>
    );
  }
}
export default AuthLoadingScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    backgroundColor: "#242424",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageStyle: {
      height: '50%',
      width: '50%',
      resizeMode: 'contain'
  },
  TextStyle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: '5%',
  },
});