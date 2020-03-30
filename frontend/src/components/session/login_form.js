import NavBarContainer from "../nav/navbar_container";
import { withRouter } from 'react-router-dom';
import React from 'react';
import "./session.css"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(user)
    .then(() => this.props.history.push("/app"));
    // this.props.history.push("/app");
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{ this.state.errors[error] }</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <NavBarContainer />
        <div className="session-page-div">
          <div className="session-page-float-div">
            <h1>Log In to Rumble!</h1>
            <p>Log in with an existing username or password. If you don't have an account yet sign up today!</p>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input className="session-input-field" type="text" value={this.state.username} onChange={this.update('username')} placeholder="Username" /><br/>
                <input className="session-input-field" type="password" value={this.state.password} onChange={this.update('password')} placeholder="Password" /><br/>
                <input className="session-page-button-submit" type="submit" value="Submit" />
                {this.renderErrors()}
              </div>
            </form>
          </div>
          <div className="footer-text" >© 2020 Rumble | All Rights Reserved English (United States)</div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);