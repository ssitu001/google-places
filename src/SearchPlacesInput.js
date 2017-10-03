import React, {Component} from 'react';

class SearchPlacesInput extends Component {
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <form className="form-inline">
              {/* <label>Search</label> */}
              <input type="text"
                className="form-control input-lg"
                id="place"
                placeholder="Search here..."
                required/>
                <button type="submit" className="btn btn-default btn-lg">
                  <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                </button> 
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPlacesInput;