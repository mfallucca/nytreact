import React from "react";
import "./SaveBtn.css";
import API from "../../utils/API";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const SaveBtn = props => (
  <button className="save-btn" {...props} onClick={() => API.postSaved(props._id, props.title, props.date, props.url)}>
    ✔
  </button>
);

export default SaveBtn;
