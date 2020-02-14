import React from 'react';
import { withRouter } from 'react-router-dom';

class Meeting extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      index: 0,
      singleUser: ""
    }
   this.fetchAllUsers = this.fetchAllUsers.bind(this);
   this.handleReceiveOneUser = this.handleReceiveOneUser.bind(this);
  }
  componentDidMount(){
    this.props.fetchUsers();
  }
  fetchAllUsers(){
    let allUsers = [];
    this.props.users.forEach((user) => { allUsers.push(user)});
    return allUsers;
  }

  handleReceiveOneUser(e){
    e.preventDefault();
    this.setState({index: this.state.index + 1, singleUser: this.fetchAllUsers()[this.state.index]});
  }

  render(){
    
    return (
      <div>
        <button onClick={this.handleReceiveOneUser}>Would you like to see the next user?</button> 
        <p>{this.state.singleUser ? this.state.singleUser.username : ''} </p>
      </div>
    );
  }
};

export default Meeting;