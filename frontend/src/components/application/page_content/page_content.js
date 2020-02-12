import React from "react";
import { Link } from "react-router-dom";
import "./page_content.css";
// import { RightAppColumn } from "./right_app_column/right_app_column_container";

class PageContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-content-div">
        (page content component)
      </div>
    );
  }
}

export default PageContent;
