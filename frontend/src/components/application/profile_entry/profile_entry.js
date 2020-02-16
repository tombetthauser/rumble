import "./profile_entry.css";
import React from "react";
import { withRouter } from "react-router-dom";

class ProfileEntry extends React.Component {
  render() {
    const tempUser = { name: "Terry", ringName: "Hulk Hogan", location: "Augusta, GA", age: "66" };

    const width = this.props.location.pathname === "/app/connections" ? "300px" : "0px"

    return (
      <div style={{ width: width }} className="profile-entry-div" title="application > profile_entry > profile_entry.js">
        <div className="profile-entry-text-div">
          <span><span className="bold-text">name: </span>{tempUser.name}</span>
          <span><span className="bold-text">ring name: </span>{tempUser.ringName}</span>
          <span><span className="bold-text">location: </span>{tempUser.location}</span>
          <span><span className="bold-text">age: </span>{tempUser.age}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileEntry);