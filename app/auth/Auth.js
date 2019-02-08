import React, { Component } from 'react';
import { Alert } from 'react-native';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import { Page, Button, ButtonContainer, Heading } from './authComponents';
import { AsyncStorage } from 'react-native';


export default class AuthView extends Component<{}, State> {

  authorize = async () => {
    try {
      const authState = await authorize(config);
      AsyncStorage.setItem('authState', JSON.stringify(authState));
      this.props.navigation.navigate('App')
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  };

  render() {
    return (
      <Page>
        <Heading>Hello, stranger</Heading>
        <ButtonContainer>
          <Button onPress={this.authorize} text="Authorize" color="#DA2536" />
        </ButtonContainer>
      </Page>
    );
  }
}
