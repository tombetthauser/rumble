import React from "react";
import { withRouter } from "react-router-dom";

class UserProfile extends React.Component{
  constructor(props){
    super(props)

  }




  render(){
    return (
      <div>
        <h1>Hello! {this.props.user.username} </h1>
        <div className="default-profile-pic"></div>
        <div>About Me:</div>
        <div>Where I work</div>
        <div>{this.props.user.biography}</div>
      </div>
    );
  }
}


export default UserProfile;
