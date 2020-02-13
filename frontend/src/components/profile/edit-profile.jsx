import React from "react";
import { withRouter } from "react-router-dom";


class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.user._id,
      username: this.props.user.username,
      biography: this.props.user.biography,
      photoFile: this.props.user.profile_url,
      profile_url: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.showProfilePicture = this.showProfilePicture.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.photoFile) {
      formData.append("file", this.state.photoFile);  ///this has to be named the same as it 
      //is in the upload function in the routes same key 
    }
    formData.append("_id", this.state._id)
    formData.append("username", this.state.username);
    formData.append("biography", this.state.biography);
    this.props.update(formData, this.state._id);

    // .then(() => {
    //   this.props.history.push(`/users/${this.props.currentUser.id}`);
    // });
  }

  showProfilePicture() {
    if (!this.props.user.profile_url) {
      return <div className="default-profile-pic"></div>;
    } else {
      return (
        <div >
          <img src={this.props.user.profile_url}
          ></img>
        </div>
      );
    }
  }

  render() {
    if(!this.props.user){
      return null;
    }
    return (
      <div>
        <h1>{this.props.user.username}</h1>
        {this.showProfilePicture()
        }<div>{this.props.user.biography}</div>
        <label>
          Username
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleInput("username")}
          />
        </label>
        <label>
          Bio
          <textarea
            type="text"
            value={this.state.biography}
            onChange={this.handleInput("biography")}
          />
        </label>
        <input
          //className="choose-profile-picture-file-button"
          type="file"
          onChange={this.handleFile}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}


export default EditForm;