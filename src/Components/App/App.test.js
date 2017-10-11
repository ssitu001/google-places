import React from 'react';
import toJson from 'enzyme-to-json';

import App from './App';
import SearchPlacesInput from '../SearchPlacesInput/SearchPlacesInput';
import PlacesList from '../PlacesList/PlacesList';

test('renders App component as expected', () => {
  const component = shallow(<App />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('it contains the <SearchPlacesInput /> component', () => {
  const component = mount(<App />);
  expect(component.find(SearchPlacesInput).length).toEqual(1);
});

test('it contains the <PlacesList /> component', () => {
  const component = mount(<App />);
  expect(component.find(PlacesList).length).toEqual(1);
});

test('it renders props correctly', () => {
  const component = shallow(<App test='test'/>);
  expect(component.instance().props.test).toBe('test');
});

test('it should have an element to display the map', () => {
  const component = shallow(<App />);
  expect(component.find('.map').length).toEqual(1);
});
