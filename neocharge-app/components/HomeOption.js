import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Colors from "../assets/colors";
import Arrow from '../assets/Arrow.svg';

export default class HomeOption extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.select} activeOpacity={0.5}
                onPress={() => this.props.nav.navigate(this.props.screenName)}>
                <View style={styles.icon}>
                    {this.props.img}
                </View>

                <View style={styles.title}>
                    <Text style={styles.text}> {this.props.name} </Text>
                </View>

                <View style={styles.icon}>
                    <Arrow width={15} height={15} />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'RedHatDisplay-Regular',
        color: Colors.secondary,
        fontSize: 25
    },
    select: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    icon: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        width: '50%'
    }
});