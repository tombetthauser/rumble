import React from 'react';
import { connect } from 'react-redux';
import ChatClient from '../../util/chat_client';

const mSTP = ({ session: { user }}) => ({
    currentUser: user
})

class ConversationShow extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { currentUser } = this.props;
        const chat = new ChatClient();
        chat.connectAs(currentUser);
    }
    render() {
        return (<p>chat!</p>)
    }
}

export default connect(mSTP)(ConversationShow);