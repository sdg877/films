import sendRequest from "./send-request";

export function signUp(userData) {
  return sendRequest(`${import.meta.env.VITE_BACKEND_URL}/api/users`, "POST", userData);
}

export function login(credentials) {
  return sendRequest(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
    "POST",
    credentials
  );
}

export function checkToken() {
  return sendRequest(`${import.meta.env.VITE_BACKEND_URL}/check-token`);
}
