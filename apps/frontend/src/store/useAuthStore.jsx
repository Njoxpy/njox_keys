// src/store/useAuthStore.js
import { create } from "zustand";
import { logoutUser } from "../services/authService";

const useAuthStore = create((set) => {
  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    user: storedUser || null,
    token: storedToken || null,
    role: storedUser?.role || null,

    login: (userData, token) => {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      set({ user: userData, token, role: userData.role });
    },

    logout: () => {
      logoutUser();
      set({ user: null, token: null, role: null });
    },
  };
});

export default useAuthStore;
