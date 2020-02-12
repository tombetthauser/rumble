import React from "react";
import { Link } from "react-router-dom";
import RightAppColumn from "./right_app_column/right_app_column";
import LeftNavColumn from "./left_nav_column/left_nav_column";
import "./application_component.css";

class ApplicationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="application-component-container">
        <LeftNavColumn />
        <RightAppColumn />
      </div>
    );
  }
}

export default ApplicationComponent;