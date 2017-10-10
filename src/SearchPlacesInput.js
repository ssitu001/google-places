import React from 'react';
import { ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const SearchPlacesInput = ({handleSubmit, handleChange}) => {

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl 
          type="text"
          placeholder="Search Place Here..."
          onChange={handleChange}
          required
        />
      </FormGroup>
    {' '}
      <Button type="submit">
        Search
      </Button>
    </Form>
  )
}

export default SearchPlacesInput;