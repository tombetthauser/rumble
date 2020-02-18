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

const DEFAULT_PROFILE_IMAGE = "https://images.squarespace-cdn.com/content/v1/5a4d3b6df6576ec202c69c73/1537897321377-8978TG2CQO210ZRXH8BH/ke17ZwdGBToddI8pDm48kJnELN9L4KlLfazVfQVCXZRZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PInuZO37dzxXPJ-Pv709Qj3M8pQ9u6G9ve6GmdgInOFjkKMshLAGzx4R3EDFOm1kBS/profile-placeholder-image-gray-silhouette-no-vector-21542863.jpg";

class EncountersUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      singleUser: null,
      users_liked_users: null,
      allUsers: null
    };
    // this.populateAllUsers = this.populateAllUsers.bind(this);
    this.handleReceiveOneUser = this.handleReceiveOneUser.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  // componentDidUpdate() {
  //   if (!this.state.allUsers) {
  //     this.populateAllUsers();
  //   }
  // }

  componentDidMount() {
    this.props.fetchUsers();
    // singleUser: this.populateAllUsers()[this.state.index]

    // this.setState({
    //     index: 0,
    //     singleUser: this.fetchAllUsers()[this.state.index]
    //   });s
    if (this.props.user) {
      this.setState({ users_liked_users: this.props.user.liked_users });
    }
   // this.state.allUsers = ["cats"]
    // console.log("this.state.allUsers ~~~~~~~~~~~");
    // console.log(this.props);
  }

  shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
  }

  // populateAllUsers() {
  //   let populatedAllUsers = [];
  //   let currentUser;
  //   if (this.props.sessionUser) {
  //     currentUser = this.props.users[this.props.sessionUser._id]
  //   }

  //   this.props.users.forEach(user => {
  //     if (currentUser && (!currentUser.liked_users.includes(user._id)) && (user._id !== currentUser._id)) {
  //       populatedAllUsers.push(user)
  //     };
  //   });
  //   this.setState({
  //     allUsers: populatedAllUsers
  //   });
  //   // this.setState({
  //   //   singleUser: this.state.allUsers[this.state.index]
  //   // })
  //   return this.shuffle(populatedAllUsers);
  // };

  

  handleReceiveOneUser(e) {
    e.preventDefault();
    this.setState({ index: this.state.index + 1 });
  }

  handleLikeClick(userId) {
    return (e) => {
    // if (this.state.singleUser) {
    //   // console.log("this.state ~~~~~~~~~~~");
    //   // console.log(this.state);
    // this.props.matchOrLike(this.state.singleUser._id);
    this.props.matchOrLike(userId);
    this.handleReceiveOneUser(e);
    // } else {
    //   this.handleReceiveOneUser(e);
    // }
    }
  }

  handleDislikeClick(e) {
    // alert("Dislike clicked!");
    // this.handleReceiveOneUser(e);
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
    // might be problematic

    const { availableUsers } = this.props;
    const { index } = this.state;

    if ((this.state.index < availableUsers.length) && (availableUsers) && (availableUsers.length > 0)) {
      let currentUser = availableUsers[index];
      return (
        <div>
          <div className="encounters-user" title="application > page_content > encounters_user.js">
            <div style={{ backgroundImage: `url("${currentUser.profile_url ? currentUser.profile_url : DEFAULT_PROFILE_IMAGE}")` }} className="encounters-user-left"></div>
            <div className="encounters-user-text"><br /><br />
              <span>
                <span className="bold-text">name: </span>
                {currentUser.username ? currentUser.username : "N/A"}
              </span><br />
              <span>
                <span className="bold-text about-text">about: </span>"
                {currentUser.biography ? currentUser.biography : "N/A"}"
              </span>
            </div>
            <div className="encounters-user-buttons-div">
              <button onMouseOver={this.handleDislikeHover} onMouseLeave={this.handleButtonMouseOff} onClick={this.handleReceiveOneUser}>✌️</button>
              <button onMouseOver={this.handleLikeHover} onMouseLeave={this.handleButtonMouseOff} onClick={this.handleLikeClick(currentUser._id)}>👊</button>
            </div>
            <div className="button-hover-text-div"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div>hi garon!</div>
      )
    }
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