import React from 'react';
import GraphComponent from "../GraphComponent";
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            TextInputValue: ''
        }
    }

    buttonClickListener = () => {
        const { TextInputValue } = this.state;
        Alert.alert(TextInputValue);
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