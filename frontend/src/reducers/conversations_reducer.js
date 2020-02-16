import {
  RECEIVE_CONVERSATIONS,
  RECEIVE_CONVERSATION,
  SET_CURRENT_CONVERSATION,
} from '../actions/chat_actions';
import merge from 'lodash/merge';

const defaultState = {
  currentConversation: false,
  conversations: {}
}

const chatReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_CURRENT_CONVERSATION:
      return Object.assign({}, state, { currentConversation: action.conversationId });
    case RECEIVE_CONVERSATIONS:
      return Object.assign({}, state, { conversations: action.payload.conversations });
    case RECEIVE_CONVERSATION:
      return merge({}, state, { conversations: { [action.payload.conversation._id]: action.payload.conversation } });
    default:
      return state;
  }
}

export default chatReducer;