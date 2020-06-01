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
import ConfigureTimeZoneScreen from '../screens/ConfigureTimeZoneScreen'
import DeviceIdScreen from '../screens/DeviceIdScreen';
import FirstTimeNotificationSelectionScreen from '../screens/FirstTimeNotificationSelectionScreen';

// Disable all error popups for Demo
console.disableYellowBox = true;

// Setup screens go here
const SetupStack = createStackNavigator(
    {
        QRCode: QRScreen,
        DeviceId: DeviceIdScreen,
        ConfigTimeZone: ConfigureTimeZoneScreen,
        ConfigPrimary: ConfigurePrimaryScreen,
        ConfigSecondary: ConfigureSecondaryScreen,
        PushNotification: FirstTimeNotificationSelectionScreen,
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
