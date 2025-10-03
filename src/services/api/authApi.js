import axios from "axios";

const API_URL = "https://68dcb9647cd1948060ab1d14.mockapi.io/api/v1/users";

export const registerUser = (user) => axios.post(API_URL, user);
export const getUsers = () => axios.get(API_URL);
