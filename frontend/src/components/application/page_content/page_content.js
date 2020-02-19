import React from "react";
import EncountersUser from "./encounters_user/encounters_user_container";
import ContentHeader from "./content_header/content_header_container";
import EditProfileContainer from "./edit_profile/edit-profile-container";
import { Switch, Route } from "react-router-dom";
import ConversationShow from "../../chat/conversation_show";
import "./page_content.css";

const EncountersComponent = () => (
  <div className="encounters">
    <ContentHeader headerText={"match"}/>
    <EncountersUser />
  </div>
)

const ConversationView = () => (
  <div className="encounters">
    <ContentHeader headerText={"chat"}/>
    <ConversationShow />
  </div>
)

const EditProfileComponent = () => (
  <div className="encounters">
    <ContentHeader headerText={"profile"}/>
    <EditProfileContainer />
  </div>
)

class PageContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <div className="page-content-div" >
        <Switch>
          <Route exact path="/app/connections" component={ConversationView} />
          <Route exact path="/app/edit-profile" component={EditProfileComponent} />
          <Route exact path="/app" component={EncountersComponent} />
        </Switch>
      </div>
    );
  }
}

export default PageContent;