import React from 'react';

const SearchPlacesInput = ({handleSubmit, handleChange}) => {

  return (
    <div className="row">
      <div className="col-md-12">
        <form className="form-inline" onSubmit={handleSubmit}>
          <input type="text"
            className="form-control input-md"
            onChange={handleChange}
            id="place"
            placeholder="Search"
            required/>
        </form>
      </div>
    </div>
  )
}

export default SearchPlacesInput;