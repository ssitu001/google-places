import React from 'react';
import toJson from 'enzyme-to-json';

import SearchPlacesInput from './SearchPlacesInput';

test('renders SearchPlacesInput component as expected', () => {
  const component = shallow(<SearchPlacesInput />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});