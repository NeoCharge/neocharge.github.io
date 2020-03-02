import React from 'react';
import { StyleSheet, View, Button} from "react-native";
import Colors from '../assets/colors.js';

export default class LogoutOption extends React.Component {
    // alert user on logout
    _onPressButton() {
        alert('Confirm logging out of system')
    }

    render() {
        return (
            <View style={styles.logoutContainer}>
                <View style={styles.logoutButtonContainer}>
                    <Button onPress={this._onPressButton}
                        title="Logout"
                        color='white'
                    />
            </View>
        </View>
        );
    }
}


const styles = StyleSheet.create({
    logoutContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      logoutButtonContainer: {
        backgroundColor: Colors.appleBlue,
        position: 'absolute',
        justifyContent: 'center',
        height: 40,
        borderColor: '#51a0d5',
        borderWidth: 1,
        bottom: '50%',
        width: '90%',
        borderRadius: 10
      }
});