import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  } 

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-links-right">
          <Link to="/" onClick={this.logoutUser}>Log Out</Link>
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
    return (
      <div className="navbar-links-div">
        <Link to={"/"}>
          <span className="navbar-logo-icon">👊</span>
          <span className="navbar-title"> rumble</span>
        </Link>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;