import React from 'react';
import GraphComponent from "../GraphComponent";
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import { API } from 'aws-amplify';

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
        { "queryStringParameters": {
            "deviceId": TextInputValue }})
        .then(response => {
                this.state.jsonDeviceLogs = response
                console.log("finished callback")
            }).catch(error => {
                console.log(error.response) 
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <GraphComponent 
                   data = {this.state.jsonDeviceLogs}
                />
                <TextInput
                    style={{ height: 40, width: '50%', borderColor: 'gray', borderWidth: 1 }}
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