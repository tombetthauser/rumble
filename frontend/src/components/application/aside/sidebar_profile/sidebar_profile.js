import React from "react";
import { Link } from "react-router-dom";
import "./sidebar_profile.css";

class SidebarProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="sidebar-profile-div"
        title="application > aside > sidebar_profile.js"
      >
        <div className="sidebar-profile-img" />
        <span className="sidebar-profile-username">Randy</span>
      </div>
    );
  }
}

export default SidebarProfile;