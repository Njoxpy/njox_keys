import { create } from "zustand";
import API from "../utils/api"; // Axios instance

const useUserStore = create((set) => ({
  users: [],
  loading: false,

  // Fetch all users
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await API.get("/users"); // Make sure you have this API endpoint
      set({ users: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ loading: false });
    }
  },

  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await API.post("/users", userData); // Post to the API
      set((state) => ({ users: [...state.users, response.data] }));
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },

  // Update user details
  updateUser: async (userId, updatedData) => {
    try {
      const response = await API.patch(`/users/${userId}`, updatedData);
      console.log(response);
      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, ...updatedData } : user
        ),
      }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  },
}));

export default useUserStore;
