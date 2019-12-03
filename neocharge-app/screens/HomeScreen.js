import React from 'react';
import GraphComponent from "../GraphComponent";
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import { API } from 'aws-amplify';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            TextInputValue: ''
        }
    }

    async getData(deviceId) {
        console.log(deviceId)
        //const deviceId = "testId1"; 
        const apiName = "LambdaProxy"
        const path = "/dbgetusers"; // you can specify the path
        const myMessage = {
            "deviceId": deviceId
          }
        const apiResponse = await API.get(apiName, path, myMessage); //replace the API name
        console.log('response:' + apiResponse[0]);
    }

    buttonClickListener = () => {
        const { TextInputValue } = this.state;
        //this.getData(TextInputValue); 
        API.get("LambdaProxy", "/dbgetusers", 
        { "queryStringParameters": {
            "deviceId": TextInputValue }})
        .then(response => {
                console.log("succccess!");
                console.log(response); 
            }).catch(error => {
                console.log(error.response) 
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <GraphComponent />
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