import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import SchedulingHomeScreen from '../screens/SchedulingHomeScreen';
import ChargingHistoryScreen from '../screens/ChargingHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DeviceScreen from '../screens/DeviceScreen';

export default createStackNavigator(
    {
        Home: HomeScreen,
        SchedulingHome: SchedulingHomeScreen,
        ChargingHistory: ChargingHistoryScreen,
        Settings: SettingsScreen,
        Device: DeviceScreen
    }
)