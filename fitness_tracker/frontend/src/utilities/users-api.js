import sendRequest from "./send-request";

export function signUp(userData) {
  return sendRequest(`${import.meta.env.VITE_BACKEND_URL}/users`, "POST", userData);
}

export function login(credentials) {
  return sendRequest(
    `${import.meta.env.VITE_BACKEND_URL}/users/login`,
    "POST",
    credentials
  );
}

export function checkToken() {
  return sendRequest(`${import.meta.env.VITE_BACKEND_URL}/check-token`);
}
