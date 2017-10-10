import React, { Component } from 'react';
import logo from './logo.svg';

import SearchPlacesInput from './SearchPlacesInput';
import PlacesList from './PlacesList';
import Filters from './Filters';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      place: '',
      places: [],
      currentLocation: {lat: null, lng: null},
      markers: [],
      filters: {
        openNow: false,
        pricing: [],
      },
      filteredPlaces: [],
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

  searchPlaces(distance) {
    this.placesService = new window.google.maps.places.PlacesService(this.map);
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

    if (cachedResults) {
      this.displayResults(cachedResults)
    } else {
      this.placesService.textSearch(request, (results, status) => {
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
    // const { pricing } = this.state.filters;
    const markers = places.map((place) => {
      return this.setMarkers(place)
    });

    this.infoWindow = new window.google.maps.InfoWindow();
    
    this.setState({ markers });
  }

  setMarkers(place) {
    const contentString = `
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h5>${place.name}</h5>
            <p>${place.formatted_address}</p>
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

  displayAll = () => {
    this.setState({
      filters: {
        openNow: false,
        pricing: [],
      }
    });
  }

  displayOpenNow = () => {
    const { openNow, pricing } = this.state.filters;
    // this.getMarkers([]);

    if (openNow) {
      this.filteredPlaces = this.state.places.filter((place) => {
        return place.opening_hours.open_now;
      });
      this.getMarkers(this.filteredPlaces);
    }

    this.setState({
      filters: {
        openNow: !openNow,
        pricing: pricing,
      }
    });
  }

  filterPrice = (price) => {
    const { pricing } = this.state.filters;

    if ( pricing.includes(price) ) {
      this.setState({
        filters: {
          openNow: this.state.filters.openNow,
          pricing: pricing.filter((priceInState) => priceInState !== price),
        }
      })
    } else {
      this.setState({
        filters: {
          openNow: this.state.filters.openNow,
          pricing: [...pricing, price],
        }
      });
    }
  }

  filterPlaces() {
    console.log('test Func called');
    const { openNow, pricing } = this.state.filters;
    this.placesToFilter = this.state.places;
    console.log('pricing', pricing)
    if (openNow && pricing.length) {
      this.placesToFilter = this.state.places.filter((place) => {
        if (place) {
          if ( pricing.includes(place.price_level) && place.opening_hours.open_now) {
            return place;
          }
        }
      });
    }

    else if (openNow) {
      this.placesToFilter = this.state.places.filter((place) => {
        return place.opening_hours.open_now
      });
    }

    else if (pricing.length) {
      this.placesToFilter = this.state.places.filter((place) => {
        if ( pricing.includes(place.price_level) ) {
          return place;
        }
      });
    }

    console.log('this.placesToFilter==', this.placesToFilter)
  }
  
  render() {
    console.log('this.state', this.state.filters)
    this.filterPlaces();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Places</h1>
        </header>

        <div className="container">
          <div className="row row-margin">
            <div className="col-md-8">
              <SearchPlacesInput 
                handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}
              />
            </div>
            <div className="col-md-4">
            {this.placesToFilter.length 
              ? <Filters 
                displayAll={this.displayAll}
                displayOpenNow={this.displayOpenNow}
                filterPrice={this.filterPrice}
                openNowButtonActive={this.state.filters.openNow}
                filterButtonsActive={this.state.filters.pricing}/>
              : null
            }
            </div>
          </div>
          <div className="row row-margin">
            <div className="col-md-8">
              <div className="map" ref={(domEl) => {this.mapElementRef = domEl}}>
              <div>
                <img src={logo} className="App-logo" alt="logo" />
                <h5>Initializing your location...</h5>
              </div>
              </div>
            </div>
            <div className="col-md-4">
              <PlacesList 
                places={this.placesToFilter}
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
