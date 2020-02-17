import { Link } from "react-router-dom"
import React from "react";
import "./edit-profile.css";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.user._id,
      username: this.props.user.username,
      biography: this.props.user.biography,
      photoFile: this.props.user.profile_url
    };
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.showProfilePicture = this.showProfilePicture.bind(this);
    this.handleUserInformationSubmit = this.handleUserInformationSubmit.bind(this)
  }

  handleInput(type) {
    return e => {
      let input = e.target.value;
      this.setState({ [type]: input });
    };
  }


  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, profileUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.update(this.state);

  // }

  handlePhotoSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.photoFile) {
      formData.append("file", this.state.photoFile);  ///this has to be named the same as it 
      //is in the upload function in the routes same key 
    }
    formData.append("_id", this.state._id)

    this.props.update(formData, this.state._id);


  }

  handleUserInformationSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", this.state._id)
    formData.append("username", this.state.username);
     formData.append("biography", this.state.biography);
    this.props.update(formData, this.state._id);

  }

  showProfilePicture() {
    if (!this.props.user.profile_url) {
      return (<div className="default-profile-pic"></div>);
    } else { return (<div>
        <img className="edit-profile-img" style={{ backgroundImage: `url("${this.props.user.profile_url}")` }}></img>
    </div>)}
  }

  render() {
    if(!this.props.user){
      return null;
    }
    return (
    <div className="edit-profile-container" >
      <div className="edit-profile-column" >
        <div className="edit-profile-header-div">
          <div>Welcome back <span className="edit-profile-header-username" >{ this.props.user.username }</span>!</div>
          <Link to="/"><button className="edit-profile-header-logout" onClick={this.props.logout} >logout</button></Link>
        </div>
        <div className="edit-profile-img-wrapper">{ this.showProfilePicture() }</div>
        <div className="edit-profile-change-img-div">
          <div className="edit-profile-img-text">Change profile image?</div>
          <input className="edit-profile-img-button" type="file" onChange={this.handleFile} />
        </div>
        <div className="edit-profile-input-wrapper">
          <label>
            <span className="edit-profile-username-text">Change Username?</span>
            <input className="edit-profile-username-input" type="text" value={this.state.username} onChange={this.handleInput("username")} />
          </label>
          <label>
            <span className="edit-profile-about-text">Change About Statement?</span>
            <textarea className="edit-profile-username-input" type="text" value={this.state.biography} onChange={this.handleInput("biography")} />
          </label>
        </div>
        <div className="edit-profile-">
          <button className="edit-profile-submit-left" onClick={this.handlePhotoSubmit}>Submit</button>
          <button className="edit-profile-submit-right" onClick={this.handleUserInformationSubmit}>Change Profile Info</button>
        </div>
      </div>
    </div>
    );
  }
}


export default EditForm;