import React from "react";
import { Link } from "react-router-dom";
import "./page_content.css";
import ContentHeader from "./content_header/content_header_container";
import EncountersUser from "./encounters_user/encounters_user_container";
// import { RightAppColumn } from "./right_app_column/right_app_column_container";

class PageContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page-content-div" title="application > page_content > page_content.js">
        <ContentHeader />
        <EncountersUser />
      </div>
    );
  }
}

export default PageContent;



