// services/userService.jsx

import API from "../utils/api"; // Axios instance for API requests

// Function to log in a user
export const loginUser = async (loginData) => {
  try {
    const response = await API.post("/auth/login", loginData); // POST to login
    return response.data; // Return user data or token
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Function to register a new user (student or employee)
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/users/register", userData); // POST to register
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Function to get user profile data
export const fetchUserProfile = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}`); // GET user profile data
    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile with ID ${userId}:`, error);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await API.patch(`/users/${userId}`, userData); // PATCH to update
    return response.data;
  } catch (error) {
    console.error(`Error updating profile for user ${userId}:`, error);
    throw error;
  }
};

// services/userService.jsx

// Function to delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`/users/${userId}`); // Send DELETE request to backend
    return response.data; // Return the response data (success message or deleted user object)
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error; // Throw the error for further handling
  }
};
