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
        SignIn: SignInScreen, 
        SignUp: SignUpScreen,
        Setup: SetupScreen,
        Verify: VerificationScreen,
        PushSetup: PushNotifInitScreen,
    },
    {
        initialRouteName: 'PushSetup',
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            Auth: AuthStack,
            Setup: SetupScreen,
            App: TabNavigator,
            Config: SetupScreen,

        },
        {
            // Change 'AuthLoading' to 'App' if you don't want to log-in everytime when testing
            // initialRouteName: 'App',
            initialRouteName: 'AuthLoading'
            // initialRouteName: 'Config',
        }
    )
);
