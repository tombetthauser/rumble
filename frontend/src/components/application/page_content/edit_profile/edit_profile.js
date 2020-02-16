import "./edit_profile.css";
import React from "react";
import { Link } from "react-router-dom";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentUser = {name: "Randy", ringName: "Randy Savage", location: "Augusta, GA", age: "66", about: "Looking for friendship, fun and a few fights to stay young at heart."}

    return (
      <div className="edit-profile" title="application > page_content > edit_profile.js">
        <Link to="/"><button className="edit-profile-logout" onClick={this.props.logout} >logout</button></Link>
      </div>
    );
  }
}

export default EditProfile;