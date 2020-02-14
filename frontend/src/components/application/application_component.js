import React from "react";
import { Link } from "react-router-dom";
import Aside from "./aside/aside_container";
import PageContent from "./page_content/page_content_container";
import ProfileEntry from "./profile_entry/profile_entry_container";
import "./application_component.css";

class ApplicationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "its working!"
    }
  }

  render() {
    return (
      <div className="application-component-container">
        <Aside />
        <PageContent />
        <ProfileEntry />
      </div>
    );
  }
}

export default ApplicationComponent;