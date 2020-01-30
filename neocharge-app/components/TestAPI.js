import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { API } from 'aws-amplify';

export default class TestAPI extends Component {
    state = { apiResponse: null };

    async getSample() {
        const path = "/dbaddusers"; // you can specify the path
        const apiResponse = await API.get("LambdaProxy", path); //replace the API name
        console.log('response:' + apiResponse);
        this.setState({ apiResponse });
    }

    render() {
        return (
            <View>
                <Button title="Add Users" onPress={this.getSample.bind(this)} />
                <Text>{"\n"}</Text>
                {/* <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text> */}
            </View>
        )
    }
}
