import "./encounters_user.css";
import React from "react";

const LIKETEXT = [
  "Let's Fight!",
  "Let's Rumble!",
  "Bring it On!",
  "Let's Wrastle!",
  "It's Go Time!"
];

const DISLIKETEXT = [
  "Maybe Later!",
  "Hard Pass!",
  "Nope!",
  "Forget it!",
  "No Way!"
];

class EncountersUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeText: [
        "Let's Fight!",
        "Let's Rumble!",
        "Let's Wrastle!"
      ]
    }
  }

  handleLikeClick() {
    alert("Like clicked!")
  }

  handleDislikeClick() {
    alert("Dislike clicked!")
  }

  handleLikeHover() {
    let randIdx = Math.floor(Math.random() * LIKETEXT.length)
    document.querySelector(".button-hover-text-div").innerHTML = LIKETEXT[randIdx]
  }

  handleDislikeHover() {
    let randIdx = Math.floor(Math.random() * DISLIKETEXT.length)
    document.querySelector(".button-hover-text-div").innerHTML = DISLIKETEXT[randIdx]
  }

  handleButtonMouseOff() {
    document.querySelector(".button-hover-text-div").innerHTML = ""
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
          <button onMouseOver={this.handleDislikeHover} onMouseLeave={this.handleButtonMouseOff} onClick={this.handleDislikeClick} >✌️</button>
          <button onMouseOver={this.handleLikeHover} onMouseLeave={this.handleButtonMouseOff} onClick={this.handleLikeClick} >👊</button>
        </div>
        <div className="button-hover-text-div"></div>
      </div>
    );
  }
}

export default EncountersUser;