import React from 'react';
import { ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const SearchPlacesInput = ({handleSubmit, handleChange}) => {

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl 
          type="text"
          placeholder="Search"
          onChange={handleChange}
          required
        />
      </FormGroup>
    {' '}
    </Form>
  )
}

export default SearchPlacesInput;