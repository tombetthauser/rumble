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
    const tempUser = {
      name: "Terry",
      ringName: "Hulk Hogan",
      location: "Augusta, GA",
      age: "66",
      about: "Looking for friendship, fun and a fight to stay young at heart."
    };

    return (
      <div className="profile-entry-div" title="application > profile_entry > profile_entry.js">
        <div className="profile-entry-text-div">
          <span><span className="bold-text">name: </span>{tempUser.name}</span>
          <span><span className="bold-text">ring name: </span>{tempUser.ringName}</span>
          <span><span className="bold-text">location: </span>{tempUser.location}</span>
          <span><span className="bold-text">age: </span>{tempUser.age}</span>
          {/* <span><span className="bold-text about-text">about: </span>{tempUser.about}</span> */}
        </div>
      </div>
    );
  }
}

export default ProfileEntry;
