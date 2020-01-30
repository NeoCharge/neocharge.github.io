import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SetupScreen from '../screens/SetupScreen';

const AuthStack = createSwitchNavigator(
    {
        SignIn: SignInScreen,
        SignUp: SignUpScreen
    },
    {
        initialRouteName: 'SignUp',
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: TabNavigator,
            Auth: AuthStack,
            Config: SetupScreen,

        },
        {
            // Change 'AuthLoading' to 'App' if you don't want to log-in everytime when testing
            // initialRouteName: 'AuthLoading',
            initialRouteName: 'App'
            // initialRouteName: 'Config',
        }
    )
);
