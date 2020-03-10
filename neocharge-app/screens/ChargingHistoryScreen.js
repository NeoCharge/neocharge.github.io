import React from 'react';
import GraphComponent from "../components/GraphComponent";
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { API } from 'aws-amplify';
import Colors from '../assets/colors';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            TextInputValue: '',
            jsonDeviceLogsTimes: [],
            jsonDeviceLogsDates: [],
            graphData: [],
            kind: ''
        }
    }

    buttonClickListener = () => {
        // const { TextInputValue } = this.state;
        API.get("LambdaProxy", "/chargeHistory",
            {
                "queryStringParameters": {
                    "deviceId": "testId1"
                }
            })
            .then(
                response => {
                    this.setState({ jsonDeviceLogsTimes: response["times"], jsonDeviceLogsDates: response["dates"] })
                    this.setState({ graphData: response["times"], kind: 'times' })
                }
            ).catch(error => {
                console.log(error.response)
            });
    }

    dayListener = () => {
        const data = this.state.jsonDeviceLogsTimes
        const newData = []
        const oneDay = 1000 * 60 * 60 * 24;

        data.forEach(obj => {
            const d = new Date("December 3, 2019 11:13:00").toISOString().split('T')[0]
            const today = Date.parse(d)
            const date = Date.parse(obj.startTime.substring(0, 10))
            if (date == today) {
                newData.push(obj)
            }
        }
        )

        this.setState({ graphData: newData, kind: 'times' })
    }

    weekListener = () => {
        const data = this.state.jsonDeviceLogsDates
        const newData = []
        const oneDay = 1000 * 60 * 60 * 24;
        const oneWeek = oneDay * 7;

        data.forEach(obj => {
            const d = new Date("December 3, 2019 11:13:00").toISOString().split('T')[0]
            const today = Date.parse(d)
            const date = Date.parse(obj.startTime.substring(0, 10))
            if (date >= (today - oneWeek) && date <= today) {
                newData.push(obj)
            }
        }
        )

        this.setState({ graphData: newData, kind: 'dates' })
    }

    monthListener = () => {
        const data = this.state.jsonDeviceLogsDates
        const newData = []
        const oneDay = 1000 * 60 * 60 * 24;

        data.forEach(obj => {
            const d = new Date("December 3, 2019 11:13:00")
            const todaysMonth = d.getMonth()
            const todaysYear = d.getFullYear()
            const dateMonth = new Date(obj.startTime).getMonth()
            const dateYear = new Date(obj.startTime).getFullYear()
            if (todaysMonth == dateMonth && todaysYear == dateYear) {
                newData.push(obj)
            }
        }
        )

        this.setState({ graphData: newData, kind: 'dates' })
    }

    yearListener = () => {
        const data = this.state.jsonDeviceLogsDates
        const newData = []
        const oneDay = 1000 * 60 * 60 * 24;

        data.forEach(obj => {
            const d = new Date("February 26, 2019 11:13:00")
            const today = d.getFullYear()
            const date = new Date(obj.startTime).getFullYear()
            if (date == today) {
                newData.push(obj)
            }
        }
        )

        this.setState({ graphData: newData, kind: 'dates' })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.getUserButton}>
                    <Button
                        onPress={this.buttonClickListener}
                        title='Get User Data'
                        color={Colors.secondary}
                    />
                </View>

                <View style={styles.graph}>
                    <GraphComponent
                        data={this.state.graphData}
                        kind={this.state.kind}
                    />
                </View>

                <View style={styles.timeButtons}>
                    <View styles={styles.button}>
                        <Button
                            onPress={this.dayListener}
                            title='1D'
                            color={Colors.secondary}
                        />
                    </View>

                    <View>
                        <Button
                            onPress={this.weekListener}
                            title='1W'
                            color={Colors.secondary}
                        />
                    </View>
                    <View>
                        <Button
                            onPress={this.monthListener}
                            title='1M'
                            color={Colors.secondary}
                        />
                    </View>

                    <View>
                        <Button
                            onPress={this.yearListener}
                            title='1Y'
                            color={Colors.secondary}
                        />
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary
    },
    graph: {
        flex: 1,
    },
    input: {
        marginTop: 100,
        maxHeight: 40,
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: Colors.secondary
    },
    getUserButton: {
        // flex: 1,
        height: '5%',
        width: '40%',
        marginTop: 50,
        backgroundColor: 'orange'
    },
    timeButtons: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'red',
        height: '20%',
        width: '20%'
    }

});