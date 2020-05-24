
import React from 'react'
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import Colors from '../assets/colors';

export default class SessionsTable extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.primary !== this.props.primary || prevProps.secondary !== this.props.secondary) {
            this.setState({ primary: this.props.primary.map((value) => ({ value })), secondary: this.props.secondary.map((value) => ({ value })) });
        }
    }


    render() {


        return (
            <View>
                <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.graphHeaderText}>Sessions</Text>
                </View>
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