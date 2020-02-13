import React from "react";
import { Link } from "react-router-dom";
import "./profile_entry.css";
import { get } from "mongoose";
// import RightAppColumn from "./right_app_column/right_app_column_container";

class ProfileEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-entry-div">
        (profile entry component)
      </div>
    );
  }
}

export default ProfileEntry;
