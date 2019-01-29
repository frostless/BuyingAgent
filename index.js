/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { AsyncStorage } from 'react-native';
import { refresh } from 'react-native-app-auth';

const config = {
    issuer: 'https://identity.buyingagentapp.com',
    clientId: 'buyingAgent native',
    // clientSecret: '123',
    redirectUrl: 'app.buyingagent:/oauthredirect',
    additionalParameters: {},
    scopes: ['buyingAgentAPI', 'offline_access'],
    dangerouslyAllowInsecureHttpRequests: true //should not used in production
};


global.apiURL = 'https://api.buyingagentapp.com'
// global.apiURL = 'http://192.168.1.7:8001'
global.token = async (navigation) => {
    let authState = JSON.parse(await AsyncStorage.getItem('authState'));
    let accessTokenExpirationDate = new Date(authState['accessTokenExpirationDate']);
    let accessToken = authState['accessToken'];
    let refreshTokenState;
    accessTokenExpirationDate = accessTokenExpirationDate.getTime();
    if (accessTokenExpirationDate < Date.now()) {
        try {
            refreshTokenState = await refresh(config, {
                refreshToken: authState['refreshToken']
            });
        }
        catch{
            navigation.navigate('Auth')
            return false;
        }
        accessToken = refreshTokenState['accessToken']
        AsyncStorage.setItem('authState', JSON.stringify(refreshTokenState));
    }
    return accessToken;
}

AppRegistry.registerComponent(appName, () => App);
