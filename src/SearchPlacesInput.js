import React, {Component} from 'react';

class SearchPlacesInput extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = { place: '' };

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }
  
  // handleChange(e) {
  //   this.setState({ place: e.target.value });
  // }
  
  // handleSubmit(e) {
  //   e.preventDefault();
  // }
  
  render() {
    // console.log('this.state', this.state)
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <form className="form-inline" onSubmit={this.props.handleSubmit}>
              {/* <label>Search</label> */}
              <input type="text"
                className="form-control input-lg"
                id="place"
                placeholder="Search here..."
                onChange={this.props.handleChange}
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