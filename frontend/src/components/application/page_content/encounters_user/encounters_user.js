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
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
    this.handleReceiveOneUser = this.handleReceiveOneUser.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
    // this.setState({
    //     index: 0,
    //     singleUser: this.fetchAllUsers()[this.state.index]
    //   });s
    if (this.props.user) {
      this.setState({ users_liked_users: this.props.user.liked_users });
    }
   // this.state.allUsers = ["cats"]
    console.log("this.state.allUsers ~~~~~~~~~~~");
    console.log(this.props);
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

  fetchAllUsers() {
    let allUsers = [];

    this.props.users.forEach(user => {
      if ((!this.props.currentUser.liked_users.includes(user._id)) && (user._id !== this.props.currentUser._id)) {
        allUsers.push(user)
      };
    });
    return this.shuffle(allUsers);
  };

  

  handleReceiveOneUser(e) {
    e.preventDefault();
    this.setState({
      index: this.state.index + 1,
      singleUser: this.fetchAllUsers()[this.state.index]
    });
  }

  handleLikeClick(e) {
    if (this.state.singleUser) {
      console.log("this.state ~~~~~~~~~~~");
      console.log(this.state);
      this.handleReceiveOneUser(e);
      this.props.matchOrLike(this.state.singleUser._id);
    } else {
      this.handleReceiveOneUser(e);
    }
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
        "Looking for friendship, fun and a few fights to stay young at heart.",
      profile_url: "https://s.yimg.com/uu/api/res/1.2/GBi4ioTdBU5pI_mj2qdoOA--~B/aD0xODAwO3c9MjcwMDtzbT0xO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/people_218/f4ad8855ecce83db4bad5aab2cc047e8"
    };


    return (
 
      <div>
        <div
          className="encounters-user"
          title="application > page_content > encounters_user.js"
        >
          <div style={{ backgroundImage: `url("${currentUser.profile_url ? currentUser.profile_url : DEFAULT_PROFILE_IMAGE }")` }} className="encounters-user-left"></div>
          <div className="encounters-user-text">
            {/* <span>
              <span className="bold-text">id: </span>
              {currentUser._id ? currentUser._id : "???"}
            </span> */}
            <br/>
            <br/>
            <span>
              <span className="bold-text">name: </span>
              {currentUser.username ? currentUser.username : "???"}
            </span>
            {/* <span>
              <span className="bold-text">ring name: </span>
              {currentUser.ringName ? currentUser.ringName : "???"}
            </span> */}
            {/* <span>
              <span className="bold-text">location: </span>
              {currentUser.location ? currentUser.location : "???"}
            </span> */}
            {/* <span>
              <span className="bold-text">age: </span>
              {currentUser.age ? currentUser.age : "???"}
            </span> */}
            <br />
            <span>
              <span className="bold-text about-text">about: </span>"
              {currentUser.biography ? currentUser.biography : "???"}"
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