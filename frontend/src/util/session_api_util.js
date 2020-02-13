import axios from "axios";

// We've been using this method in previos steps
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const signup = userData => {
  return axios.post("/api/users/register", userData);
};

export const login = userData => {
  return axios.post("/api/users/login", userData);
};

export const update = (userData, userId) => {
  debugger;
  console.log(userData);
  console.log(userData._id);
  return axios.patch( `/api/users/${userId}`, userData);
}