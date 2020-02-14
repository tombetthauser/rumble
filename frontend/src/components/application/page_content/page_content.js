import React from "react";
import EncountersUser from "./encounters_user/encounters_user_container";
import ContentHeader from "./content_header/content_header_container";
import "./page_content.css";

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