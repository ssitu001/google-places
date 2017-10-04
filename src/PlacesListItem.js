import React from 'react';

const PlacesListItem = ({place}) => {
  console.log('place', place.name)
  return (
    <div>
      Place: {place.name}
    </div>
  )
}

export default PlacesListItem;