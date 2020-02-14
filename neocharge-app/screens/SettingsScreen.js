import React from 'react';
import { StyleSheet, Text, View, Switch, Button, TouchableHighlight, Image } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Colors from '../assets/colors.js';
import DropdownMenu from 'react-native-dropdown-menu';
import ListPopover from 'react-native-list-popover';

class SettingsScreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        isVisible: false
      }
    }

    // Adding header title, color and font weight
    static navigationOptions = {
      title: "Settings",
      headerStyle: {
        backgroundColor: Colors.accent2
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  
    state = {switchValue1:false, switchValue2: false, switchValue3: false}
    toggleSwitch1 = (value) => {
        //onValueChange of the switch this function will be called
        this.setState({switchValue1: value})
     };
     toggleSwitch2 = (value) => {this.setState({switchValue2: value})};
     toggleSwitch3 = (value) => {this.setState({switchValue3: value})};

      // alert user of logout
     _onPressButton() {
        alert('Confirm logging out of system')
      }    

  
    render() {
      var data = [["No Device", "Tesla", "Washer"]];
      const items = ["Central Standard Time", "Mountain Standard Time", "Pacific Standard Time", 
                      "Alaskan Standard Time", "Hawaii-Aleutian Standard Time", "Eastern Standard Time"];
     
      return (
        <View style={styles.container}>  

            {/* display user account */}
            <Text style={styles.resetText}>Account</Text> 
            <View style={styles.backgroundScheduleBox}> 
              <Image style={{ marginLeft: 10, width: 55, height: 55}} source={require('../assets/female-icon.png')} />
              <Text style={styles.startsText1}>Jane Doe</Text>  
            </View>
      
            {/* Push Notification Options */}
            <Text style={styles.resetText}>Notifications</Text>  

            {/* Primary Device Notification */}
            <View style={styles.backgroundScheduleBox}>
                <Image style={{ marginLeft: 10, width: 30, height: 30}} source={require('../assets/electric-car-icon.png')} />
                <Text style={styles.optionText1}>Primary Device</Text> 
                <Switch
                    style={styles.switch}
                    onValueChange = {this.toggleSwitch1}
                    value = {this.state.switchValue1}/>
            </View> 

             {/* Secondary Device Notification */} 
            <View style={styles.backgroundScheduleBox}> 
                <Image style={{ marginLeft: 10, width: 30, height: 30}} source={require('../assets/home-icon.png')} />
                <Text style={styles.optionText2}>Secondary Device</Text> 
                <Switch
                    style={styles.switch}
                    onValueChange = {this.toggleSwitch2}
                    value = {this.state.switchValue2}/>
            </View>

            {/* Interruptions Notification */} 
            <View style={styles.backgroundScheduleBox}> 
                <Image style={{ marginLeft: 10, width: 30, height: 30}} source={require('../assets/pause-icon.png')} />
                <Text style={styles.optionText3}>Charge Interruptions</Text> 
                <Switch
                    style={styles.switch}
                    onValueChange = {this.toggleSwitch3}
                    value = {this.state.switchValue3}/>
            </View >
            
            {/* Manual Settings */}
            <Text style={styles.resetText}>Time Zone</Text>  
            <View style={{flexDirection: 'row', justifyContent: 'stretch', marginTop: 50}} > 
              <Text style={styles.resetText}>Primary Device</Text>  
              <Text style={styles.secondaryText}>Secondary Device</Text> 
            </View>

            {/* Configure Primary Device */}
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View/>
                <DropdownMenu
                    bgColor={'#363636'}
                    tintColor={'#51a0d5'}
                    activityTintColor={'green'}
                    arrowImg={20} 
                    optionTextStyle={{color: '#333333'}}
                    titleStyle={{marginLeft: 10, fontSize: 17, width: '50%'}} 
                    handler={(selection, row) => this.setState({text: data[selection][row]})}
                    data={data}
                    >
                </DropdownMenu>
                
              {/* Configure Secondary Device */}
              <View/>
                <DropdownMenu
                    bgColor={'#363636'}
                    tintColor={'#51a0d5'}
                    activityTintColor={'green'}
                    arrowImg={20}   
                    optionTextStyle={{color: '#333333'}}
                    titleStyle={{marginLeft: 40, fontSize: 17, width: '50%'}} 
                    handler={(selection, row) => this.setState({text: data[selection][row]})}
                    data={data}
                    >
                </DropdownMenu>
            </View>

       {/* TimeZone Selection DropDown */}
       <View style={styles.containerTimeZone}>
          <TouchableHighlight
              style={styles.buttonTimeZone}
              onPress={() => this.setState({isVisible: true})}>
              <Text style = {{marginLeft: 60, color: 'white', fontSize: 20}}>{this.state.item || 'Select'}</Text>
          </TouchableHighlight>
          <ListPopover
              list={items}
              isVisible={this.state.isVisible}
              onClick={(item) => this.setState({item: item})}
              onClose={() => this.setState({isVisible: false})}
          />
          <Image style={{ marginLeft: 10, width: 28, height: 28, position: 'absolute', marginTop: 10}} source={require('../assets/timezone-icon.png')} />
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <View style={styles.logoutButtonContainer}>
            <Button
              onPress={this._onPressButton}
              title = "Logout"
              color = 'white'
            />
          </View>
        </View>

  </View>
      );
    }
  }
  
  const AppStackNavigator = createStackNavigator({
    Schedule: {screen: SettingsScreen}});
  
  const Apps = createAppContainer(AppStackNavigator);

  // styling elements
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
      minWidth: '100%'
    },
    containerTimeZone: {
      flex: 1,
      backgroundColor: Colors.primary,
      minWidth: '100%',
      minHeight: 60,
      position: 'absolute',
      marginTop: '88%'
    },
    optionText1: {
      fontSize: 20,
      color: Colors.secondary,
      marginLeft: 30,
      paddingRight: 147
    }, 
    optionText2: {
      fontSize: 20,
      color: Colors.secondary,
      marginLeft: 30,
      paddingRight: 120
    }, 
    optionText3: {
      fontSize: 20,
      color: Colors.secondary,
      marginLeft: 30,
      paddingRight: 100
    }, 
    resetText: {
      fontSize: 14,
      color: 'grey',
      fontWeight: 'bold',
      marginLeft: 40,
      marginBottom: 10,
      marginTop: 15,
    },
    secondaryText: {
      fontSize: 14,
      color: 'grey',
      fontWeight: 'bold',
      marginLeft: 110,
      marginBottom: 10,
      marginTop: 15
    },
    startsText1: {
      fontSize: 20,
      marginLeft: 20,
      color: 'white'
    },
    switch: {
      marginRight: 10,
      alignItems: "stretch",
    },
    backgroundScheduleBox: {
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      maxHeight: 60,
      backgroundColor: '#363636',
      alignItems: 'center',
      marginRight: 90
    },
    backgroundPrimaryBox: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 48,
        width: '50%',
        backgroundColor: '#363636',
        alignItems: 'center',
        flexWrap: 'wrap',
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
   logoutContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent:'center'
   },
   logoutButtonContainer: {
    backgroundColor: '#363636',
    position: 'absolute',
    justifyContent:'center',
    height: 40,
    borderColor: '#51a0d5',
    borderWidth: 1,
    bottom: '50%',
    width: '90%',
    borderRadius: 10
   },
  buttonTimeZone: {
    backgroundColor: '#363636',
    padding: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center'
  }
});
  
  export default Apps;