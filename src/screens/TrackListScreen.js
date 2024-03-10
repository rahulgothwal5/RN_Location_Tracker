import React, {useContext} from 'react';
import {FlatList, StyleSheet, View,TouchableOpacity} from 'react-native';
import {Context as TrackContext} from '../context/TrackContext'
import {NavigationEvents} from "react-navigation";
import {ListItem} from "react-native-elements";
import TrackDetailsScreen from "./TrackDetailsScreen";

const TrackListScreen = ({navigation}) => {

    const {getTrackList, data} = useContext(TrackContext);


    return (<>
        <NavigationEvents onWillFocus={getTrackList}/>
        <FlatList
            data={data}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
                return <TouchableOpacity onPress={()=>{
                    navigation.navigate('TrackDetailsScreen',{_id:item._id})
                }}>
                    <ListItem
                        chevron
                        title={item.name}/>
                </TouchableOpacity>
            }}
        />
    </>);
};

TrackListScreen.navigationOptions={
    title :'Tracks'
};

const styles = StyleSheet.create({});

export default TrackListScreen;
