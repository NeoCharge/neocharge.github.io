import React from 'react';
import { Dimensions, Image } from 'react-native';
import Car from './CarIcon.svg';
import Appliance from './ApplianceIcon.svg';
import NoOutputRing from './NoOutputRing.svg';
import DualCar from './DualCarIcon.svg';

const kWidth = Dimensions.get('screen').width * .80
const kHeight = Dimensions.get('screen').height * .2

export default {
    images: {
        "EV": <Car width={kWidth} height={kHeight} />,
        "Appliance": <Image source={require('./Appliance-with-Ring.png')} />,
        "Dual": <DualCar width={kWidth} height={kHeight} />,
        "None": <NoOutputRing width={kWidth} height={kHeight} />,
    }
};