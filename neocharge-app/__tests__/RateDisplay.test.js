import React from 'react';
import { shallow } from 'enzyme';
import RateDisplay from '../components/RateDisplay';
import FakeData from './RateDisplay.json';

describe('RateDisplay', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<RateDisplay {...FakeData} />)
            expect(component).toMatchSnapshot()
        });
    });
});

describe('getTotalCharge function', () => {
    it('should return correct numbers', () => {
        const wrapper = shallow(<RateDisplay {...FakeData} />)
        expect(wrapper.instance().getTotalCharge()).toEqual(3000)
    });
});