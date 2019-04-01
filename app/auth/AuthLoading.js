import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default class AuthLoadingView extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    IsTokenReadyAsync = async () => {
        let authState, accessTokenExpirationDate, refreshTokenState;
        try {
            authState = await AsyncStorage.getItem('authState');
            if (authState === null)
                return true;
            authState = JSON.parse(authState);
            accessTokenExpirationDate = new Date(authState['accessTokenExpirationDate']);
            accessTokenExpirationDate = accessTokenExpirationDate.getTime();
        } catch (error) {
            return true;
        }

        if (accessTokenExpirationDate < Date.now()) {
            try {
                refreshTokenState = await refresh(config, {
                    refreshToken: authState['refreshToken']
                });
                await AsyncStorage.setItem('authState', JSON.stringify(refreshTokenState));
            }
            catch {
                return true;
            }
        }
        return false;
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.

        const isAuthNeeded = await(this.IsTokenReadyAsync());   
        this.props.navigation.navigate(isAuthNeeded ? 'Auth' : 'App');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View pointEvents='none' style={styles.indicator}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#F5FCFF88',
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})


