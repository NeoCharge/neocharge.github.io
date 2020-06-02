
import React from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import Colors from '../assets/colors';
import { Svg, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

export default class SessionEntry extends React.PureComponent {

    constructor(props) {
        super(props);
        console.log(this.props.data)
        this.state = {
            data: this.props.data
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }

    renderCircle() {
        if (this.state.data.type == "primary") {
            console.log("rendering primary circle");
            return this.renderPrimaryCircle();
        } else {
            return this.renderSecondaryCircle();
        }
    }

    renderSecondaryCircle() {
        return (
            <Svg height="50" width="50">
                <Defs >
                    <LinearGradient spreadMethod={"pad"} id={"grad"} x1={"0%"} y1={"70%"} x2={"70%"} y2={"0%"}>
                        <Stop offset={"0%"} stopColor={"#11645c"} stopOpacity={"1"} />
                        <Stop offset={"100%"} stopColor={Colors.accent1} stopOpacity={"1"} />
                    </LinearGradient>
                </Defs>
                <Circle cx="8" cy="8" r="8" fill="url(#grad)" />
            </Svg>
        );
    }

    renderPrimaryCircle() {
        return (
            <Svg height="50" width="50">
                <Defs >
                    <LinearGradient spreadMethod={"pad"} id={"grad2"} x1={"0%"} y1={"70%"} x2={"70%"} y2={"0%"}>
                        <Stop offset={"0%"} stopColor={"#aeaeae"} stopOpacity={"1"} />
                        <Stop offset={"100%"} stopColor={Colors.secondary} stopOpacity={"1"} />
                    </LinearGradient>
                </Defs>
                <Circle cx="8" cy="8" r="8" fill="url(#grad2)" />
            </Svg>
        );
    }

    renderLength(length) {
        var hours = Math.floor(length / 3600).toString();
        var minutes = Math.floor((length % 3600) / 3600);
        return (
            <Text style={{ color: 'white', fontSize: 16}}>
                <Text style={{ fontWeight: "bold" }}>{hours}</Text>
                <Text>hrs </Text>
                <Text style={{ fontWeight: "bold" }}>{minutes}</Text>
                <Text>min</Text>
            </Text>
        )
    }

    formatDate(date) {
        var arr = [(date.getMonth()+1).toString(), date.getDate().toString(), date.getFullYear().toString().substring(2, 4)];
        return arr.join(".");
    }


    render() {




        return (
            <View style={{ height: 30, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'stretch', borderTopColor: 'grey', borderTopWidth: 1 }}>
                <Text style={{ color: 'grey', paddingRight: "6%", fontSize: 12 }}>{this.formatDate(this.state.data.date)}</Text>
                {this.renderCircle()}
                <Text style={{color: 'white', paddingRight: "6%", fontSize: 16}}>
                    <Text style={{ fontWeight: "bold" }}>{this.state.data.power}</Text>
                    <Text>kWh</Text>
                </Text>
                {this.renderLength(this.state.data.length)}

            </View>

        )

    }

}

const styles = StyleSheet.create({
    graphHeaderText: {
        fontSize: 25,
        color: Colors.secondary,
        fontWeight: 'bold'
    },
});