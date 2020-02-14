import "./encounters_user.css";
import React from "react";

class EncountersUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentUser = {name: "Terry", ringName: "Hulk Hogan", location: "Augusta, GA", age: "66", about: "Looking for friendship, fun and a few fights to stay young at heart."}

    return (
      <div className="encounters-user" title="application > page_content > encounters_user.js">
        <div className="encounters-user-left"></div>
        <div className="encounters-user-text">
          <span><span className="bold-text">name: </span>{currentUser.name}</span>
          <span><span className="bold-text">ring name: </span>{currentUser.ringName}</span>
          <span><span className="bold-text">location: </span>{currentUser.location}</span>
          <span><span className="bold-text">age: </span>{currentUser.age}</span>
          <br/>
          <span><span className="bold-text about-text">about: </span>"{currentUser.about}"</span>
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