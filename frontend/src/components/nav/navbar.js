import React from "react";
import { Link } from "react-router-dom";
// import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  } //<Link to={"/tweets"}>All Tweets</Link>
   //<Link to={"/new_tweet"}>Write a Tweet</Link>
         

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-links-right">
          {/* <Link to={"/profile"}>Profile</Link> */}
          <Link onClick={this.logoutUser}>Log Out</Link>
          <Link to={`/user/${this.props.user._id}`}>View Profile</Link>
          <Link to={`/edit/${this.props.user._id}`}>Edit Profile</Link>
        </div>
      );
    } else {
      return (
        <span className="navbar-links-right">
          <Link to={"/signup"}>Sign Up</Link>
          <Link to={"/login"}>Log In</Link>
        </span>
      );
    }
  }

  render() {
    if(!this.props.user){
      return null;
    }
    return (
      <div className="navbar-links-div">
        <Link to={"/"}>
          <span className="navbar-title">
            rumble
          </span>
        </Link>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;
