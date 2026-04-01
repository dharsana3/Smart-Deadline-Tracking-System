import API from "../api/axios";

export const registerUser = (userData) => {
  return API.post("/user", userData);
};

export const loginUser = (loginData) => {
  return API.post("/user/login", loginData);
};

export const getUserByEmail = (email) => {
  return API.get(`/user/email/${email}`);
};