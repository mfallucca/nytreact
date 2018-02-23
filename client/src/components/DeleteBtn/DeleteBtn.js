import React from "react";
import "./DeleteBtn.css";
import API from "../../utils/API";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
  <button className="delete-btn" {...props} onClick={() => API.deletedSaved(props._id, props.title, props.date, props.url)}>
    ✗
  </button>
);

export default DeleteBtn;
