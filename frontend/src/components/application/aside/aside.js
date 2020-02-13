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

    const tempButtonStyle = { // DELETE-THIS-CONST <----------------
      borderRadius: "5px",
      display: "block",
      marginTop: "15px",
      padding: "3px 10px",
      width: "150px",
      cursor: "pointer"
    };

    return (
      <div className="aside-div">
        <SidebarProfile />
        (aside component)
        <div className="DELETE-THIS-DIV <----------------">
          <button style={tempButtonStyle} onClick={this.handleProfileButtonClick}>
            view match mode
          </button>
          <button style={tempButtonStyle} onClick={() => {}}>
            view profile mode
          </button>
          <button style={tempButtonStyle} onClick={() => {}}>
            pick matches mode
          </button>
        </div>
      </div>
    );
  }
}

export default LeftNavColumn;