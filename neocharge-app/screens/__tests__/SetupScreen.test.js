import React from 'react';
import { shallow } from 'enzyme';
import SetupScreen from '../SetupScreen';

describe('SetupScreen', () => {
    describe('Rendering', () => {

        it('should match to snapshot', () => {
            const component = shallow(<SetupScreen />);
            //component.setProps({});
            component.setState({
                deviceID: 'testing',
                timeZone: 'PST',
                primaryDevice: 'Vehicle',
                secondaryDevice: 'Washer/Dryer'
            });
            expect(component).toMatchSnapshot();
        });
    });
});