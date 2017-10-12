import React from 'react';
import toJson from 'enzyme-to-json';
import PlacesListItem from './PlacesListItem';

const place = {
  name: 'Place1',
  formatted_address: '123 Fake St',
};

test('renders PlacesListItem component as expected', () => {
  const component = shallow(<PlacesListItem place={place}/>);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('render PLaceListItem with alternate background', () => {
  const component = shallow(<PlacesListItem place={place} index={0}/>);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();  
});

test('render PLaceListItem with no background', () => {
  const component = shallow(<PlacesListItem place={place} index={1}/>);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();  
});