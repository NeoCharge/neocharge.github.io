import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Switch, Button } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../assets/colors.js';
import * as SecureStore from 'expo-secure-store';
import MultiSlider from 'react-native-multi-slider';
import { API, Auth } from 'aws-amplify';
import Slider from 'react-native-slider';

class SchedulingHomeScreen extends React.Component {

  constructor(props) {
    super(props)
    //set value in state for initial date
    this.state = {
      value: 1,
      value1: 1,
      multiSliderValue: [0, 11],
      startTime: "12:00 PM",
      endTime: "5:30 PM",
      userEmail: ""

    }
  }

  async componentDidMount() {
    this.state.userEmail = await SecureStore.getItemAsync("secure_email");
    const path = "/chargeschedule"; // path from root of API
    console.log("making request");
    let times = await API.get("LambdaProxy", path,
      {
        "queryStringParameters": {
          "userEmail": this.state.userEmail
        }

      })
      .catch(error => { console.log(error.response) });

    //times will contain an array of size 2, with start time and then end time .... [startTime, endTime]
    if (times.length > 0) {
      let startSliderVal = this.stringTimeToSlider(times[0]);
      let endSliderVal = this.stringTimeToSlider(times[1]);
      let startStr = this.sliderValToString(startSliderVal);
      let endStr = this.sliderValToString(endSliderVal);
      this.setState({ multiSliderValue: [startSliderVal, endSliderVal], startTime: startStr, endTime: endStr });
      console.log("start time: " + this.stringTimeToSlider(times[0]));
      console.log("end time: " + this.stringTimeToSlider(times[1]));
    }
    //user has not set up their desired charge times yet...
    else {
      alert("Desired charge times not selected. Please select the time period to charge your vehicle on the slider bar below.")
    }
    console.log("response: " + times);

  }

  stringTimeToSlider(strTime) {
    let strTimes = strTime.split(":");
    let timeNum = parseInt(strTimes[0]);
    let sliderVal = (timeNum >= 12) ? 2 * timeNum - 24 : 2 * timeNum + 24;
    if (strTimes[1] == "30") {
      sliderVal += 1;
    }
    return sliderVal
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
    if (sliderVal < 2) {
      timeVal = ((.5 * sliderVal) + 12);
    } else if (sliderVal < 24) {
      timeVal = (.5 * sliderVal);
    } else if (sliderVal < 26) {
      timeVal = ((.5 * (sliderVal - 24)) + 12);
    } else {
      timeVal = (.5 * (sliderVal - 24));
    }

    let retVal;
    if (timeVal % 1 == 0.5) {
      retVal = (timeVal - .5).toString() + ":30";
    } else {
      retVal = timeVal.toString() + ":00";
    }

    if (sliderVal < 24) {
      retVal += " PM";
    } else {
      retVal += " AM";
    }

    return retVal;


  }

  multiSliderValuesChange(values) {
    let startStr = this.sliderValToString(values[0]);
    let endStr = this.sliderValToString(values[1]);
    this.setState({ multiSliderValue: values, startTime: startStr, endTime: endStr });
    console.log("values changed!");
  }

  sliderToDBTime(sliderVal) {
    let timeVal;
    if (sliderVal < 24) {
      timeVal = ((.5 * sliderVal) + 12);
    } else {
      timeVal = ((.5 * sliderVal) - 12);
    }

    if (timeVal % 1 == 0.5) {
      timeVal-=0.5;
    }

    let retVal = timeVal.toString();

    if (sliderVal % 2 == 0) {
      retVal+= ":00";
    } else {
      retVal+= ":30";
    }
    retVal+=":00";
    return retVal;
  }

  async saveSchedule() {
    console.log("saving schedule");

    console.log(this.state.userEmail);
    console.log(typeof this.state.userEmail);

    let dbStart = this.sliderToDBTime(this.state.multiSliderValue[0]);
    let dbEnd = this.sliderToDBTime(this.state.multiSliderValue[1]);
    let requestBody = {
      "userEmail": this.state.userEmail,
      "startTime": dbStart,
      "endTime": dbEnd
    };
    let jsonObj = {
      body: requestBody
    };
    const path = "/chargeschedule";
    const apiResponse = await API.put("LambdaProxy", path, jsonObj); //replace the desired API name
    console.log(apiResponse);
    console.log("start: " + dbStart);
    console.log("end: " + dbEnd);
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

        <View style={styles.saveScheduleButtonContainer}>
          <Button title="Save Schedule"
            onPress={this.saveSchedule.bind(this)} />
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
  },
  saveScheduleButton: {

  },
  saveScheduleButtonContainer: {
    flexDirection: "row",
    justifyContent: "center"
  }


});

export default SchedulingHomeScreen;