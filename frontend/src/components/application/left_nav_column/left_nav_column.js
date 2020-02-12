import React from "react";
import { Link } from "react-router-dom";
import "./left_nav_column.css";

class LeftNavColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="left-nav-column-container">
        <h1>Left Nav Column</h1>
      </div>
    );
  }
}

export default LeftNavColumn;
