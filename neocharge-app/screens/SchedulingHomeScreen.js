import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Switch, Button } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../assets/colors.js';
import MultiSlider from 'react-native-multi-slider';

class SchedulingHomeScreen extends React.Component {

  constructor(props) {
    super(props)
    //set value in state for initial date
    this.state = {
      timeOne: "11:00 PM",
      timeTwo: "6:00 AM",
      timeThree: "11:00 PM",
      timeFour: "11:00 AM",
      value: 1,
      value1: 1,
      multiSliderValue: [0, 11] ,
      startTime: "12:00 PM",
      endTime: "5:30 PM"

    }
  }

  // Adding header title, color and font weight
  static navigationOptions = {
    title: "Schedule",
    headerStyle: {
      backgroundColor: Colors.accent2
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  state = { switchValue: false }
  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value })
  };

  sliderValToString(sliderVal) {
    let timeVal;
    if (sliderVal < 3) {
      timeVal = ((.5 * sliderVal) + 12);
    } else if (sliderVal < 24) {
      timeVal = (.5 * sliderVal);
    } else if (sliderVal < 27) {
      timeVal = ((.5 * (sliderVal-24)) + 12);
    } else {
      timeVal = (.5 * (sliderVal-24));
    }

    let retVal;
    if (timeVal % 1 == 0.5) {
      retVal=(timeVal-.5).toString() + ":30";
    } else {
      retVal= timeVal.toString() + ":00";
    }

    if (sliderVal < 24) {
      retVal+=" PM";
    } else {
      retVal+=" AM";
    }

    return retVal;


  }

  multiSliderValuesChange(values) { 
    let startStr = this.sliderValToString(values[0]);
    let endStr = this.sliderValToString(values[1]);
    this.setState({ multiSliderValue: values, startTime: startStr, endTime: endStr })
  }

  render() {
    const { show, date, mode } = this.state;
    return (

      <View style={styles.container}>
        <Text style={styles.instructionText}>To charge at certain times,
        set a schedule and plug in. Charging at off-peak hours saves
                you money.</Text>

        <View style={styles.textContainer}>
          <Text style={styles.scheduleWarning}>Turn off the schedule in your car.</Text>
          <Text style={styles.resetText}>Reset based on utility plan.</Text>
        </View>

        <Text style={{ ...styles.weekdaysText, maxHeight: 100 }}>Set Schedule</Text>

        <View style={styles.backgroundTimeBox}>

          <View style={styles.containerSlider}>
            <MultiSlider
              style={{ alignItems: "center", justifyContent: "center" }}
              values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
              sliderLength={250}
              onValuesChange={this.multiSliderValuesChange.bind(this)}
              min={0}
              max={48}
              step={1}

            />
          </View>



        </View>

        <View style={styles.currentSelectedTimes}>
            <Text style={styles.selectedTimesText}>START: {this.state.startTime}</Text>
            <Text style={styles.selectedTimesText}>END: {this.state.endTime}</Text>
        </View>

      </View>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },

  containerSlider: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    maxHeight: 50,
    marginTop: 30

  },
  textContainer: {
    textAlign: "left",
    fontSize: 14,
    marginLeft: 0
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    color: 'white'

  },
  switch: {
    marginRight: 10,
    alignItems: "stretch",
  },
  instructionText: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 15,
    color: Colors.secondary
  },
  scheduleWarning: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 5,
    fontStyle: 'italic',
    color: Colors.secondary
  },
  optionText: {
    fontSize: 20,
    marginLeft: 20,
    color: Colors.secondary

  },
  resetText: {
    fontSize: 14,
    color: '#51a0d5',
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 40,
    marginTop: 45,
    color: '#51a0d5'

  },

  scrollText: {
    fontSize: 14,
    color: '#51a0d5',
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#51a0d5',
    marginTop: 0,
    height: 20

  },

  weekdaysText: {
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 15,
    color: Colors.secondary
  },

  startsText1: {
    fontSize: 20,
    marginLeft: 20,
    color: 'white'

  },

  endsText1: {
    fontSize: 20,
  },

  weekendsText: {
    fontSize: 20,
    padding: '10%'
  },

  endsText2: {
    fontSize: 20,
  },
  backgroundScheduleBox: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxHeight: 60,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  backgroundBox: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxHeight: 100,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  backgroundTimeBox: {
    flex: 1,
    maxHeight: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#363636'
  },

  backgroundTimeBox1: {
    flex: 1,
    maxHeight: 90,
    backgroundColor: '#363636',
  },

  timeTitles: {
    marginLeft: 20,
    // borderColor: 'black',
    // borderWidth: 2
  },

  timeOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 50,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  currentSelectedTimes: {
    marginHorizontal: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 15
  },
  selectedTimesText: {
    fontSize: 15,
    color: Colors.secondary
  }


});

export default SchedulingHomeScreen;