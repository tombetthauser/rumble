import React from "react";
import { Link } from "react-router-dom";
import "./aside.css";
import SidebarProfile from "./sidebar_profile/sidebar_profile";

class LeftNavColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profileVisible: true };
    this.handleProfileButtonClick = this.handleProfileButtonClick.bind(this);
  }

  handleProfileButtonClick() {
    const profileEntryDiv = document.querySelector(".profile-entry-div");
    if (this.state.profileVisible === true) {
      this.state.profileVisible = false;
      profileEntryDiv.style.width = "0";
      setTimeout(() => { profileEntryDiv.style.display = "none" }, 500);
    } else {
      this.state.profileVisible = true;
      profileEntryDiv.style.display = "inline";
      setTimeout(() => { profileEntryDiv.style.width = "300px" }, 10);
    }
  }

  render() {

    const tempUser = {
      name: "Terry",
      ringName: "Hulk Hogan",
      location: "Augusta, GA",
      age: "66",
      about:
        "Looking for friendship, fun and a few fights to stay young at heart."
    };

    return (
      <div className="aside-div" title="application > aside.js">
        <SidebarProfile />
        <div className="aside-match-link-div">
          <div
            className="aside-match-link-image"
            onClick={this.handleProfileButtonClick}
            style={{
              backgroundImage:
                "url('https://s.yimg.com/uu/api/res/1.2/GBi4ioTdBU5pI_mj2qdoOA--~B/aD0xODAwO3c9MjcwMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/people_218/f4ad8855ecce83db4bad5aab2cc047e8')",
              width: "50px",
              height: "50px"
            }}
          ></div>
          <span
            className="aside-match-link-text"
            onClick={this.handleProfileButtonClick}
          >
            {tempUser.name}
          </span>
        </div>
      </div>
    );
  }
}

export default LeftNavColumn;