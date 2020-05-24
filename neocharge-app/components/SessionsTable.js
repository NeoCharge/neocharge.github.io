
import React from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import Colors from '../assets/colors';
import SessionEntry from './SessionEntry';

export default class SessionsTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            type: this.props.type
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.primary !== this.props.primary || prevProps.secondary !== this.props.secondary) {
            this.setState({ primary: this.props.primary.map((value) => ({ value })), secondary: this.props.secondary.map((value) => ({ value })) });
        }
    }


    render() {

        var rows = [];

        this.state.data.forEach( function(value) {
            if (value.priPower != null && value.priPower > 0) {
                var session = {
                    power: Math.round(value.priPower, 1),
                    type: "primary",
                    date: new Date(value.startTime),
                    length: value.duration
                }
                rows.push(<SessionEntry key={rows.length} data={session}/>)
            }

            if (value.secPower != null && value.secPower > 0) {
                var session = {
                    power: Math.round(value.priPower, 1),
                    type: "secondary",
                    date: new Date(value.startTime),
                    length: value.duration
                }
                rows.push(<SessionEntry key={rows.length} data={session}/>)
            }
        }
        );


        return (
            <View >
                <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.graphHeaderText}>Sessions</Text>
                </View>

                {rows}

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