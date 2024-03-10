import React, {useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {Context as authContext} from '../context/AuthContext';
import RegisterScreen from './RegisterScreen';
import {NavigationEvents} from "react-navigation";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('rahul.gothwal@ranosys.com');
    const [emailErr, setEmailErr] = useState('');
    const [password, setPassword] = useState('1234567891');
    const [passwordErr, setPasswordErr] = useState('');

    const {data, doLogin, removeError} = useContext(authContext);

    const validate = () => {
        setEmailErr("");
        setPasswordErr("");
        let valid = true;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
            }
        }
        return valid;
    };
    return (<View style={styles.container}>
        <View style={{flex: 1}}>
            <NavigationEvents onWillFocus={()=>{
                setPasswordErr('')
                setEmailErr('')
            }}/>
            <View style={styles.bgTop}/>
            <View style={styles.bgBottem}/>
            <View style={styles.cardStyle}>
                <Text h4 style={styles.headerStyle}>Login</Text>
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
                            passwordErr ? setPasswordErr('') : null;
                            setEmail(text);
                        }
                    }
                    errorMessage={emailErr}
                    placeholder='E-mail'/>
                <Input
                    onChangeText={text => {
                        data.errMsg ? removeError() : null;
                        emailErr ? setEmailErr('') : null;
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
                {data.errMsg ? <Text style={{color: 'red', marginTop: 10}}>{data.errMsg}</Text> : null}
                <Button
                    onPress={
                        event => {
                            if (validate()) {
                                doLogin(email, password);
                            }
                        }
                    }
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.buttonStyle}
                    title='Login'/>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                    <Text>Don't have an account yet ?</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('RegisterScreen');
                    }}><Text style={styles.linkStyle}>Register</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    </View>);
};

LoginScreen.navigationOptions = () => {
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
        bottom: 180,
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
        fontWeight: 'bold',
    },
});


export default LoginScreen;
