import React from 'react';

const PlacesListItem = ({place, index, displayInfoFromListItem}) => {

  return (
    <div className="list-group-item" onClick={() => displayInfoFromListItem(index)}>
      <h5 className="list-group-item-heading">
        {place.name}
      </h5>
      <p>{place.formatted_address}</p>
    </div>
  )
}

export default PlacesListItem;