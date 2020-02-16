import * as ChatApiUtil from '../util/chat_api_util';

export const RECEIVE_CONVERSATIONS = 'RECEIVE_CONVERSATIONS';
export const RECEIVE_CONVERSATION = 'RECEIVE_CONVERSATION';
export const SET_CURRENT_CONVERSATION = 'SET_CURRENT_CONVERSATION';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';


export const setCurrentConversation = conversationId => ({
  type: SET_CURRENT_CONVERSATION,
  conversationId,
});

export const receiveConversations = payload => ({
  type: RECEIVE_CONVERSATIONS,
  payload,
});

export const receiveConversation = payload => ({
  type: RECEIVE_CONVERSATION,
  payload,
});

export const receiveMessage = payload => ({
  type: RECEIVE_MESSAGE,
  message: payload.message,
});

export const fetchConversations = () => dispatch => (
  ChatApiUtil.fetchConversations()
  .then(response => dispatch(receiveConversations(response.data)))
  .catch(err => console.log(err))
);

export const createMessage = message => dispatch => (
  ChatApiUtil.createMessage(message)
  .then(response => dispatch(receiveMessage(response.data)))
  .catch(err => console.log(err))
);

export const _createConversation = username => dispatch => (
  ChatApiUtil._createConversation(username)
  .then(response => dispatch(receiveConversation(response.data)))
  .catch(err => console.log(err))
);