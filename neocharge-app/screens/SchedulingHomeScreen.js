import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SchedulingHomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text> This will be the scheduling screen. </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});