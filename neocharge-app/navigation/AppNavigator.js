import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';

// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
    createSwitchNavigator(
        {
            // AuthLoading: AuthLoadingScreen,
            App: TabNavigator,
            // Auth: AuthStack,
        },
        {
            initialRouteName: 'App',
        }
    )
);