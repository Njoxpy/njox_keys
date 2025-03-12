import { create } from "zustand";
import API from "../utils/api"; // Axios instance

const useKeyRequestStore = create((set) => ({
  keyRequests: [],
  loading: false,

  // Fetch all key requests
  fetchKeyRequests: async () => {
    set({ loading: true });
    try {
      const response = await API.get("/orders"); // Make sure you have this API endpoint
      set({ keyRequests: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching key requests:", error);
      set({ loading: false });
    }
  },

  // Create new key request
  createKeyRequest: async (requestData) => {
    try {
      const response = await API.post("/orders", requestData); // Post to the API
      set((state) => ({ keyRequests: [...state.keyRequests, response.data] }));
    } catch (error) {
      console.error("Error creating key request:", error);
    }
  },

  // Update key request status (approved/rejected/returned)
  updateKeyRequestStatus: async (requestId, status) => {
    try {
      const response = await API.patch(`/orders/${requestId}`, {
        status,
      });
      set((state) => ({
        keyRequests: state.keyRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: response.data.status }
            : request
        ),
      }));
    } catch (error) {
      console.error("Error updating key request status:", error);
    }
  },
}));

export default useKeyRequestStore;
