import * as usersAPI from "./users-api";
import axios from 'axios';

export async function signUp(userData) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error in signUp function:", error);
    throw error;
  }
}


export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem("token");
}

export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export async function checkToken() {
  return await usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}
