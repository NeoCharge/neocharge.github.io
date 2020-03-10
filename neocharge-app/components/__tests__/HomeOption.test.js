import React from 'react';
import { shallow } from 'enzyme';
import HomeOption from '../HomeOption';
import { Colors } from '../../assets/Colors';

describe('HomeOption', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<HomeOption />)
            expect(component).toMatchSnapshot()
        });
    });

    describe('Press Touchable Opacity', () => {
        it('should navigate to ChargingHistory', () => {
            const navigation = { navigate: jest.fn() };
            const spy = jest.spyOn(navigation, 'navigate')
            const wrapper = shallow(
                <HomeOption
                    nav={navigation}
                    screenName={'ChargingHistory'}
                    error={{}}
                    onLogin={jest.fn()}
                />,
            )
            wrapper.find('TouchableOpacity').props().onPress()
            expect(spy).toBeCalledWith('ChargingHistory')
        });
    });

    // describe('Press Touchable Opacity, return false', () => {
    //     const navigation = { navigate: jest.fn() };
    //     const spy = jest.spyOn(navigation, 'navigate')
    //     const wrapper = shallow(
    //         <HomeOption
    //             nav={navigation}
    //             screenName={'SchedulingHome'}
    //             error={{}}
    //             onLogin={jest.fn()}
    //         />,
    //     )
    //     wrapper.find('TouchableOpacity').props().onPress()
    //     expect(spy).not.toBeCalledWith('ChargingHistory')
    // })

    // describe('Check Colors', () => {
    //     it('should be the correct color', () => {
    //         const black = Colors.secondary

    //     });
    // });
});

