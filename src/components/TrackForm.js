import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';

import {Context as LocationContext} from '../context/LocationContext'
import useSaveTracks from '../hooks/useSaveTrack'

const TrackFrom = () => {
    const {startRecording, stopRecording, changeName, data: {name, recording, location}} = useContext(LocationContext);
    const [addTrackToList] = useSaveTracks()
    const [err, setErr] = useState('');
    return (
        <View style={styles.cardStyle}>
            <Input
                onChangeText={
                    text => {
                        err ? setErr('') : null;
                        changeName(text)
                    }
                }
                inputContainerStyle={
                    styles.inputViewStyle
                }
                value={name}
                errorMessage={err}
                placeholder='Enter Track Name'/>

            {recording ? <Button
                    onPress={stopRecording}
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.buttonStyle}
                    title='Stop'/>
                : <Button
                    onPress={() => {
                        if (name.length)
                            startRecording();
                        else
                            setErr('Please add a title for the track')
                    }}
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.buttonStyle}
                    title='Start Recording'/>}

            {!recording && location.length ? <Button
                    onPress={addTrackToList}
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.buttonStyle}
                    title='Save Track'/>
                : null}
        </View>);
};

const styles = StyleSheet.create({
    cardStyle: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    inputViewStyle: {
        borderRadius: 5,
        borderColor: 'purple',
        borderWidth: 1.5,
        marginTop: 10,
        paddingHorizontal: 5
    },
    buttonStyle: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'purple',
        alignSelf: 'baseline',
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonTitleStyle: {
        fontSize: 20,
    },
});


export default TrackFrom;
