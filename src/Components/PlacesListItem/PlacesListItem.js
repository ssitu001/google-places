import React from 'react';

import './PlacesListItem.css';

const PlacesListItem = ({place, index, displayInfoFromListItem}) => {

  return (
    <div 
      className={`list-group-item ${index % 2 === 0 ? 'list-group-item-alternate' : ''}`}
      onClick={() => displayInfoFromListItem(index)}>
      <h5 className="list-group-item-heading">
        {place.name}
      </h5>
      <p>{place.formatted_address}</p>
    </div>
  )
}

export default PlacesListItem;