import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from "../assets/colors";

export default class ChargeScreenSVG extends React.Component {
    render() {
        return (
            <View style={styles.icon}>
                <Image
                    source={this.props.img}
                    style={styles.image}
                    resizeMode='contain'
                />
            </View>
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
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined,
    },
    icon: {
        width: 60,
        height: 60,
    }
});