import React from 'react';


import './Filters.css';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

const Filters = ({displayAll, displayOpenNow, filterPrice, openNowButtonActive, filterButtonsActive}) => {
  const pricingButtons = ['$', '$$', '$$$', '$$$$'].map((price, i) => 
    <Button
      bsSize="small"
      onClick={() => filterPrice(i+1)}
      key={i}
      className={filterButtonsActive.includes(i+1) ? 'button-active' : ''}>
      {price}
    </Button>
  );

  console.log('openNowButtonActive', openNowButtonActive)
  return (
    <ButtonToolbar>
      <ButtonGroup>
        <Button
          bsSize="small"
          onClick={() => displayAll()}
          className={openNowButtonActive || filterButtonsActive.length ? '' : 'button-active'}>
          All
        </Button>
        <Button
          bsSize="small" 
          onClick={() => displayOpenNow()}
          className={openNowButtonActive ? 'button-active' : ''}>
          Open Now
        </Button>
        {pricingButtons}
      </ButtonGroup>
    </ButtonToolbar>
  )
}

export default Filters;