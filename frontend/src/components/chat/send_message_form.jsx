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
				<input value={this.state.message} onChange={this.update('message')} />
			</form>
		);
	}
}

export default SendMessageForm;