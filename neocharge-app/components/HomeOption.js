import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Colors from "../assets/colors";

export default class HomeOption extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.select} activeOpacity={0.5}
                onPress={() => this.props.nav.navigate(this.props.screenName)}>
                <View style={styles.icon}>
                    <Image
                        source={this.props.img}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
                <Text style={styles.text}> {this.props.name} </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: Colors.secondary,
        fontSize: 20
    },
    select: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        // borderColor: Colors.secondary,
        // borderWidth: 2,
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined,
    },
    icon: {
        width: 60,
        height: 60
    }
});