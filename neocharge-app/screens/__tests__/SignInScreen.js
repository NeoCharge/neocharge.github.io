import 'react-native';
import React from 'react';
import SignInScreen from '../SignInScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


it('renders correctly', () => {
     const tree = renderer.create(<SignInScreen />).toJSON();
       expect(tree).toMatchSnapshot();
});
