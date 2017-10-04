import React from 'react';

import PlacesListItem from './PlacesListItem';

const PlacesList = (props) => {
  
  const placesList = props.places.map((place, i) =>
    <PlacesListItem key={i} place={place}/>
  );

  return (
    <div>
      {placesList}
    </div>
  )
}

export default PlacesList;