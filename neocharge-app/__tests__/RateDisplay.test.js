import React from 'react';
import { shallow } from 'enzyme';
import RateDisplay from '../RateDisplay';

describe('RateDisplay', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<RateDisplay data="" />)
            expect(component).toMatchSnapshot()
        });
    });
});