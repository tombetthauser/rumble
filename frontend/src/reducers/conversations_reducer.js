import {
  RECEIVE_CONVERSATIONS,
  SET_CURRENT_CONVERSATION,
} from '../actions/chat_actions';

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
      return Object.assign({}, state, { conversations: action.payload.conversations, messages: action.payload.messages });
    default:
      return state;
  }
}

export default chatReducer;