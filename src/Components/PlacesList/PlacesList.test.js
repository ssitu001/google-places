import React from 'react';
import toJson from 'enzyme-to-json';

import PlacesList from './PlacesList';
import PlacesListItem from '../PlacesListItem/PlacesListItem';

test('renders PlacesList component with places', () => {
  const places = [{
    name: 'Place1',
    formatted_address: '123 Fake St',
  }, {
    name: 'Place2',
    formatted_address: '456 Fake St',
  }];
  const component = shallow(<PlacesList places={places}/>);
  const tree = toJson(component);

  expect(tree).toMatchSnapshot();
  expect(component.find(PlacesListItem).length).toBe(2);
  expect(component).toHaveLength(1);
});

test('renders PlacesList component with no places', () => {
  const places = [];
  const component = shallow(<PlacesList places={places}/>);
  const tree = toJson(component);
  
  expect(tree).toMatchSnapshot();
  expect(component.find(PlacesListItem).length).toBe(0);
  expect(component).toHaveLength(1);
});