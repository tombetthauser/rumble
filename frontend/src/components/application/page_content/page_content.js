import React from "react";
import { Link } from "react-router-dom";
import "./page_content.css";
import ContentHeader from "./content_header/content_header_container";
import EncountersUser from "./encounters_user/encounters_user_container";
// import { RightAppColumn } from "./right_app_column/right_app_column_container";
import EncountersUser from "./encounters_user/encounters_user_container";
import ContentHeader from "./content_header/content_header_container";
import EditProfile from "./edit_profile/edit_profile_container";
import EditProfileContainer from '../../profile/edit-profile-container';
import { Switch, Route } from "react-router-dom";
import "./page_content.css";

const EncountersComponent = () => (
  <div className="encounters">
    <ContentHeader headerText={"match"}/>
    <EncountersUser />
  </div>
)

const ConversationShow = () => (
  <div className="encounters">
    <ContentHeader headerText={"chat"}/>
    {/* <EncountersUser /> */}
  </div>
)

const EditProfileComponent = () => (
  <div className="encounters">
    <ContentHeader headerText={"profile"}/>
    <EditProfileContainer/>
  </div>
)

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



