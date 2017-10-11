import React from 'react';

import PlacesListItem from '../PlacesListItem/PlacesListItem';

import './PlacesList.css';

const PlacesList = ({places, displayInfoFromListItem}) => {

  return (
    <div className="list-group places-content">
      {places.length ? places.map((place, i) =>
        <PlacesListItem 
          key={i} 
          index={i} 
          place={place} 
          displayInfoFromListItem={displayInfoFromListItem}
        />
      ) : null}
    </div>
  )
}

export default PlacesList;