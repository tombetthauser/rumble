import axios from "axios";

export const matchOrLike = recipientId => {
  return axios.post("/api/matches/", { recipientId }) ///passing in data
};