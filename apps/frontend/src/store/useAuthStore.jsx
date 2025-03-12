import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,

  login: (userData, token) =>
    set({ user: userData, token, role: userData.role }),

  logout: () => set({ user: null, token: null, role: null }),
}));

export default useAuthStore;
