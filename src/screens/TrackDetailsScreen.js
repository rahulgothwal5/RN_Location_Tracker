import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from "react-native-elements";
import {Context as TrackContext} from '../context/TrackContext';
import MapView, {Polyline} from "react-native-maps";

const TrackDetailsScreen = ({navigation}) => {
    const _id = navigation.getParam('_id');
    const {data} = useContext(TrackContext);
    const track = data.find(value => value._id === _id);
    const initialLocation=track.locations[0].coords;
    return (<>
        <Text h2>{track.name} </Text>

        <MapView
            style={styles.map}
            initialRegion={{
                ...initialLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            <Polyline coordinates={track.locations.map(loc => loc.coords)}/>
        </MapView>

    </>);
};

TrackDetailsScreen.navigationOptions={
    title :'Your Track Detail'
};

const styles = StyleSheet.create({ map: {
        height: 300
    }});



export default TrackDetailsScreen;
