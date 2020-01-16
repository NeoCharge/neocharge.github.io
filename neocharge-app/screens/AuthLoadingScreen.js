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
    await AsyncStorage.removeItem('userToken'); //TODO
    const userToken = await AsyncStorage.getItem('userToken');

    //TODO only sleeping to demonstrate that this screen is navigated to
    sleep(10000);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
        <View style={styles.container} >
            <Image style={styles.imageStyle} source={require('../assets/neocharge.png')} />
            <Text>LOADING...</Text>
            <ActivityIndicator />
        </View>
    );
  }
}
export default AuthLoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imageStyle: {
        height: '50%',
        width: '50%',
        resizeMode: 'contain'
    }
});