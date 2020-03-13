/**
 * @jest-environment jsdom
 */
import 'react-native';
import React from 'react';
import AuthLoadingScreen from '../AuthLoadingScreen';
import { API, Auth } from 'aws-amplify';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import * as SecureStore from 'expo-secure-store';
import {
	CognitoUserSession,
	CognitoIdToken,
	CognitoAccessToken,
} from 'amazon-cognito-identity-js';

const idToken = new CognitoIdToken({ IdToken: 'idToken' });
const accessToken = new CognitoAccessToken({ AccessToken: 'accessToken' });

const session = new CognitoUserSession({
	IdToken: idToken,
	AccessToken: accessToken,
});

describe('snapshot testing', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<AuthLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
  });
});

describe('background authenticating', () => {
  test('navigate to home screen', async () => {

    const component = new AuthLoadingScreen();

    // Mimic retrieving stored credentials
    const spyon_store = jest
      .spyOn(SecureStore, 'getItemAsync')
      .mockImplementation(() => {
        return "credential";
      });

    // Force successful signin
    const spyon_signin = jest
      .spyOn(Auth, 'signIn')
      .mockImplementation((authenticationDetails, callback) => {
        callback.onSuccess(session);
      });

    // Mimic returning user from database
    const spyon_api = jest
      .spyOn(API, 'get')
      .mockImplementation(() => {
          return ["user"];
      });

    // Call function for testing
    //component.setState({EmailInputValue: 'email'});
    //component.setState({PasswordInputValue: 'Password1'});
    await component.componentDidMount();

    // Check expected behavior
    expect(spyon_store).toBeCalled();
    expect(spyon_signin).toBeCalled();
    expect(spyon_api).toBeCalled();
    expect.assertions(3);

    spyon_store.mockClear();
    spyon_signin.mockClear();
    spyon_api.mockClear();
  });

  test('navigate to signup screen', async () => {

    const component = new AuthLoadingScreen();

    // Mimic not being able to retrieve stored credentials
    const spyon_store = jest
      .spyOn(SecureStore, 'getItemAsync')
      .mockImplementation(() => {
        return "";
      });

    // Force failure during signin
    const spyon_signin = jest
      .spyOn(Auth, 'signIn')
      .mockImplementation((authenticationDetails, callback) => {
        return new Error('User does not exist');
      });

    // Spy on API call to verify that it doesn't run
    const spyon_api = jest
      .spyOn(API, 'get');

    // Call function for testing
    await component.componentDidMount();

    // Check expected behavior
    expect(spyon_store).toBeCalled();
    expect(spyon_signin).toBeCalled();
    expect(spyon_api).not.toHaveBeenCalled();
    expect.assertions(3);

    spyon_store.mockClear();
    spyon_signin.mockClear();
    spyon_api.mockClear();
  });

  test('navigate to first time setup screen', async () => {

    const component = new AuthLoadingScreen();

    // Mimic retrieving stored credentials
    const spyon_store = jest
      .spyOn(SecureStore, 'getItemAsync')
      .mockImplementation(() => {
        return "credential";
      });

    // Force successful signin
    const spyon_signin = jest
      .spyOn(Auth, 'signIn')
      .mockImplementation((authenticationDetails, callback) => {
        return new Error('User does not exist');
      });

    // Mimic not finding the user in the database
    const spyon_api = jest
      .spyOn(API, 'get')
      .mockImplementation(() => {
          return [];
      });

    // Call function for testing
    await component.componentDidMount();

    // Check expected behavior
    expect(spyon_store).toBeCalled();
    expect(spyon_signin).toBeCalled();
    expect(spyon_api).toBeCalled();
    expect.assertions(3);

    spyon_store.mockClear();
    spyon_signin.mockClear();
    spyon_api.mockClear();
  });

});