import React from 'react';
import { connect } from 'react-redux';
import { _createConversation } from '../../actions/chat_actions';

class CreateConversationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props._createConversation(this.state.username);
        this.setState({ username: ''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="username" value={this.state.username} onChange={this.update('username')} />
                </form>
            </div>
        )
    }
}

const mSTP = state => ({});

const mDTP = dispatch => ({
    _createConversation: username => dispatch(_createConversation(username)),
});

export default connect(mSTP, mDTP)(CreateConversationForm);