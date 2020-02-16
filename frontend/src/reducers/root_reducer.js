import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import errorsReducer from "./errors_reducer";
import usersReducer from "./users_reducer";
import chatReducer from "./chat_reducer";


const RootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer, 
  users: usersReducer,
  chat: chatReducer,
});

export default RootReducer;
