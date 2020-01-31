import React from 'react';
import { shallow } from 'enzyme';
import SetupScreen from '../SetupScreen';

describe('SetupScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<SetupScreen />)
            expect(component).toMatchSnapshot()
        });
    });
});