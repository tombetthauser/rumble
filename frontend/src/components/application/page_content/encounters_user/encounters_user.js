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
      age: "66",
      about: "Looking for friendship, fun and a few fights to stay young at heart."
    }

    return (
      <div className="encounters-user" title="application > page_content > encounters_user.js">
        <div className="encounters-user-left"></div>
        <div className="encounters-user-text">
          <span><span className="bold-text">name: </span>{tempUser.name}</span>
          <span><span className="bold-text">ring name: </span>{tempUser.ringName}</span>
          <span><span className="bold-text">location: </span>{tempUser.location}</span>
          <span><span className="bold-text">age: </span>{tempUser.age}</span>
          <br />
          <span><span className="bold-text about-text">about: </span>"{tempUser.about}"</span>
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