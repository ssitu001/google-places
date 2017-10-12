import Enzyme, { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

//Stubs
global.google = {
  maps: {
    places: {
      PlaceServices: () => {},
    },
    LatLng: () => {},
  },
};
global.localStorage = {
  getItem: jest.fn(),
}