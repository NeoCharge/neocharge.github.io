import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

export default class RateDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rawDeviceLogs: this.props.data,
        }
    }

    getTotalCharge() {
        const rawList = this.props.data
        var total = 0;
        var today = Date.parse(new Date().toISOString().split('T')[0]);
        var oneDay = 1000 * 60 * 60 * 24;

        rawList.forEach(function (obj) {
            var date = Date.parse(obj.startTime.substring(0, 10));
            var dateDiff = (today - date) / oneDay;

            if (dateDiff < 100)
                total += obj.priPower;
        }
        )

        return total;
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.textNum}>{this.getTotalCharge()}</Text>
                <Text style={styles.textUnit}>kWh</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        borderRadius: 15,
        width: "40%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    textNum: {
        fontSize: 35
    },
    textUnit: {
        fontSize: 20
    }
});