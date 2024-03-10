import React, {useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, withNavigationFocus} from "react-navigation";
import {Text} from "react-native-elements";
import Map from "../components/Map";
import TrackFrom from "../components/TrackForm";
import '../_mockLocation'
import {Context as LocationContext} from '../context/LocationContext'
import useLocation from "../hooks/useLocation";
import {FontAwesome} from '@expo/vector-icons'

const TrackCreateScreen = ({isFocused}) => {

    const {addLocation,data:{recording}} = useContext(LocationContext);

    const callback=useCallback(
        (location)=>{
            addLocation(location,recording)
        },[recording]
    );

    const [err] = useLocation(isFocused || recording,callback);

    return (<SafeAreaView forceInset={{top: 'always'}}>
        <Text h3>Create a Track</Text>
        <Map/>
        <TrackFrom/>
        {err ? <Text>Enable location service</Text> : null}
    </SafeAreaView>);
};

TrackCreateScreen.navigationOptions={
    title :'Add Track',
    tabBarIcon:<FontAwesome name="plus" size={20}/>
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
