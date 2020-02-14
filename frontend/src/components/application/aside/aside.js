import "./aside.css";
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import SidebarProfile from "./sidebar_profile/sidebar_profile";

class LeftNavColumn extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileButtonClick = this.handleProfileButtonClick.bind(this);
    this.state = {
      url: this.props.match.url
    }
  }

  handleProfileButtonClick() {}

  render() {
    const matchedUsers = this.props.matchedUsers ? this.props.matchedUsers : [{id: 1, name: "Terry", ringName: "Hulk Hogan", location: "Augusta, GA", age: "66", about: "Looking for friendship, fun and a few fights to stay young at heart.", profileImage: "url('https://s.yimg.com/uu/api/res/1.2/GBi4ioTdBU5pI_mj2qdoOA--~B/aD0xODAwO3c9MjcwMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/people_218/f4ad8855ecce83db4bad5aab2cc047e8')"}];
    const { url } = this.state;

    return (
      <div className="aside-div" title="application > aside.js">
        <SidebarProfile />
        <Link to="/app" style={{ display: url === '/app' ? "block" : "none"}}>
          <div className="to-connections-button">Back to meeting new people ></div>
        </Link>
        <Link to="/app/connections">
          <div className="aside-match-link-div" className="aside-match-link-container" >
            <div className="aside-match-link-image" onClick={this.handleProfileButtonClick} style={{ backgroundImage: matchedUsers[0].profileImage }}></div>
            <span className="aside-match-link-text" onClick={this.handleProfileButtonClick} >{ matchedUsers[0].name }</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default withRouter(LeftNavColumn);



// Old Toggle Right Profile View Column Sheow / Hide

  // handleProfileButtonClick() {
    // const profileEntryDiv = document.querySelector(".profile-entry-div");
    // if (this.state.profileVisible === true) {
    //   this.state.profileVisible = false;
    //   profileEntryDiv.style.width = "0";
    //   setTimeout(() => { profileEntryDiv.style.display = "none" }, 500);
    // } else {
    //   this.state.profileVisible = true;
    //   profileEntryDiv.style.display = "inline";
    //   setTimeout(() => { profileEntryDiv.style.width = "300px" }, 10);
    // }
  // }