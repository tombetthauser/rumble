import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";
import { RECEIVE_CURRENT_USER} from "../actions/session_actions";
import { RECEIVE_MATCH_OR_LIKE } from "../actions/match_actions";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser//.data 
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_MATCH_OR_LIKE:
      if (action.payload.user) {
        return Object.assign({}, state, {user: action.payload.user})
      } else {
        return Object.assign({}, state, {user: action.payload})
      }
    default:
      return state;
  }
}