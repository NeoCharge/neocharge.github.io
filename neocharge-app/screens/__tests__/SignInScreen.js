/**
 * @jest-environment jsdom
 */
import 'react-native';
import React from 'react';
import SignInScreen from '../SignInScreen';
import { Auth } from 'aws-amplify';
import { mount, shallow, } from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {
	CookieStorage,
	CognitoUserPool,
	CognitoUser,
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
/*
const user = new CognitoUser({
  Username: 'username',
  Pool: userPool,
});
*/

const signin_screen = require('../SignInScreen');

describe('snapshot testing', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<SignInScreen />).toJSON();
      expect(tree).toMatchSnapshot();
  });
});

describe('signIn', () => {
  test('successful case', async () => {

    const component = new SignInScreen();

    // Force valid input
    const spyon1 = jest
      .spyOn(component, 'checkValidInput')
      .mockImplementation((authenticationDetails, callback) => {
        return true;
      });

    // Force successful signin
    const spyon2 = jest
      .spyOn(Auth, 'signIn')
      .mockImplementation((authenticationDetails, callback) => {
        callback.onSuccess(session);
      });

    // Spy on error handling to verify it doesn't run
    const spyon3 = jest
      .spyOn(component, 'handleErrors');

    // Call function for testing
    component.setState({EmailInputValue: 'email'});
    component.setState({PasswordInputValue: 'Password1'});
    await component.SignIn();

    // Check expected behavior
    expect(spyon1).toBeCalled();
    expect(spyon2).toBeCalled();
    expect(spyon3).not.toHaveBeenCalled();
    expect.assertions(3);

    spyon1.mockClear();
    spyon2.mockClear();
    spyon3.mockClear();
  });

  test('invalid input case', async () => {

    const component = new SignInScreen();

    // Force invalid input
    const spyon1 = jest
      .spyOn(component, 'checkValidInput')
      .mockReturnValue(false);

    // Spy on signin to verify it doesn't run
    const spyon2 = jest
      .spyOn(Auth, 'signIn')

    // Spy on error handling to verify it doesn't run
    const spyon3 = jest
      .spyOn(component, 'handleErrors');

    // Call function for testing
    component.setState({EmailInputValue: ''});
    component.setState({PasswordInputValue: ''});
    await component.SignIn();

    // Check expected behavior
    expect(spyon1).toBeCalled();
    expect(spyon2).not.toHaveBeenCalled();
    expect(spyon3).not.toHaveBeenCalled();
    expect.assertions(3);

    spyon1.mockClear();
    spyon2.mockClear();
    spyon3.mockClear();
  });

  test('failed authentication case', async () => {

    const component = new SignInScreen();

    // Force valid input
    const spyon1 = jest
      .spyOn(component, 'checkValidInput')
      .mockImplementation((authenticationDetails, callback) => {
        return true;
      });

    // Throw error on signin
    const spyon2 = jest
      .spyOn(Auth, 'signIn')
      .mockImplementation((authenticationDetails, callback) => {
        throw new Error();
      });

    // Spy on error handling to verify it runs
    const spyon3 = jest
      .spyOn(component, 'handleErrors');

    // Call function for testing
    component.setState({EmailInputValue: 'email'});
    component.setState({PasswordInputValue: 'Password1'});
    await component.SignIn();

    // Check expected behavior
    expect(spyon1).toBeCalled();
    expect(spyon2).toBeCalled();
    expect(spyon3).toBeCalled();
    expect.assertions(3);

    spyon1.mockClear();
    spyon2.mockClear();
    spyon3.mockClear();
  });


});