import React from 'react';
import createDataContext from './createDataContext';
import {AsyncStorage} from 'react-native';
import apiClient from '../Api';
import {navigate} from '../navigationRef';

const reducer = (state, action) => {
    switch (action.type) {
        case 'doLogin':
            return action.payload;
        case 'setError':
            return {...state, errMsg: action.payload.errMsg};
        case 'removeError':
            return {...state, errMsg: ''};
        case 'doLogout':
            return {errMsg: '', isAuthenticated: null};
        default:
            return state;
    }
};


const removeError = dispatch => {
    return async () => {
        dispatch({type: 'removeError'});
    };
};

const doLogout = dispatch => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'doLogout'});
        navigate('ResolveAuthScreen');
    };
};
const doLogin = dispatch => {
    return async (email, pass) => {
        try {
            removeError();
            const response = await apiClient.post('auth/login', {
                email: email,
                password: pass,
                fcm_token: '',
            });
            console.log(response.data.data.jwt);
            await AsyncStorage.setItem('token', response.data.data.jwt);
            dispatch({type: 'doLogin', payload: {errMsg: '', isAuthenticated: true}});
            navigate('TrackListScreen');
        } catch (error) {
            dispatch({type: 'setError', payload: {errMsg: error.response.data.message}});
        }
    };
};

const doRegister = dispatch => {
    return async (fname, lname, email, pass) => {
        try {
            removeError();
            const response = await apiClient.post('auth/register', {
                email: email,
                password: pass,
                lastName: lname,
                firstName: fname,
            });
            if (response.data.status) {
                navigate('LoginScreen');
            } else {
                dispatch({type: 'setError', payload: {errMsg: response.data.message}});
            }
        } catch (error) {
            dispatch({type: 'setError', payload: {errMsg: error.response.data.message}});
        }
    };
};

const tryLocalLogin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        dispatch({type: 'doLogin', payload: {errMsg: '', isAuthenticated: true}});
        navigate('mainFlow')
    } else {
        navigate('authFlow')
    }
};

export const {Context, Provider} =
    createDataContext(
        reducer,
        {doLogin, removeError, doRegister,tryLocalLogin,doLogout},
        {errMsg: '', isAuthenticated: null},
    );

