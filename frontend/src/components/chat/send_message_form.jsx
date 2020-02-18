import './conversations.css'
import React from 'react';

class SendMessageForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(field) {
		return e => this.setState({ [field]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault();
		let message = {
			conversationId: this.props.conversation._id,
			message: this.state.message,
		}
		this.props.sendMessage(message);
		this.setState({ message: '' });
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input className="new-message-input" value={this.state.message} onChange={this.update('message')} />
				<input className="message-input-submit" type="submit" value="↑" />
			</form>
		);
	}
}

export default SendMessageForm;