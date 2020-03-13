import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NativeModules } from 'react-native';
import RNCNetInfoMock from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('@react-native-community/netinfo', () => RNCNetInfoMock);
Enzyme.configure({ adapter: new Adapter() });
