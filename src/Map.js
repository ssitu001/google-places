import React, {Component} from 'react';

class Map extends Component {

  componentDidMount() {
    console.log('window.google.maps', window.google.maps.places)
    if (!window.google.maps.places) {
      throw new Error('Google Maps Place Library not loaded correctly');
    }

    const mapOpts = {
      zoom: 12,
      center: {
        lat: 37.7749,
        lng: -122.4194,
      },
    };

    
    this.map = new window.google.maps.Map(this.mapElementRef, mapOpts);

    const markerOpts = {
      map: this.map,
      position: {
        lat: 37.7749,
        lng: -122.4194,
      },
    };

    this.marker = new window.google.maps.Marker(markerOpts);

    this.service = new window.google.maps.places.PlacesService(this.map);

    const location = new window.google.maps.LatLng(37.7749, -122.4194);
    const request = {
      location: location,
      query: 'pizza',
      radius: '100',
    }
    this.service.textSearch(request, (results, status) => {
      if (status === 'OK') {
        console.log('results::', results);
      }
    })
  }

  render() {
    console.log('map', this.props.place)
    const mapStyle = {
      height: 500,
      width: 500,
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="map" style={mapStyle} ref={(domEl) => {this.mapElementRef = domEl}}>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Map;