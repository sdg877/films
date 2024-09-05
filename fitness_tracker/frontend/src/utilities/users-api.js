import sendRequest from "./send-request";

// export function signUp(userData) {
//   return sendRequest(`http://localhost:5500/api/users`, "POST", userData);
// }

export function signUp(userData) {
  return sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users`, "POST", userData);
}

export function login(credentials) {
  return sendRequest(
    `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
    "POST",
    credentials
  );
}

export function checkToken() {
  return sendRequest(`${process.env.REACT_APP_BACKEND_URL}/check-token`);
}
