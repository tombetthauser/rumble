import { Link } from "react-router-dom";
import "./sidebar_profile.css";
import React from "react";

class SidebarProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  showProfilePicture() {
    if (!this.props.user) {
      return (<div className="sidebar-profile-img" style={{ backgroundImage: `url("https://gossipgist.com/uploads/15954/macho-man.png")` }}></div>)
    } else { 
      return (<div className="sidebar-profile-img" style={{ backgroundImage: `url("${this.props.user.profile_url}")` }}></div>)
    }
  }

  showUserName() {
    if (!this.props.user) {
      return (<span className="sidebar-profile-username">Randy</span>)
    } else { 
      return (<span className="sidebar-profile-username">{this.props.user.username}</span>)
    }
  }

  render() {
    return (
      <Link to="/app/edit-profile">
        <div className="sidebar-profile-div" title="application > aside > sidebar_profile.js">
          { this.showProfilePicture() }
          { this.showUserName() }
        </div>
      </Link>
    );
  }
}

export default SidebarProfile;