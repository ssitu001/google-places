import React from 'react';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';

import App from './App';
import SearchPlacesInput from '../SearchPlacesInput/SearchPlacesInput';
import PlacesList from '../PlacesList/PlacesList';
import PlacesListItem from '../PlacesListItem/PlacesListItem';

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

test('it should display full map when there are no places', () => {
  const component = shallow(<App />);
  component.setState({
    places: [],
  });
  
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('it should display partial map when there are places', () => {
  const component = shallow(<App />);
  component.setState({
    places: [{}, {}, {}],
  });
  
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});