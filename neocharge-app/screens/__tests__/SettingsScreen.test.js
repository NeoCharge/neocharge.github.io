import React from 'react';
import { shallow } from 'enzyme';
import SettingsScreen from '../SettingsScreen';

describe('SettingsScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<SettingsScreen data="" />)
            expect(component).toMatchSnapshot()
        });
    });
});