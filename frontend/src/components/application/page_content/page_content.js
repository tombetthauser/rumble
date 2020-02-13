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
      <div className="page-content-div">
        <ContentHeader />
        <EncountersUser />
        (page content component)
      </div>
    );
  }
}

export default PageContent;



