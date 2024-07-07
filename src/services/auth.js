import api from "../main.js";
const routePrefix = "auth";

export async function login(username, password) {
  const response = await api.post(`${routePrefix}/Login`, {
    username: username,
    password: password,
  });

  return response.data;
}

export async function register(userDetails) {
  return api.post(`${routePrefix}/Register`, {
    username: userDetails.username,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    country: userDetails.country,
    email: userDetails.email,
    password: userDetails.password,
  });
}

export function logout() {
  return api.post(
    `${routePrefix}/Logout`,
    {},
    {
      withCredentials: true,
    }
  );
}
