import axios from "axios";

export const fetchConversations = () => (
  axios.get("/api/chat/")
);

export const createMessage = message => (
  axios.post(`/api/chat/${message.conversationId}`, message)
);

// this assumes only two participants
// and this file may not be the best long term spot for this
export const getOtherUsername = (user, conversation) => {
  return conversation.participants.filter(participant => participant._id !== user._id)[0].username
}