import React from 'react';
import toJson from 'enzyme-to-json';

import App from './App';
import SearchPlacesInput from '../SearchPlacesInput/SearchPlacesInput';
import PlacesList from '../PlacesList/PlacesList';
import PlacesListItem from '../PlacesListItem/PlacesListItem';

describe('<App />', () => {
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

  test('it should display error message when unable to find user location', () => {
    const component = shallow(<App />);
    component.setState({
      errorLocation: true,
    });

    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  test('it should display error message when unable to find results', () => {
    const component = shallow(<App />);
    component.setState({
      errorResults: true,
    });
    
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  test('it should not display spinner and initializing message when unable to find results or user location', () => {
    const component = shallow(<App />);
    component.setState({
      errorResults: true,
      errorLocation: false,
    });
    
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  test('it should not display spinner and initializing message when unable to find results or user location', () => {
    const component = shallow(<App />);
    component.setState({
      errorResults: false,
      errorLocation: true,
    });
    
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  describe('handleChange', () => {
    test('it should set correct place on user input', () => {
      const eventMock = {
        target: {
          value: 'test',
        }
      };
      const component = shallow(<App />);
      component.instance().handleChange(eventMock);
      expect(component.state().place).toEqual('test');
    }); 
  })

  describe('handleSubmit', () => {
    test('it should call correctly handleSubmit and searchPlaces', () => {
      const component = shallow(<App />);
      const eventMock = {
        preventDefault: jest.fn(),
      };
      const searchPlacesSpy = jest.spyOn(component.instance(), 'searchPlaces');
    
      localStorage.getItem.mockReturnValueOnce(JSON.stringify([{place: 'place1'}]));
      
      component.instance().handleSubmit(eventMock);
      
      expect(eventMock.preventDefault).toHaveBeenCalled();
      expect(searchPlacesSpy).toHaveBeenCalled();
    
      searchPlacesSpy.mockReset();
      searchPlacesSpy.mockRestore();
    });
  });
});
