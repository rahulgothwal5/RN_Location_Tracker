import 'react-native-gesture-handler';
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import TrackDetailsScreen from './src/screens/TrackDetailsScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Provider as TrackProvider} from './src/context/TrackContext';
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import {FontAwesome} from '@expo/vector-icons';
import {Platform} from "react-native";

const TrackFlow = createStackNavigator({
    TrackListScreen: TrackListScreen,
    TrackDetailsScreen: TrackDetailsScreen,
});

TrackFlow.navigationOptions = {
    title: 'Tracking',
    tabBarIcon: <FontAwesome name="location-arrow" size={20} color="black"/>
};
const navigation = createSwitchNavigator(
    {
        ResolveAuthScreen: ResolveAuthScreen,
        authFlow: createStackNavigator({
                LoginScreen: LoginScreen,
                RegisterScreen: {screen: RegisterScreen,},
            }, {
                // navigationOptions: {
                //     header: () => {
                //         style:{
                //             marginTop: Platform.OS === 'android' ? 24 : 0
                //         }
                //     }
                // }
            }
        ),
        mainFlow: createBottomTabNavigator(
            {
                trackFlow: TrackFlow,
                TrackCreateScreen: TrackCreateScreen,
                LogoutScreen: LogoutScreen,
            },
        ),
    },
    )
;

const App = createAppContainer(navigation);

export default () => {
    return (<TrackProvider>
        <LocationProvider>
            <AuthProvider>
                <App ref={(navigator) => {
                    setNavigator(navigator);
                }}/>
            </AuthProvider>
        </LocationProvider>
    </TrackProvider>);
}
