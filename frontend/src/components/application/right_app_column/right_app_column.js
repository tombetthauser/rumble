import React from "react";
import { Link } from "react-router-dom";
import "./right_app_column.css";
// import { RightAppColumn } from "./right_app_column/right_app_column_container";

class RightAppColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="right-app-column-container">
        <h1>Right App Column</h1>
      </div>
    );
  }
}

export default RightAppColumn;
