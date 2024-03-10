import React, {useState, useContext, useEffect} from 'react';
import {Context as authContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {
    const { tryLocalLogin} = useContext(authContext);
    useEffect(()=>{
        tryLocalLogin()
    },[])

    return null
};

export default ResolveAuthScreen;
