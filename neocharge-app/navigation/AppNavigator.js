import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import VerificationScreen from '../screens/VerificationScreen';
import SetupScreen from '../screens/SetupScreen';

const AuthStack = createSwitchNavigator(
    { 
        SignIn: SignInScreen, 
        SignUp: SignUpScreen,
        Verify: VerificationScreen,
    },
    {
        initialRouteName: 'SignUp',
    }
    );

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            Auth: AuthStack,
            Setup: SetupScreen,
            App: TabNavigator,
        },
        {
            // Change 'AuthLoading' to 'App' if you don't want to log-in everytime when testing
            initialRouteName: 'AuthLoading',
        }
    )
);
