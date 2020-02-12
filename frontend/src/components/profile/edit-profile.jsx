import React from "react";
import { withRouter } from "react-router-dom";


class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.user._id,
      username: this.props.user.username,
      biography: this.props.user.biography
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return e => {
      let input = e.target.value;
      this.setState({ [type]: input });
    };
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.update(this.state);
  }


  render() {
    return (
      <div>
        <h1>{this.props.user.username}</h1>
        <div className="default-profile-pic"></div>
        <div>{this.props.user.biography}</div>
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

        <button onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}


export default EditForm;