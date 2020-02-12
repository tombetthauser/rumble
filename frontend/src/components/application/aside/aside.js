import React from "react";
import { Link } from "react-router-dom";
import "./aside.css";

class LeftNavColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="aside-div">
        (aside component)
      </div>
    );
  }
}

export default LeftNavColumn;
