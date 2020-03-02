import React from 'react';
import Colors from '../assets/colors.js';
import DropdownMenu from 'react-native-dropdown-menu';

export default class LogoutOption extends React.Component {
    render() {
        // hardcoded temporarily, fill in with real time data later on 
        var data = [["No Device", "Tesla", "Washer"]];

        return (
            <DropdownMenu
            bgColor={Colors.appleBlue}
            tintColor={'#51a0d5'}
            activityTintColor={'green'}
            arrowImg={20}
            optionTextStyle={{ color: '#333333' }}
            titleStyle={{ marginLeft: 10, fontSize: 17, width: '50%' }}
            handler={(selection, row) => this.setState({ text: data[selection][row] })}
            data={data}
            >
            </DropdownMenu>

        );
    }
 }