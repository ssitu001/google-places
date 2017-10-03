import React, {Component} from 'react';

class Map extends Component {

  componentDidMount() {
    console.log('window.google.maps', window.google.maps.Marker)
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
  }

  render() {
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