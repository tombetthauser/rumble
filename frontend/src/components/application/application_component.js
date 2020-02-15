import ProfileEntry from "./profile_entry/profile_entry_container";
import PageContent from "./page_content/page_content_container";
import Aside from "./aside/aside_container";
import { Route } from "react-router-dom";
import "./application_component.css";
import React from "react";

class ApplicationComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="application-component-container">
        <Aside />
        <PageContent />
        <Route path="/app/connections" component={ProfileEntry} />
      </div>
    );
  }
}

export default ApplicationComponent;