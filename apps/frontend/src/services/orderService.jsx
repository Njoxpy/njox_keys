// services/orderService.jsx

import API from "../utils/api"; // Axios instance for API requests

// Function to create a new order
export const createOrder = async (orderData) => {
  try {
    const response = await API.post("/orders", orderData); // Send POST request to the API
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; // Throw error for further handling
  }
};

// Function to fetch all orders
export const fetchOrders = async () => {
  try {
    const response = await API.get("/orders"); // Send GET request to fetch orders
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Function to fetch a specific order by ID
export const fetchOrderById = async (orderId) => {
  try {
    const response = await API.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with ID ${orderId}:`, error);
    throw error;
  }
};

// Function to update the status of an order
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await API.patch(`/orders/${orderId}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status of order ${orderId}:`, error);
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const response = await API.delete(`/orders/${orderId}`); // Send DELETE request to backend
    return response.data; // Return the response data, which may contain a success message or deleted object
  } catch (error) {
    console.error(`Error deleting order with ID ${orderId}:`, error);
    throw error; // Throw the error for further handling
  }
};
