import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory-native";


export default class GraphComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rawDeviceLogs: this.props.data,
      formattedDeviceLogs: []
    }
  }

  transformJson() {
    const rawList = this.props.data
    const formattedJson = []

    rawList.forEach(obj => formattedJson.push({
      "ChargeDate": obj.startTime.slice(5, 10),
      "Length": obj.duration / 100000,

    }))

    return formattedJson;
  }

  render() {
    const screenWidth = Dimensions.get('window').width
    return (
      <View>
        {/* <VictoryChart width={screenWidth - 50} height={300} domainPadding={{ x: 20 }}>
          <VictoryLabel text="Charge Length By Day" x={175} y={10} textAnchor="middle" />
          <VictoryLine data={this.transformJson()} x="ChargeDate" y="Length"
          />

          <VictoryAxis
            label="Charge Date"
            style={{
              axisLabel: { padding: 30 }
            }}
          />
          <VictoryAxis dependentAxis
            label="kWh"
            style={{
              axisLabel: { padding: 40 }
            }}
          />
        </VictoryChart> */}

        <VictoryChart width={screenWidth - 50} height={300} domainPadding={{ x: 40 }}>
          <VictoryLabel text="Charge Length By Day" x={175} y={10} textAnchor="middle" />
          <VictoryBar
            style={{ data: { fill: "#c43a31" } }}
            data={this.transformJson()}
            x="ChargeDate"
            y="Length"
            sortKey="ChargeDate"
          />
          <VictoryAxis
            label="ChargeDate"
            style={{
              axisLabel: { padding: 30 }
            }}
          />
          <VictoryAxis dependentAxis
            label="kWh"
            style={{
              axisLabel: { padding: 40 }
            }}
          />
        </VictoryChart>
      </View>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});