import { create } from "zustand";
import API from "../utils/api"; // Axios instance

const useVenueStore = create((set) => ({
  venues: [],
  loading: false,

  // Fetch all venues
  fetchVenues: async () => {
    set({ loading: true });
    try {
      const response = await API.get("/venues");
      set({ venues: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching venues:", error);
      set({ loading: false });
    }
  },

  // Update venue status (available/booked)
  updateVenueStatus: async (venueId, status) => {
    try {
      const response = await API.patch(`/venues/${venueId}`, { status });
      set((state) => ({
        venues: state.venues.map((venue) =>
          venue._id === venueId
            ? { ...venue, status: response.data.status }
            : venue
        ),
      }));
    } catch (error) {
      console.error("Error updating venue status:", error);
    }
  },
}));

export default useVenueStore;
