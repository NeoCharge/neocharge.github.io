import React from 'react';
import { shallow } from 'enzyme';
import SetupScreen from '../SetupScreen';
import OnboardingInput from '../../components/OnboardingInput';
import OnboardingLogo from '../../components/OnboardingLogo';

describe('<SetupScreen />', () => {
    it('renders one <OnboardingInput /> component', () => {
      const wrapper = shallow(<SetupScreen />);
      expect(wrapper.find(OnboardingInput)).to.have.lengthOf(1);
    });
  
    it('renders one <OnboardingLogo /> component', () => {
      const wrapper = shallow(<SetupScreen />);
      expect(wrapper.find(OnboardingLogo)).to.have.lengthOf(1);
    });
  
    //it('renders children when passed in', () => {
      //const wrapper = shallow((
        //<SetupScreen>
          //<div className="unique" />
        //</SetupScreen>
      //));
      //expect(wrapper.contains(<div className="unique" />)).to.equal(true);
    //});
  
    it('simulates click events', () => {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(<Button title="Continue" onPress={this.logOnboardingInfo} />);
      wrapper.find('button').simulate('click');
      expect(onPress).to.have.property();
    });
  });