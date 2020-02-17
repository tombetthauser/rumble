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
      index: 0,
      singleUser: "",
      users_liked_users: null
    };
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
    this.handleReceiveOneUser = this.handleReceiveOneUser.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
    // this.setState({
    //     index: 0,
    //     singleUser: this.fetchAllUsers()[this.state.index]
    //   });
    if (this.props.user) {
      this.setState({ users_liked_users: this.props.user.liked_users });
    }
  }

  fetchAllUsers() {
    let allUsers = [];
    this.props.users.forEach(user => {
      allUsers.push(user);
    });
    return allUsers;
  }

    handleReceiveOneUser(e) {
      e.preventDefault();
      this.setState({
        index: this.state.index + 1,
        singleUser: this.fetchAllUsers()[this.state.index]
      });
    }

  handleLikeClick(e) {
    alert("Like clicked!");
    this.handleReceiveOneUser(e);
    this.props.matchOrLike(this.state.singleUser._id);
  }

  handleDislikeClick() {
    alert("Dislike clicked!");
  }

  handleLikeHover() {
    let randIdx = Math.floor(Math.random() * LIKETEXT.length);
    document.querySelector(".button-hover-text-div").innerHTML =
      LIKETEXT[randIdx];
  }

  handleDislikeHover() {
    let randIdx = Math.floor(Math.random() * DISLIKETEXT.length);
    document.querySelector(".button-hover-text-div").innerHTML =
      DISLIKETEXT[randIdx];
  }

  handleButtonMouseOff() {
    document.querySelector(".button-hover-text-div").innerHTML = "";
  }

  render() {
    const currentUser = this.state.singleUser ? this.state.singleUser : {
      _id: "test",
      username: "Terry",
      email: "hulk@yahoo.com",
      location: "Augusta, GA",
      age: "66",
      biography:
        "Looking for friendship, fun and a few fights to stay young at heart."
    };

    return (
 
      <div>
        <div
          className="encounters-user"
          title="application > page_content > encounters_user.js"
        >
          <div className="encounters-user-left"></div>
          <div className="encounters-user-text">
            <span>
              <span className="bold-text">id: </span>
              {currentUser._id ? currentUser._id : "???"}
            </span>
            <span>
              <span className="bold-text">name: </span>
              {currentUser.username}
            </span>
            <span>
              <span className="bold-text">ring name: </span>
              {currentUser.ringName ? currentUser.ringName : "???"}
            </span>
            <span>
              <span className="bold-text">location: </span>
              {currentUser.location ? currentUser.location : "???"}
            </span>
            <span>
              <span className="bold-text">age: </span>
              {currentUser.age ? currentUser.age : "???"}
            </span>
            <br />
            <span>
              <span className="bold-text about-text">about: </span>"
              {currentUser.biography}"
            </span>
          </div>
          <div className="encounters-user-buttons-div">
            <button
              onMouseOver={this.handleDislikeHover}
              onMouseLeave={this.handleButtonMouseOff}
              onClick={this.handleReceiveOneUser}
            >
              ✌️
            </button>
            <button
              onMouseOver={this.handleLikeHover}
              onMouseLeave={this.handleButtonMouseOff}
              onClick={this.handleLikeClick}
            >
              👊
            </button>
          </div>
          <div className="button-hover-text-div"></div>
        </div>
        {/* <div>
          <button onClick={this.handleReceiveOneUser}>Would you like to see the next user?</button>
          {this.state.singleUser ? this.state.singleUser.username : ""}
        </div> */}
      </div>
    );
  }
}

export default EncountersUser;


// import React from "react";
// import { withRouter } from "react-router-dom";

// class Meeting extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       index: 0,
//       singleUser: ""
//     };
//     this.fetchAllUsers = this.fetchAllUsers.bind(this);
//     this.handleReceiveOneUser = this.handleReceiveOneUser.bind(this);
//   }
//   componentDidMount() {
//     this.props.fetchUsers();
//   }
//   fetchAllUsers() {
//     let allUsers = [];
//     this.props.users.forEach(user => {
//       allUsers.push(user);
//     });
//     return allUsers;
//   }

//   handleReceiveOneUser(e) {
//     e.preventDefault();
//     this.setState({
//       index: this.state.index + 1,
//       singleUser: this.fetchAllUsers()[this.state.index]
//     });
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={this.handleReceiveOneUser}>
//           Would you like to see the next user?
//         </button>
//         <p>{this.state.singleUser ? this.state.singleUser.username : ""} </p>
//       </div>
//     );
//   }
// }

// export default Meeting;