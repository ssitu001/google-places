import React, { Component } from 'react';
import logo from './logo.svg';

import SearchPlacesInput from './SearchPlacesInput';
import PlacesList from './PlacesList';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      place: '' ,
      places: [],
      currentLocation: {lat: null, lng: null},
      markers: [],
    };
  }

  componentDidMount() {
    this.setUserLocation();
  }

  setUserLocation() {
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
      const currentPosPromise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return currentPosPromise 
        .then((pos) => {
          this.setState({
            currentLocation: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }
          });
        })
        .then(() => {
          this.loadMap();
        })
        .catch((err) => {
          console.log('err::::', err);
        });
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }
  }

  loadMap() {
    const center = new window.google.maps.LatLng(this.state.currentLocation.lat, this.state.currentLocation.lng);
    
    const mapOpts = {
      zoom: 12,
      center,
    };

    this.map = new window.google.maps.Map(this.mapElementRef, mapOpts);
  }
  
  handleChange = (e) => {
    this.setState({ place: e.target.value });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.searchPlaces();
  }

  searchPlaces() {
    const placesService = new window.google.maps.places.PlacesService(this.map);
    const location = new window.google.maps.LatLng(this.state.currentLocation.lat, this.state.currentLocation.lng);
    const placeToQuery = this.state.place;
    const cachedResults = JSON.parse(localStorage.getItem(placeToQuery));
    const request = {
      location: location,
      query: placeToQuery,
      radius: '100',
    }

    // validate input
    if (!placeToQuery) {
      return;
    }

    console.log('cachedResults', cachedResults)
    if (cachedResults) {
      this.displayResults(cachedResults)
    } else {
      placesService.textSearch(request, (results, status) => {
        if (status === 'OK') {
          console.log('results::', results);
          this.cacheResults(request.query, results);
        } else {
          console.log('error yo')
        }
      });
    }
  }

  cacheResults(query, results) {
    localStorage.setItem(query, JSON.stringify(results));
    this.displayResults(results);
  }

  displayResults(places) {
    this.getMarkers(places);
    this.setState({ places });
  }

  getMarkers(places) {
    const markers = places.map((place) => this.setMarkers(place));
    this.infoWindow = new window.google.maps.InfoWindow();
    
    this.setState({ markers });
  }

  setMarkers(place) {
    const contentString = `
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div>${place.formatted_address}</div>
          </div>
        </div>
      </div>
    `;

    const marker = new window.google.maps.Marker({
      position: place.geometry.location,
      title: place.name,
      map: this.map,
    });

    new window.google.maps.event.addListener(marker, 'click', () => {
      this.infoWindow.close();
      this.infoWindow.setContent(contentString);
      this.infoWindow.open(this.map, marker);
    })

    return marker;

  }

  displayInfoFromListItem = (idx) => {
    const { markers } = this.state;

    new window.google.maps.event.trigger(markers[idx], 'click');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SearchPlacesInput 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
        />

      <div className="container">
        <div className="row">
          <div className="col-xs-8">
            <div className="map" ref={(domEl) => {this.mapElementRef = domEl}}>
              
            </div>
          </div>
          <div className="col-xs-4">
            <PlacesList 
              places={this.state.places} 
              displayInfoFromListItem={this.displayInfoFromListItem}
            />
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
