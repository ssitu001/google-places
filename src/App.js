import React, { Component } from 'react';
import logo from './logo.svg';

import SearchPlacesInput from './SearchPlacesInput';
// import Map from './Map';
import PlacesList from './PlacesList';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      place: '' ,
      places: [],
      currentLocation: {lat: 37.7749, lng: -122.4194},
      markers: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.displayInfoFromListItem = this.displayInfoFromListItem.bind(this);
  }

  componentDidMount() {
    // if (navigator.geolocation) {
    //   console.log('Geolocation is supported!');
    //   this.currentPosPromise = new Promise((resolve, reject) => {
    //     navigator.geolocation.getCurrentPosition(resolve, reject);
    //   });

    //   this.currentPosPromise 
    //     .then((pos) => {
    //       console.log('pos:::', pos);
    //       this.setState({
    //         currentLocation: {
    //           lat: pos.coords.latitude,
    //           lng: pos.coords.longitude,
    //         }
    //       });
    //     })
    //     .catch((err) => {
    //       console.log('err::::', err);
    //     });

      // navigator.geolocation.getCurrentPosition((position) => {
      //   console.log('position:::', position);
      //   this.currentPosLat = position.coords.latitude;
      //   this.currentPosLon = position.coords.longitude;
      // });
    // }
    // else {
    //   console.log('Geolocation is not supported for this Browser/OS.');
    // }

    this.loadMap();
  }

  loadMap() {
    const center = new window.google.maps.LatLng(this.state.currentLocation.lat, this.state.currentLocation.lng);
    
    const mapOpts = {
      zoom: 12,
      center,
    };

    this.map = new window.google.maps.Map(this.mapElementRef, mapOpts);
  }
  
  handleChange(e) {
    this.setState({ place: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.searchPlaces();
  }

  searchPlaces(place) {
    this.service = new window.google.maps.places.PlacesService(this.map);
    
    const location = new window.google.maps.LatLng(37.7749, -122.4194);
    const placeToQuery = this.state.place;

    const request = {
      location: location,
      query: placeToQuery,
      radius: '100',
    }
    this.service.textSearch(request, (results, status) => {
      if (status === 'OK') {
        console.log('results::', results);
        this.getMarkers(results);
        this.setState({places: [...results]});
      }
    });
  }

  getMarkers(places) {
    this.infoWindow = new window.google.maps.InfoWindow();
    
    const markers = places.map((place) => {
      return this.setMarkers(place);
    });

    this.setState({markers: [...markers]}) 
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

  displayInfoFromListItem(idx) {
    const markersFromState = this.state.markers;

    new window.google.maps.event.trigger(markersFromState[idx], 'click');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SearchPlacesInput handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>

      <div className="container">
        <div className="row">
          <div className="col-xs-8">
            <div className="map" ref={(domEl) => {this.mapElementRef = domEl}}>
              
            </div>
          </div>
          <div className="col-xs-4">
            <PlacesList places={this.state.places} displayInfoFromListItem={this.displayInfoFromListItem}/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
