// services/venueService.jsx

import API from "../utils/api";

export const fetchVenues = async () => {
  try {
    const response = await API.get("/venues");
    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};

export const fetchVenueById = async (venueId) => {
  try {
    const response = await API.get(`/venues/${venueId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching venue with ID ${venueId}:`, error);
    throw error;
  }
};

export const createVenue = async (venueData) => {
  try {
    const response = await API.post("/venues", venueData);
    return response.data;
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

export const updateVenueStatus = async (venueId, status) => {
  try {
    const response = await API.patch(`/venues/${venueId}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating venue status for ${venueId}:`, error);
    throw error;
  }
};

// Function to delete a venue by ID
export const deleteVenue = async (venueId) => {
  try {
    const response = await API.delete(`/venues/${venueId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting venue with ID ${venueId}:`, error);
    throw error;
  }
};
