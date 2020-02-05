import React from 'react';
import { Platform, StyleSheet, Text, View, Image, Switch, Button } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import DatePicker from 'react-native-datepicker';
import Colors from '../assets/colors.js';


class SchedulingHomeScreen extends React.Component {

  constructor(props){
    super(props)
    //set value in state for initial date
    this.state = {
      timeOne:"11:00 PM",
      timeTwo:"6:00 AM",
      timeThree:"11:00 PM",
      timeFour:"11:00 AM"
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

  state = {switchValue:false}
  toggleSwitch = (value) => {
      //onValueChange of the switch this function will be called
      this.setState({switchValue: value})
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
              onValueChange = {this.toggleSwitch}
              value = {this.state.switchValue}/>
        </View>
    
            

            {/* <Text>{this.state.switchValue?'Switch is ON':'Switch is OFF'}</Text> */}
            
            <View style = {styles.textContainer}> 
              <Text style={styles.scheduleWarning}>Turn off the schedule in your car.</Text>  
              <Text style={styles.resetText}>Reset based on utility plan.</Text>  
            </View>

            <Text style={styles.weekdaysText}>Weekdays</Text> 
            {/* Weekday Start */}
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
                date={this.state.timeOne} //initial date from state
                mode="time" //The enum of date, datetime and time
                placeholder="select time"
                format="h:mm A"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(timeOne) => {this.setState({timeOne: timeOne})}}
              />

            </View>

            {/* Weekday End */}
            <View style={styles.timeOption}>
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

            </View>



            <Text style={styles.weekdaysText}>Weekends</Text> 
            {/* Weekend Start */}
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

            </View>

             {/* Weekend Start */}
             <View style={styles.timeOption}>
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

            </View>
     
      </View>

      

    );
  }
}

const AppStackNavigator = createStackNavigator({
    Schedule: {
      screen: SchedulingHomeScreen
    },
  });

const Apps = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
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
    fontWeight: "bold"
    
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

  weekdaysText: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
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
    fontSize: 14,
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
  timeTitles: {
    marginLeft: 20,
    // borderColor: 'black',
    // borderWidth: 2
  },

  timeOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent:'center',
    maxHeight: 50,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'space-between'
 }


});

export default Apps;