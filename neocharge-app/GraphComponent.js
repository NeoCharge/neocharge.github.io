import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryLabel } from "victory-native";

const data = [
  { ChargeDate: "11/22/19", Length: 4 },
  { ChargeDate: "11/23/19", Length: 7 },
  { ChargeDate: "11/24/19", Length: 5 },
  { ChargeDate: "11/25/19", Length: 6 }
];

export default class GraphComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rawDeviceLogs: props.data, 
            formattedDeviceLogs: [] 
        }
    }

   transformJson () {
    const rawList = this.state.rawDeviceLogs
    const formattedJson = [] 
    for(i = 0; i< rawList.Length; i++) {
        formatttedJson.push(
            {"ChargeDate" : rawList[i].ChargeDate,
             "Length" : rawList[i].duration }) 
    }
    this.state.formattedDeviceLogs = formattedJson
    console.log("state:")
    console.log(this.state)
   }

  render() {
    this.transformJson() 
    const screenWidth = Dimensions.get('window').width;
    return (
        <VictoryChart width={screenWidth} height={300}>
          <VictoryLabel text="Charge Length By Day" x={150} y={10} textAnchor="middle"/>
          <VictoryLine data={data} x="ChargeDate" y="Length" />
        </VictoryChart>
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