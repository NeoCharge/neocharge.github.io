import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import SchedulingHomeScreen from '../screens/SchedulingHomeScreen';
import DeviceScreen from '../screens/DeviceScreen';
import Icon from "react-native-vector-icons/Feather";

const HomeStack = createStackNavigator({
    Home: HomeScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={30} />
    )
};

const SchedulingStack = createStackNavigator({
    SchedulingHome: SchedulingHomeScreen
});

SchedulingStack.navigationOptions = {
    tabBarLabel: "Scheduling",
    tabBarIcon: ({ tintColor }) => (
        <Icon name="clock" color={tintColor} size={30} />
    )
};

const DeviceStack = createStackNavigator({
    Device: DeviceScreen
});

DeviceStack.navigationOptions = {
    tabBarLabel: "Devices",
    tabBarIcon: ({ tintColor }) => (
        <Icon name="truck" color={tintColor} size={30} />
    )
};

export default createBottomTabNavigator(
    {
        SchedulingStack,
        HomeStack,
        DeviceStack
    },
    {
        tabBarOptions: {
            showLabel: true, // hide labels
            activeTintColor: "#6C6C6C", // active icon color
            inactiveTintColor: "#ffffff", // inactive icon color
            style: {
                backgroundColor: "#E88227" // TabBar background
            }
        }
    }
);