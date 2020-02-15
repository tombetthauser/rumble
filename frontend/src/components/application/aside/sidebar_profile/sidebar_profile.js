import React from "react";
import { Link } from "react-router-dom";
import "./sidebar_profile.css";

class SidebarProfile extends React.Component {
  render() {
    let userName = this.props.currentUser ? this.props.currentUser.username : "Randy";

    return (
      <Link to="/app/edit-profile">
        <div className="sidebar-profile-div" title="application > aside > sidebar_profile.js">
          <div className="sidebar-profile-img" />
          <span className="sidebar-profile-username">{userName}</span>
        </div>
      </Link>
    );
  }
}

export default SidebarProfile;