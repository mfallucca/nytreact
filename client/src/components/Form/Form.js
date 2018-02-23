import React from "react";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const SearchForm = props =>
  <form className="search">
    <div className="form-group">
      <label htmlFor="queryString">Search Text:</label>
      <input
        value={props.search}
        onChange={props.handleInputChangeQuery}
        name="queryString"
        type="text"
        className="form-control"
        placeholder="Enter Your Search Term"
        id="queryString"
      />
      <label htmlFor="startDate">Start Year:</label>
      <input
        value={props.search}
        onChange={props.handleInputChangeStart}
        name="startDate"
        type="text"
        className="form-control"
        placeholder="Start Date YYYY"
        id="startDate"
      />
      <label htmlFor="endDate">End Year:</label>
      <input
        value={props.search}
        onChange={props.handleInputChangeEnd}
        name="endDate"
        type="text"
        className="form-control"
        placeholder="End Date YYYY"
        id="endDate"
      />
      <br />
      <button
        type="submit"
        onClick={props.handleFormSubmit}
        className="btn btn-success col-sm-12 col-md-6 col-md-offset-3"
      >
        Search
      </button>
    </div>
  </form>;

export default SearchForm;
