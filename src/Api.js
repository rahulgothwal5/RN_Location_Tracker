import Axios from 'axios';
import {AsyncStorage} from 'react-native';

const instance = Axios.create(
    {
        baseURL: 'http://192.168.0.106:3010/demoapp',
    },
);

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token
        }
        return config
    }
    ,
    (err) => {
        return Promise.reject(err);
    }
);

export default instance