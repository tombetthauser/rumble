import {
  RECEIVE_CONVERSATIONS,
  RECEIVE_MESSAGE,
} from '../actions/chat_actions';

const defaultState = {}

const messagesReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      return Object.assign({}, state, action.payload.messages);
    case RECEIVE_MESSAGE:
      let newState = Object.assign({}, state);
      newState[action.message.conversationId].push(action.message);
      return newState;
    default:
      return state;
  }
}

export default messagesReducer;