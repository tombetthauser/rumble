import NavBarContainer from "../nav/navbar_container";
import { withRouter } from 'react-router-dom';
import React from 'react';

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
    this.props.login(user);
    this.props.history.push("/app");
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
        <div className="session-outer-div">
          <div className="session-inner-div">
            <form onSubmit={this.handleSubmit}>
              <div>
                <input type="text" value={this.state.username} onChange={this.update('username')} placeholder="Username" /><br/>
                <input type="password" value={this.state.password} onChange={this.update('password')} placeholder="Password" /><br/>
                <input type="submit" value="Submit" />
                {this.renderErrors()}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);