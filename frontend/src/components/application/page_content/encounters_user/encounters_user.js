import React from "react";
import { Link } from "react-router-dom";
import "./encounters_user.css";

class EncountersUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tempUser = {
      name: "Terry",
      ringName: "Hulk Hogan",
      location: "Augusta, GA",
      age: "66"
    }

    return (
      <div className="encounters-user" title="application > encounters_user.js">
        <div className="encounters-user-left"></div>
        <div className="encounters-user-text">
          <span>name: {tempUser.name}</span>
          <span>ring name: {tempUser.ringName}</span>
          <span>location: {tempUser.location}</span>
          <span>age: {tempUser.age}</span>
        </div>
        <div className="encounters-user-buttons-div">
          <button>✋</button>
          <button>👊</button>
        </div>
      </div>
    );
  }
}

export default EncountersUser;