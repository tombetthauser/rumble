import * as UsersAPIUtil from "../util/users_api_util";

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

export const receiveAllUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users: users
});

export const fetchUsers = () => dispatch => {
  return UsersAPIUtil.getUsers()
    .then(users => dispatch(receiveAllUsers(users)))
   // .catch(err => console.log(err))
};