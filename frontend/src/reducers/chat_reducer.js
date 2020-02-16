import { combineReducers } from 'redux';
import conversationsReducer from './conversations_reducer';
import messagesReducer from './messages_reducer';

const chatReducer = combineReducers({
    conversations: conversationsReducer,
    messages: messagesReducer,
});

export default chatReducer;