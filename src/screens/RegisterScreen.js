import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {Context as authContext} from '../context/AuthContext';
import {NavigationEvents} from "react-navigation";

const RegisterScreen = ({navigation}) => {
    const [fName, setFName] = useState('rahul');
    const [fNameErr, setFNameErr] = useState('');
    const [lName, setLName] = useState('george');
    const [lNameERR, setLNameERR] = useState('');
    const [email, setEmail] = useState('rg1@q.com');
    const [emailErr, setEmailErr] = useState('');
    const [password, setPassword] = useState('123456');
    const [passwordErr, setPasswordErr] = useState('');
    const [cPassword, setCPassword] = useState('123456');
    const [cPasswordErr, setCPasswordErr] = useState('');

    const {data, doRegister, removeError} = useContext(authContext);

    const validate = () => {
        setFNameErr('');
        setLNameERR('');
        setEmailErr('');
        setPasswordErr('');
        setCPasswordErr('');
        let valid = true;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (fName.length < 2) {
            setFNameErr('Enter a valid first name');
            valid = false;
        }

        if (lName.length < 2) {
            setLNameERR('Enter a valid last name');
            valid = false;
        }

        if (reg.test(email) === false) {
            setEmailErr('Email is Not Correct');
            valid = false;
        }
        if (!password.length) {
            setPasswordErr('Password is blank');
            valid = false;
        } else {
            if (password.length < 6) {
                setPasswordErr('Password should be at least 6 digits');
                valid = false;
            } else {
                if (!cPassword.length) {
                    setCPasswordErr('Confirm Password is blank');
                    valid = false;
                } else {
                    if (cPassword.length < 6) {
                        setCPasswordErr('Confirm Password should be at least 6 digits');
                        valid = false;
                    } else {
                        if (cPassword !== password) {
                            setPasswordErr('Passwords do not match');
                            setCPasswordErr('Passwords do not match');
                            valid = false;
                        }
                    }
                }
            }
        }
        return valid;
    };


    return (<View style={styles.container}>
        <View style={{flex: 1}}>
            <NavigationEvents onWillFocus={()=>{
                setPasswordErr('')
                setEmailErr('')
                setFNameErr('')
                setLNameERR('')
                setCPasswordErr('')
            }}/>
            <View style={styles.bgTop}/>
            <View style={styles.bgBottem}/>
            <View style={styles.cardStyle}>
                <Text h4 style={styles.headerStyle}>Register</Text>
                <Input
                    value={fName}
                    errorStyle={styles.inputError}
                    inputContainerStyle={
                        styles.inputViewStyle
                    }
                    onChangeText={text => {
                        data.errMsg ? removeError() : null;
                        setFNameErr('');
                        setFName(text);
                    }}
                    errorMessage={fNameErr}
                    placeholder='First Name'/>
                <Input
                    value={lName}
                    errorStyle={styles.inputError}
                    inputContainerStyle={
                        styles.inputViewStyle
                    }
                    onChangeText={text => {
                        data.errMsg ? removeError() : null;
                        setLNameERR('');
                        setLName(text);
                    }}
                    errorMessage={lNameERR}
                    placeholder='Last Name'/>
                <Input
                    value={email}
                    errorStyle={styles.inputError}
                    inputContainerStyle={
                        styles.inputViewStyle
                    }
                    onChangeText={
                        text => {
                            data.errMsg ? removeError() : null;
                            emailErr ? setEmailErr('') : null;
                            setEmail(text);
                        }
                    }
                    errorMessage={emailErr}
                    placeholder='E-mail'/>
                <Input
                    onChangeText={text => {
                        data.errMsg ? removeError() : null;
                        cPasswordErr ? setCPasswordErr('') : null;
                        passwordErr ? setPasswordErr('') : null;
                        setPassword(text);
                    }}
                    errorStyle={styles.inputError}
                    inputContainerStyle={
                        styles.inputViewStyle
                    }
                    value={password}
                    secureTextEntry
                    errorMessage={passwordErr}
                    placeholder='Password'/>
                <Input
                    secureTextEntry
                    value={cPassword}
                    errorStyle={styles.inputError}
                    inputContainerStyle={
                        styles.inputViewStyle
                    }
                    onChangeText={text => {
                        data.errMsg ? removeError() : null;
                        cPasswordErr ? setCPasswordErr('') : null;
                        passwordErr ? setPasswordErr('') : null;
                        setCPassword(text);
                    }}
                    errorMessage={cPasswordErr}
                    placeholder='Confirm Password'/>
                {data.errMsg ? <Text style={{color: 'red', marginTop: 10}}>{data.errMsg}</Text> : null}
                <Button
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.buttonStyle}
                    onPress={event => {
                        if (validate()) {
                            doRegister(fName, lName, email, password);
                        }
                    }}
                    title='Register'/>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                    <Text>Already have an account</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('LoginScreen');
                    }}><Text style={styles.linkStyle}>Login</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    </View>);
};

RegisterScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    bgTop: {
        position: 'relative',
        backgroundColor: 'white',
        flex: 3,
    },
    bgBottem: {
        position: 'relative',
        backgroundColor: 'purple',
        flex: 2,
    },
    cardStyle: {
        bottom: 80,
        alignItems: 'center',
        position: 'absolute',
        left: 30,
        right: 30,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    container: {
        flex: 1,
    },
    headerStyle: {
        paddingTop: 10,
        alignSelf: 'center',
    },
    inputViewStyle: {
        borderRadius: 5,
        borderColor: 'purple',
        borderWidth: 1.5,
        marginTop: 10,
        paddingHorizontal: 5
    },
    inputError: {
        color: 'red',
        marginVertical: 1,
    },
    buttonStyle: {
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'purple',
        alignSelf: 'baseline',
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonTitleStyle: {
        fontSize: 20,
    },
    linkStyle: {
        paddingStart: 10,
        paddingEnd: 10,
        color: 'blue',
        fontWeight: 'bold'
    },
});

export default RegisterScreen;
