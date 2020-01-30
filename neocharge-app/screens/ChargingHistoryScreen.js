import React from 'react';
import GraphComponent from "../components/GraphComponent";
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { API } from 'aws-amplify';
import Colors from '../assets/colors';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            TextInputValue: '',
            jsonDeviceLogs: []
        }
    }

    buttonClickListener = () => {
        const { TextInputValue } = this.state;
        API.get("LambdaProxy", "/dbgetusers",
            {
                "queryStringParameters": {
                    "deviceId": TextInputValue
                }
            })
            .then(
                response => this.setState({ jsonDeviceLogs: response })
            ).catch(error => {
                console.log(error.response)
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter UUID'
                    onChangeText={TextInputValue => this.setState({ TextInputValue })}
                />

                <View style={[{ width: '40%', margin: 15, backgroundColor: 'orange' }]}>
                    <Button
                        onPress={this.buttonClickListener}
                        title='Get User Data'
                        color='#ffffff'
                    />
                </View>

                <GraphComponent
                    data={this.state.jsonDeviceLogs}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    input: {
        height: 40,
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: Colors.secondary
    }
});