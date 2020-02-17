import * as MatchApiUtil from "../util/match_api_util";

export const RECEIVE_MATCH_OR_LIKE = "RECEIVE_MATCH_OR_LIKE";

export const receiveMatchOrLike = payload => ({
    type: RECEIVE_MATCH_OR_LIKE,
    payload,
});

export const matchOrLike = recipientId => dispatch => {
  return MatchApiUtil.matchOrLike(recipientId)
    .then(response => dispatch(receiveMatchOrLike(response.data)))
};