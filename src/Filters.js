import React from 'react';

const Filters = ({displayAll, displayOpenNow, filterPrice}) => {
  const pricingButtons = ['$', '$$', '$$$', '$$$$'].map((price, i) => 
    <button
      onClick={() => filterPrice(i+1)}
      key={i}>
      {price}
    </button>
  );

  return (
    <div>
      <button onClick={() => displayAll()}>All</button>
      <button onClick={() => displayOpenNow()}>Open Now</button>
      {pricingButtons}
    </div>
  )
}

export default Filters;