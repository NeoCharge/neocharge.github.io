import React from 'react';
import {shallow} from 'enzyme';
import OnboardingInput from '../OnboardingInput';

describe('OnboardingInput', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<OnboardingInput />);
            component.setProps({});
            component.setState({});
            expect(component).toMatchSnapshot();
        });
    });
});