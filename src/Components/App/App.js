import React, { Component } from 'react';

//Components
import SearchPlacesInput from '../SearchPlacesInput/SearchPlacesInput';
import PlacesList from '../PlacesList/PlacesList';

//Assets
import loadingLogo from '../../images/loading_icon.png';
import googleLogo from '../../images/google_places_logo.png';

//CSS
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
      zoom: 14,
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
    if (this.state.markers.length) {
      this.removePreviousMarkers();
    }

    this.getMarkers(places);
    this.setState({ 
      places,
    });
  }

  removePreviousMarkers() {
    this.state.markers.forEach((marker) => {
      marker.setMap(null);
    });

    this.setState({
      markers: [],
    });
  }

  getMarkers(places) {
    const markers = places.map((place) => {
      return this.setMarkers(place)
    });

    this.infoWindow = new window.google.maps.InfoWindow();
    
    this.setState({ markers });
  }

  setMarkers(place, remove) {
    const contentString = `
        <div class="row">
          <div class="col-xs-12">
            <h5>${place.name}</h5>
            <p>${place.formatted_address}</p>
          </div>
        </div>
    `;

    const marker = new window.google.maps.Marker({
      position: place.geometry.location,
      title: place.name,
      map: remove ? null : this.map,
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

  // Post MVP filters
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

    if (openNow) {
      this.filteredPlaces = this.state.places.filter((place) => {
        return place.opening_hours.open_now;
      });
    }

    this.setState({
      filters: {
        openNow: !openNow,
        pricing: pricing,
      }
    });

    this.filterPlaces();
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
    const { openNow, pricing } = this.state.filters;
    let placesToFilter = this.state.places;

    if (openNow && pricing.length) {
      placesToFilter = this.state.places.filter((place) => {
        if (place) {
          if ( pricing.includes(place.price_level) && place.opening_hours.open_now) {
            return place;
          }
        }
      });
    }

    else if (openNow) {
      placesToFilter = this.state.places.filter((place) => {
        return place.opening_hours.open_now
      });
    }

    else if (pricing.length) {
      placesToFilter = this.state.places.filter((place) => {
        if ( pricing.includes(place.price_level) ) {
          return place;
        }
      });
    }
    this.setState({
      filteredPlaces: placesToFilter
    });
  }
  
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={googleLogo} className="app-logo-static" alt="logo" />
          <h1 className="app-title">Welcome to Places</h1>
          <SearchPlacesInput 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit}
          />
        </header>
        <div className="row">
          <div className={`no-padding ${this.state.places.length ? 'col-md-8' : 'col-md-12'}`}>
            <div className="map" ref={(domEl) => {this.mapElementRef = domEl}}>
              <div className="init-loading">
                <img src={loadingLogo} className="app-logo" alt="logo" />
                <h5>Initializing your location...</h5>
              </div>
            </div>
          </div>
            <div className={`no-padding ${this.state.places.length ? 'col-md-4' : ''}`}>
              <PlacesList 
                places={this.state.places}
                displayInfoFromListItem={this.displayInfoFromListItem}
              />
            </div>
          </div>
       </div>
    );
  }
}

export default App;
