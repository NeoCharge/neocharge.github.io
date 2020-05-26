import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import VerificationScreen from '../screens/VerificationScreen';
import SetupScreen from '../screens/SetupScreen';
import PushNotifInitScreen from "../screens/PushNotifInitScreen";
import ConfigurePrimaryScreen from '../screens/ConfigurePrimaryScreen';
import ConfigureSecondaryScreen from '../screens/ConfigureSecondaryScreen';
import QRScreen from '../screens/QRScreen';

// Disable all error popups for Demo
console.disableYellowBox = true;

// Setup screens go here
const SetupStack = createStackNavigator(
    {
        QRCode: QRScreen,
        ConfigPrimary: ConfigurePrimaryScreen,
        ConfigSecondary: ConfigureSecondaryScreen
    }
);

const AuthStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        SignUp: SignUpScreen,
        SignIn: SignInScreen,
        Verify: VerificationScreen,
        Setup: SetupStack
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthStack,
            // Setup: SetupStack,
            App: TabNavigator,
        },
        {
            initialRouteName: 'Auth'
        }
    )
);
