import { create } from "zustand";

const useAuthStore = create((set) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

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
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set({ user: null, token: null, role: null });
    },
  };
});

export default useAuthStore;
