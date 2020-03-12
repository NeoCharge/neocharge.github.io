import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import VerificationScreen from '../screens/VerificationScreen';
import SetupScreen from '../screens/SetupScreen';
import PushNotifInitScreen from "../screens/PushNotifInitScreen";

const AuthStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        SignUp: SignUpScreen,
        SignIn: SignInScreen,
        Verify: VerificationScreen,
        Setup: SetupScreen,
    },
    {
        initialRouteName: 'AuthLoading', // default
        //initialRouteName: 'SetUp',
    }
);

// Disable all error popups for Demo
console.disableYellowBox = true;

export default createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthStack,
            Setup: SetupScreen,
            App: TabNavigator,
            Config: SetupScreen,
            SignUp: SignUpScreen

        },
        {
            // Change 'AuthLoading' to 'App' if you don't want to log-in everytime when testing
            initialRouteName: 'Auth'
            // initialRouteName: 'Config',
        }
    )
);
