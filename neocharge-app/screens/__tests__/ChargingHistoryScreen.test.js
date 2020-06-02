import React from 'react';
import { shallow } from 'enzyme';
import ChargingHistoryScreen from '../ChargingHistoryScreen';

describe('ChargeHistoryScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<ChargingHistoryScreen />);
            expect(component).toMatchSnapshot();
        });
    });

    describe('test that day listener filters correct data', () => {
        it('should not change the state', () => {
            const component = shallow(<ChargingHistoryScreen />);
            const instance = component.instance();
            const testJsonLog =
                [
                    {
                        "deviceId": "testId1",
                        "chargeLogId": 797,
                        "duration": 900224,
                        "priPower": 198,
                        "secPower": 200,
                        "eventCode": 3,
                        "startTime": "2019-11-03 11:33:18"
                    }
                ]
            component.setState({
                jsonDeviceLogsTimes: testJsonLog
            });

            spyOn(instance, 'dayListener').and.callThrough();
            instance.dayListener()
            expect(component.state().graphData).toEqual([]);
        });

        it('should change the state', () => {
            const component = shallow(<ChargingHistoryScreen />);
            const instance = component.instance();
            const testJsonLog =
                [
                    {
                        "deviceId": "testId1",
                        "chargeLogId": 797,
                        "duration": 900224,
                        "priPower": 198,
                        "secPower": 200,
                        "eventCode": 3,
                        "startTime": "2019-12-03 11:13:00"
                    }
                ]
            component.setState({
                jsonDeviceLogsTimes: testJsonLog
            });

            spyOn(instance, 'dayListener').and.callThrough();
            instance.dayListener()
            expect(component.state('graphData')).toEqual(testJsonLog);
        });
    });
});

