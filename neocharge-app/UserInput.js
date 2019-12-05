import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import { API } from 'aws-amplify';

export default class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = {input1: '', input2: ''};
      }

      changeInputVal = function (input) {
          this.input1 = input;
      }
    
      render() {
        return (
          <View style={{padding: 10}}>
              <Text style={{padding: 10, fontSize: 12}}>
                  Enter your name
              </Text>
            <TextInput
              style={{height: 40}}
              placeholder="Name"
              onChangeText={(text) => this.setState(text)}
              value={this.input1}
            />
            <Text style={{padding: 10, fontSize: 12}}>
                  Enter your name
            </Text>
            <TextInput
              style={{height: 40}}
              placeholder="Name"
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <Text style={{padding: 10, fontSize: 42}}>
              {this.state.text}
            </Text>
          </View>
        );
      }
}