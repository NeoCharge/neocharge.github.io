import React from 'react';
import { Dimensions } from 'react-native';
import Car from './CarIcon.svg';
import Appliance from './ApplianceIcon.svg';
import NoOutputRing from './NoOutputRing.svg';
import DualCar from './DualCarIcon.svg';

const kWidth = Dimensions.get('screen').width * .80
const kHeight = Dimensions.get('screen').height * .2

export default {
    images: {
        "Vehicle": <Car width={kWidth} height={kHeight} />,
        "Appliance": <Appliance width={kWidth} height={kHeight} />,
        "Dual": <DualCar width={kWidth} height={kHeight} />,
        "None": <NoOutputRing width={kWidth} height={kHeight} />,
    }
};