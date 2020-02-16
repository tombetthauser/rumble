import NavBarContainer from "../nav/navbar_container";
import { withRouter } from 'react-router-dom';
import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
      console.log(nextProps);
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
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
            <h1>Sign Up for Rumble!</h1>
            <p>Create a new account and get your rumble on. Don't forget you can check out our demo account too!</p>
            <form onSubmit={this.handleSubmit}>
              <div className="signup-form"><br/>
                <input className="session-input-field" type="text" value={this.state.username} onChange={this.update('username')} placeholder="Username" /><br/>
                <input className="session-input-field" type="text" value={this.state.email} onChange={this.update('email')} placeholder="Email" /><br/>
                <hr/>
                <input className="session-input-field" type="password" value={this.state.password} onChange={this.update('password')} placeholder="Password" /><br/>
                <input className="session-input-field" type="password" value={this.state.password2} onChange={this.update('password2')} placeholder="Confirm Password"/><br/>
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

export default withRouter(SignupForm);