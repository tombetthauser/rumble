import React from "react";
import { withRouter } from "react-router-dom";

class UserProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    _id: this.props.user._id,
    username: this.props.user.username,
    biography: this.props.user.biography,
    photoFile: this.props.user.profile_url
    }
    this.showProfilePicture = this.showProfilePicture.bind(this);
  }

  showProfilePicture() {
    if (!this.props.user.profile_url) {
      return <div className="default-profile-pic"></div>;
    } else {
      return (
        <div >
          <img src={this.props.user.profile_url}></img>
        </div>
      );
    }
  }


  render(){
    return (
      <div>
        <h1>Hello! {this.props.user.username} </h1>
        {this.showProfilePicture()}
        <div>About Me:</div>
        <div>Where I work</div>
        <div>{this.props.user.biography}</div>
      </div>
    );
  }
}


export default UserProfile;
