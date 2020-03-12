import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Switch, Button } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import DatePicker from 'react-native-datepicker';
import Colors from '../assets/colors.js';
import Slider from "react-native-slider";

// class RangeSlider extends Component {
//   state = {
//     startLabel: this.props.initialStart,
//     endLabel: this.props.initialEnd,
//     start: this.props.initialStart,
//     end: this.props.initialEnd,
//     value: 0.2
//   }

//   render() {
//     const { color, min, max } = this.props;
//     const { start, end, startLabel, endLabel } = this.state;

//     return (
//       <View>
//         <Text style={styles.sliderLabels}>{startLabel} - {endLabel}</Text>
//         <View style={styles.sliders}>
//           <Slider style={styles.backgroundSlider} minimumValue={this.min} maximumValue={this.max} thumbTintColor="transparent" />

//           <Slider style={styles.startSlider} onValueChange={this.handleStartValueChange} onSlidingComplete={this.handleStartSlidingComplete} value={this.asInverse(start)} step={1} minimumValue={min} maximumValue={max} thumbTintColor={color} minimumTrackTintColor={color} maximumTrackTintColor="transparent" />
//           <Slider style={styles.endSlider} onValueChange={this.handleEndValueChange} onSlidingComplete={this.handleEndSlidingComplete} value={end} step={1} minimumValue={min} maximumValue={max} thumbTintColor={color} minimumTrackTintColor={color} maximumTrackTintColor="transparent" />

//         </View>
//       </View>
//     )
//   }

//     asInverse(num) {
//         const { min, max } = this.props;
//         const numInverse = min + (max - num);
//         return numInverse;
//     }
//     asForward(numInverse) {
//         const { min, max } = this.props;
//         const num = -numInverse + min + max;
//         return num;
//     }

//     handleStartValueChange = (startInverse) => {
//         const start = this.asForward(startInverse);
//         this.setState(() => ({ startLabel:start }));
//     }
//     handleStartSlidingComplete = (startInverse) => {
//         const start = this.asForward(startInverse);
//         this.setState(() => ({ start }));
//     }

//     handleEndValueChange = end => this.setState(() => ({ endLabel:end }))
//     handleEndSlidingComplete = end => this.setState(() => ({ end }))
// }


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
      value1: 1
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



  render() {
    const { show, date, mode } = this.state;
    return (

      <View style={styles.container}>
        <Text style={styles.instructionText}>To charge at certain times,
            set a schedule and plug in. Charging at off-peak hours saves
                you money.</Text>

        <View style={styles.backgroundScheduleBox}>
          <Text style={styles.optionText}>Schedule</Text>
          <Switch
            style={styles.switch}
            onValueChange={this.toggleSwitch}
            value={this.state.switchValue} />
        </View>



        {/* <Text>{this.state.switchValue?'Switch is ON':'Switch is OFF'}</Text> */}

        <View style={styles.textContainer}>
          <Text style={styles.scheduleWarning}>Turn off the schedule in your car.</Text>
          <Text style={styles.resetText}>Reset based on utility plan.</Text>
        </View>

        <Text style={{ ...styles.weekdaysText, maxHeight: 100 }}>Set Schedule</Text>

        <View style={styles.backgroundTimeBox}>

          <Text style={{ ...styles.scrollText, marginLeft: 20, marginTop: 10 }}>
            Start: {this.state.value}:00
            </Text>


          <View style={{ ...styles.containerSlider }}>
            <Slider
              value={this.state.value}
              inverted={'true'}
              minimumValue={1}
              maximumValue={24}
              step={1}
              minimumTrackTintColor='orange'
              maximumTrackTintColor='white'
              thumbTintColor='red'
              onValueChange={value => this.setState({ value })}
            />
          </View>

        </View>

        <View style={styles.backgroundTimeBox}>
          <Text style={{ ...styles.scrollText, marginTop: 15 }}>
            End: {this.state.value1}:00
                  </Text>

          <View style={{ ...styles.containerSlider }}>
            <Slider
              value1={this.state.value1}
              inverted={'true'}
              minimumValue={1}
              maximumValue={24}
              step={1}
              minimumTrackTintColor='orange'
              maximumTrackTintColor='white'
              thumbTintColor='red'
              onValueChange={value1 => this.setState({ value1 })}
            />
          </View>


        </View>







        {/* Weekday Start */}
        {/* <View style={styles.timeOption}>
              <Text style={styles.startsText1}>Starts</Text>  
              <DatePicker
                style={{width: 100}}
                customStyles={{
                  dateIcon: {
                    display:'none'
                  },
                  dateInput: {
                    borderWidth:0,
                    marginRight: 5
                  },
                  dateText: {
                    fontSize: 18,
                    color: 'white'
                  }
              }}
                date={this.state.timeOne} //initial date from state
                mode="time" //The enum of date, datetime and time
                placeholder="select time"
                format="h:mm A"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(timeOne) => {this.setState({timeOne: timeOne})}}
              />

            </View> */}

        {/* Weekday End */}
        {/* <View style={styles.timeOption}>
              <Text style={styles.startsText1}>Ends</Text>  
              <DatePicker
                style={{width: 100}}
                customStyles={{
                  dateIcon: {
                    display:'none'
                  },
                  dateInput: {
                    borderWidth:0,
                    marginRight: 5
                  },
                  dateText: {
                    fontSize: 18,
                    color: 'white'
                  }
              }}
                date={this.state.timeTwo} //initial date from state
                mode="time" //The enum of date, datetime and time
                placeholder="select time"
                format="h:mm A"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(timeTwo) => {this.setState({timeTwo: timeTwo})}}
              />

            </View> */}



        {/* Weekend Start
            <View style={styles.timeOption}>
              <Text style={styles.startsText1}>Starts</Text>  
              <DatePicker
                style={{width: 100}}
                customStyles={{
                  dateIcon: {
                    display:'none'
                  },
                  dateInput: {
                    borderWidth:0,
                    marginRight: 5
                  },
                  dateText: {
                    fontSize: 18,
                    color: 'white'
                  }
              }}
                date={this.state.timeThree} //initial date from state
                mode="time" //The enum of date, datetime and time
                placeholder="select time"
                format="h:mm A"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(timeThree) => {this.setState({timeThree: timeThree})}}
              />

            </View> */}

        {/* Weekend Start */}
        {/* <View style={styles.timeOption}>
              <Text style={styles.startsText1}>Ends</Text>  
              <DatePicker
                style={{width: 100}}
                customStyles={{
                  dateIcon: {
                    display:'none'
                  },
                  dateInput: {
                    borderWidth:0,
                    marginRight: 5
                  },
                  dateText: {
                    fontSize: 18,
                    color: 'white'
                  }
              }}
                date={this.state.timeFour} //initial date from state
                mode="time" //The enum of date, datetime and time
                placeholder="select time"
                format="h:mm A"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(timeFour) => {this.setState({timeFour: timeFour})}}
              />

            </View> */}

        {/* <View style={styles.containerRangeController}>
        <View style={styles.myRangeWrap}>
          <RangeSlider min={1} max={24} initialStart={1} initialEnd={24} color="red" />
        </View>
    </View>*/}





        {/* <View style={styles.containerSlider}>
                <Slider
                  value={this.state.value}
                  minimumValue={1}
                  maximumValue={12}
                  step = {1}
                  minimumTrackTintColor="orange"
                  maximumTrackTintColor="white"
                  onValueChange={value => this.setState({ value })}
                />
                <Text style = {styles.resetText}>
                  {this.state.value}:00
                </Text>
              </View> */}





        {/* <View style = {flexDirection= 'row'}>
              <View style={{...styles.containerSlider, marginLeft: 145}}>
                <Slider
                  value={this.state.value1}
                  inverted = {'true'}
                  minimumValue={1}
                  maximumValue={12}
                  step = {1}
                  minimumTrackTintColor='white'
                  maximumTrackTintColor='orange'
                  thumbTintColor = 'red'
                  onValueChange={value1 => this.setState({ value1 })}
                />
                <Text style = {styles.scrollText}>
                  {this.state.value1}:00 pm
                </Text>
              </View>
              </View>
 */}



      </View>



    );
  }
}

// const AppStackNavigator = createStackNavigator({
//     Schedule: {
//       screen: SchedulingHomeScreen
//     },
//   });

// const Apps = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },

  containerSlider: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    width: 250,
    maxHeight: 50,
    marginLeft: 80

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
    backgroundColor: '#363636',
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
  }


});

export default SchedulingHomeScreen;