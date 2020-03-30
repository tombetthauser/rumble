import { Link } from "react-router-dom";
import "./sidebar_profile.css";
import React from "react";

const DEFAULT_IMAGE = "https://www.sheffield.com/wp-content/uploads/2013/06/placeholder.png";

class SidebarProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  showProfilePicture() {
    if (!this.props.user) {
      return (<div className="sidebar-profile-img" style={{ backgroundImage: `url("https://gossipgist.com/uploads/15954/macho-man.png")` }}></div>)
    } else { 
      return (<div className="sidebar-profile-img" style={{ backgroundImage: `url("${this.props.user.profile_url ? this.props.user.profile_url : DEFAULT_IMAGE}")` }}></div>)
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
        <div className="sidebar-profile-div" >
          { this.showProfilePicture() }
          { this.showUserName() }
        </div>
      </Link>
    );
  }
}

export default SidebarProfile;