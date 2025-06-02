// src/services/authService.js
import API from "../utils/api";

export const loginUser = async (email, password) => {
  const response = await API.post("/v1/users/login", { email, password });

  const { token, user } = response.data;

  if (!token || !user?.role) {
    throw new Error("Invalid response from server");
  }

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
