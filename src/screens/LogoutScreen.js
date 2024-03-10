import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from "react-native-elements";
import {Context as authContext} from "../context/AuthContext";
import {SafeAreaView} from "react-navigation";
import { MaterialIcons } from '@expo/vector-icons';

const LogoutScreen = () => {

    const {doLogout} = useContext(authContext);

    return (
        <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
        <Button
            onPress={()=>{
                doLogout()
            }
            }
            titleStyle={styles.buttonTitleStyle}
            buttonStyle={styles.buttonStyle}
            title='Logout'/>
        </SafeAreaView>);
};

LogoutScreen.navigationOptions={
    title :'Account',
    tabBarIcon:<MaterialIcons name="account-circle" size={20} color="black" />
};

const styles = StyleSheet.create({
    buttonStyle: {
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: 'purple',
        alignSelf: 'center',
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonTitleStyle: {
        fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent:'center'
    },
});

export default LogoutScreen;
