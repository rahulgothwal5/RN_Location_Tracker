import React from 'react';
import createDataContext from './createDataContext';

const reducer = (state, action) => {
    switch (action.type) {
        case 'add_currentLocation':
            return {...state, currentLocation: action.payload};
        case 'add_location':
            return {...state, location: [...state.location, action.payload]};
        case 'start_recording':
            return {...state, recording: true};
        case 'stop_recording':
            return {...state, recording: false};
        case 'change_name':
            return {...state, name: action.payload};
        case 'reset':
            return {...state, name: '',location: [],recording: false};
        default:
            return state;
    }
};

const changeName = dispatch => async (name) => {
    dispatch({type: 'change_name', payload: name});
};
const startRecording = dispatch => async () => {
    dispatch({type: 'start_recording'});
};
const stopRecording = dispatch => async () => {
    dispatch({type: 'stop_recording'});
};
const reset = dispatch => async () => {
    dispatch({type: 'reset'});
};
const addLocation = dispatch => async (location, recording) => {
    dispatch({type: 'add_currentLocation', payload: location});
    if (recording) {
        dispatch({type: 'add_location', payload: location});
    }
};

export const {Context, Provider} =
    createDataContext(
        reducer,
        {startRecording, stopRecording, addLocation,changeName,reset},
        {name: '', recording: false, location: [], currentLocation: null},
    );

