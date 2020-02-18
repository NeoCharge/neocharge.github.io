import React from 'react';
import {shallow} from 'enzyme';
import OnboardingLogo from '../OnboardingLogo';

describe('OnboardingLogo', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<OnboardingLogo />);
            expect(component).toMatchSnapshot();
        });
    });
});