import React from "react";
import createDataContext from './createDataContext'
import apiClient from "../Api";

const reducer = (state, action) => {
    switch (action.type) {
        case 'save_list':
            return action.payload;
        default:
            return state;
    }
};

const saveTrack = dispatch => async (name, locations) => {
    try {
        const response = await apiClient.post('track/createTrack', {
            name, locations
        });
    } catch (error) {
        console.log(error);
        throw error
    }
};

const getTrackList = dispatch => async () => {
    try {
        const response = await apiClient.get('track/getTracks');
        dispatch({type: 'save_list', payload: response.data.data});
    } catch (error) {
        console.log(error);
        throw error
    }
};

export const {Context, Provider} =
    createDataContext(
        reducer,
        {saveTrack, getTrackList},
        [],
    );
