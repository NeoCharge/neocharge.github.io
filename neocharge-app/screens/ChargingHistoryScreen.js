import React from 'react';
import GraphComponent from "../components/GraphComponent";
import { Alert, View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { API } from 'aws-amplify';
import Colors from '../assets/colors';
import * as SecureStore from 'expo-secure-store';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            TextInputValue: '',
            jsonDeviceLogsTimes: [],
            jsonDeviceLogsDates: [],
            graphData: [],
            graphType: '',
            userEmail: '',
            userHasData: true

        }
    }

    async componentDidMount() {
        this.state.userEmail = await SecureStore.getItemAsync("secure_email");
        API.get("LambdaProxy", "/chargeHistory",
            {
                "queryStringParameters": {
                    "email": this.state.userEmail
                }
            })
            .then(
                response => {
                    if (response != null) {
                        this.setState({ jsonDeviceLogsTimes: response["times"], jsonDeviceLogsDates: response["dates"] });
                        this.setState({ graphData: response["times"], graphType: 'times' });
                    } else {
                        console.log("couldn't find any logs for this user");
                        this.setState({ userHasData: false });
                    }
                }
            ).catch(error => {
                console.log(error.response)
            });

        console.log("after Lambda, gd: " + this.state.graphData)
        console.log("after Lambda, dates: " + this.state.jsonDeviceLogsDates)
    }

    dayListener = () => {
        const data = this.state.jsonDeviceLogsTimes
        const newData = []

        data.forEach(obj => {
            const todayString = new Date().toISOString().split('T')[0]
            const today = Date.parse(todayString)
            const date = Date.parse(obj.startTime.substring(0, 10))
            if (date == today) {
                newData.push(obj)
            }
        }
        )

        if (newData.length == 0) {
            Alert.alert("Your vehicle hasn't been charged today.")
        }

        this.setState({ graphData: newData, graphType: 'times' })
    }

    weekListener = () => {
        const data = this.state.jsonDeviceLogsDates
        const newData = []
        const oneDay = 1000 * 60 * 60 * 24;
        const oneWeek = oneDay * 7;

        data.forEach(obj => {
            const todayString = new Date().toISOString().split('T')[0]
            const today = Date.parse(todayString)
            const date = Date.parse(obj.startTime.substring(0, 10))
            if (date >= (today - oneWeek) && date <= today) {
                newData.push(obj)
            }
        }
        )

        this.setState({ graphData: newData, graphType: 'dates' })
    }

    monthListener = () => {
        const data = this.state.jsonDeviceLogsDates
        const newData = []

        data.forEach(obj => {
            const today = new Date()
            const todaysMonth = today.getMonth()
            const todaysYear = today.getFullYear()
            const dateMonth = new Date(obj.startTime).getMonth()
            const dateYear = new Date(obj.startTime).getFullYear()
            if (todaysMonth == dateMonth && todaysYear == dateYear) {
                newData.push(obj)
            }
        }
        )

        this.setState({ graphData: newData, graphType: 'dates' })
    }

    yearListener = () => {
        const data = this.state.jsonDeviceLogsDates
        const newData = []

        data.forEach(obj => {
            const today = new Date()
            const year = today.getFullYear()
            const date = new Date(obj.startTime).getFullYear()
            if (date == year) {
                newData.push(obj)
            }
        }
        )

        this.setState({ graphData: newData, graphType: 'dates' })
    }

    // Adding header title, color and font weight
    static navigationOptions = {
        title: "Charge History",
        headerStyle: {
            backgroundColor: Colors.accent2
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold"
        }
    };

    renderMessage() {
        if (this.state.userHasData) {
            return null;
        } else {
            return (<View>
                <Text style={styles.noChargeText}>After your first charge, your charging history will appear here!</Text>
            </View>);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                {this.renderMessage()}

                <View style={styles.graph}>
                    <GraphComponent
                        data={this.state.graphData}
                        graphType={this.state.graphType}
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
    },
    noChargeText: {
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginHorizontal: '20%',
        marginTop: '15%',
        color: Colors.secondary
    }

});