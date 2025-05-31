import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  MapPin,
  Users,
  Clock,
  Upload,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Venue from "../../assets/venue.jpg";
import { Book } from "react-feather";

const baseURL = "http://localhost:5000"; // Base URL for fetching images

const VenuesManagement = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [venueToDelete, setVenueToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  // Form state
  const [formData, setFormData] = useState({
    abbreviation: "",
    block: "",
    capacity: "",
    venueNumber: "",
    description: "",
    equipment: "",
    images: [],
    name: "",
    status: "available",
  });

  // Add new state for file input
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Add new state for status update modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [venueToUpdateStatus, setVenueToUpdateStatus] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Prepare headers with authentication token
  const getAuthHeaders = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  };

  // Fetch venues from the API
  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/api/v1/venues`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Handle "no venues" response
        if (data.message === "There no venues for now") {
          setVenues([]);
          setError(null);
          return;
        }

        // Extract venues array from response data
        let venuesData = [];
        if (Array.isArray(data)) {
          venuesData = data;
        } else if (data.venues && Array.isArray(data.venues)) {
          venuesData = data.venues;
        } else if (data.data && Array.isArray(data.data)) {
          venuesData = data.data;
        } else if (data.newVenue) {
          // Handle single venue response
          venuesData = [data.newVenue];
        } else {
          console.error("API response format is unexpected:", data);
          setError("Failed to load venues. Please try again.");
          venuesData = [];
        }

        // Validate venue objects before setting state
        const validVenues = venuesData.filter(
          (venue) =>
            venue &&
            typeof venue === "object" &&
            venue.name &&
            typeof venue.name === "string"
        );

        setVenues(validVenues);
        setError(null);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError("Failed to load venues. Please try again.");
        setVenues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Filter venues based on search query
  const filteredVenues = venues.length
    ? venues.filter((venue) =>
        venue && venue.name
          ? venue.name.toLowerCase().includes(searchQuery.toLowerCase())
          : false
      )
    : [];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVenues = filteredVenues.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle adding a new venue
  const handleAddVenue = () => {
    setFormData({
      abbreviation: "",
      block: "",
      capacity: "",
      venueNumber: "",
      description: "",
      equipment: "",
      images: [],
      name: "",
      status: "available",
    });
    setCurrentVenue(null);
    setIsModalOpen(true);
  };

  // Handle editing a venue
  const handleEditVenue = async (venue) => {
    try {
      // Fetch the latest venue data
      const response = await fetch(`${baseURL}/api/v1/venues/${venue._id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const venueData = data.data || data;

      // Set form data with the latest venue data
      setFormData({
        abbreviation: venueData.abbreviation || "",
        block: venueData.block || "",
        capacity: venueData.capacity || "",
        venueNumber: venueData.venueNumber || "",
        description: venueData.description || "",
        equipment: Array.isArray(venueData.equipment)
          ? venueData.equipment.join(", ")
          : "",
        name: venueData.name || "",
        status: venueData.status || "available",
      });
      setCurrentVenue(venueData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching venue details:", error);
      setError("Failed to load venue details. Please try again.");
    }
  };

  // Handle delete confirmation prompt
  const handleDeletePrompt = (venue) => {
    setVenueToDelete(venue);
    setIsDeleteModalOpen(true);
  };

  // Handle deleting a venue
  const handleDeleteVenue = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/venues/${venueToDelete._id}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setVenues(venues.filter((venue) => venue._id !== venueToDelete._id));
      setIsDeleteModalOpen(false);
      setVenueToDelete(null);
    } catch (error) {
      console.error("Error deleting venue:", error);
      setError("Failed to delete venue. Please try again.");
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "equipment") {
      // Convert both bullet points and commas to consistent separator
      const cleanedValue = value.replace(/[•,]/g, ",");
      setFormData({
        ...formData,
        [name]: cleanedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setError("Maximum 3 images allowed");
      return;
    }
    setSelectedFiles(files);
  };

  // Handle form submission (add/edit venue)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = {
      name: formData.name,
      abbreviation: formData.abbreviation,
      block: formData.block,
      description: formData.description,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value || value.trim() === "") {
        setError(
          `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty!`
        );
        return;
      }
    }

    // Validate numeric fields
    const capacity = parseInt(formData.capacity);
    const venueNumber = parseInt(formData.venueNumber);

    if (!Number.isInteger(capacity) || capacity <= 0) {
      setError("Capacity must be a positive integer!");
      return;
    }

    if (!Number.isInteger(venueNumber) || venueNumber <= 0) {
      setError("Venue number must be a positive integer!");
      return;
    }

    // Create FormData instance
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("abbreviation", formData.abbreviation.trim());
    formDataToSend.append("block", formData.block.trim());
    formDataToSend.append("capacity", capacity);
    formDataToSend.append("venueNumber", venueNumber);
    formDataToSend.append("description", formData.description.trim());
    formDataToSend.append("status", formData.status);

    // Handle equipment array
    const equipmentArray = formData.equipment
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    formDataToSend.append("equipment", JSON.stringify(equipmentArray));

    // Append image files only if new files are selected
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });
    }

    try {
      if (currentVenue) {
        // Edit existing venue
        const response = await fetch(
          `${baseURL}/api/v1/venues/${currentVenue._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: getToken() ? `Bearer ${getToken()}` : "",
            },
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const updatedVenue = await response.json();
        const venueData = updatedVenue.data || updatedVenue;

        setVenues((prevVenues) =>
          prevVenues.map((venue) =>
            venue._id === currentVenue._id ? venueData : venue
          )
        );
      } else {
        // Add new venue
        const response = await fetch(`${baseURL}/api/v1/venues`, {
          method: "POST",
          headers: {
            Authorization: getToken() ? `Bearer ${getToken()}` : "",
          },
          body: formDataToSend,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! Status: ${response.status}`
          );
        }

        const addedVenue = await response.json();
        const newVenue = addedVenue.newVenue || addedVenue.data || addedVenue;

        if (!newVenue || typeof newVenue !== "object" || !newVenue.name) {
          throw new Error("Invalid venue data received from server");
        }

        setVenues((prevVenues) => [...prevVenues, newVenue]);
      }
      setIsModalOpen(false);
      setSelectedFiles([]);
      setError(null);
      setCurrentVenue(null);
    } catch (error) {
      console.error("Error saving venue:", error);
      setError(error.message || "Failed to save venue. Please try again.");
    }
  };

  // Function to determine status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-600";
      case "booked":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Handle status update modal
  const handleStatusUpdateClick = (venue) => {
    setVenueToUpdateStatus(venue);
    setNewStatus(venue.status);
    setIsStatusModalOpen(true);
  };

  // Handle status update
  const handleStatusUpdate = async () => {
    try {
      if (venueToUpdateStatus.status === newStatus) {
        setError(`Venue is already in the ${newStatus} status.`);
        return;
      }

      const response = await fetch(
        `${baseURL}/api/v1/venues/${venueToUpdateStatus._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken() ? `Bearer ${getToken()}` : "",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      const updatedVenue = data.updatedVenueStatus;

      // Update venues list with new status
      setVenues((prevVenues) =>
        prevVenues.map((venue) =>
          venue._id === venueToUpdateStatus._id ? updatedVenue : venue
        )
      );

      setIsStatusModalOpen(false);
      setVenueToUpdateStatus(null);
      setNewStatus("");
      setError(null);
    } catch (error) {
      console.error("Error updating venue status:", error);
      setError(
        error.message || "Failed to update venue status. Please try again."
      );
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Venues Management
          </h1>
          <p className="text-slate-600">
            Manage your available venues and spaces
          </p>
        </div>
        <button
          onClick={handleAddVenue}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add New Venue
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search venues..."
          className="pl-10 pr-4 py-2 w-full md:w-1/2 lg:w-1/3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-slate-600">Loading venues...</p>
        </div>
      ) : (
        <>
          {/* Venues Grid */}
          {currentVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentVenues.map((venue) => (
                <div
                  key={venue._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={
                        venue.images && venue.images.length > 0
                          ? `${baseURL}/${venue.images[0]}`
                          : Venue
                      }
                      alt={venue.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Venue;
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleStatusUpdateClick(venue)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          venue.status
                        )} hover:opacity-80 transition-opacity cursor-pointer`}
                      >
                        {venue.status}
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {venue.name}
                    </h3>

                    <div className="flex items-center text-slate-600 mb-2">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{venue.block || "N/A"}</span>
                    </div>

                    <div className="flex items-center text-slate-600 mb-2">
                      <Users size={16} className="mr-1" />
                      <span className="text-sm">
                        Capacity: {venue.capacity || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center text-slate-600 mb-2">
                      <Clock size={16} className="mr-1" />
                      <span className="text-sm">
                        Venue Number: {venue.venueNumber || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center text-slate-600 mb-2">
                      <Book size={16} className="mr-1" />
                      <span className="text-sm">
                        Description: {venue.description || "N/A"}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-slate-500 mb-1">Equipment:</p>
                      <p className="text-sm text-slate-700">
                        {Array.isArray(venue.equipment) &&
                        venue.equipment.length > 0
                          ? venue.equipment
                              .map(
                                (item) =>
                                  item.charAt(0).toUpperCase() + item.slice(1)
                              )
                              .join(" • ")
                          : "No equipment listed"}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        onClick={() => handleEditVenue(venue)}
                        className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeletePrompt(venue)}
                        className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  No Venues Found
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery
                    ? "No venues match your search criteria. Try adjusting your search terms."
                    : "There are no venues available at the moment. Click the 'Add New Venue' button to create one."}
                </p>
                {!searchQuery && (
                  <button
                    onClick={handleAddVenue}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={18} className="mr-2" />
                    Add New Venue
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Pagination */}
          {filteredVenues.length > itemsPerPage && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg mr-2 disabled:opacity-50"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastItem >= filteredVenues.length}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg disabled:opacity-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Venue Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  {currentVenue ? "Edit Venue" : "Add New Venue"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Abbreviation
                    </label>
                    <input
                      type="text"
                      name="abbreviation"
                      value={formData.abbreviation}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Block
                    </label>
                    <input
                      type="text"
                      name="block"
                      value={formData.block}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Venue Number
                    </label>
                    <input
                      type="number"
                      name="venueNumber"
                      value={formData.venueNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="available">Available</option>
                      <option value="booked">Booked</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Equipment
                  </label>
                  <input
                    type="text"
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="e.g., Projector • Whiteboard • Chairs"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Separate items with commas or bullet points (•)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Images (Max 3)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required={!currentVenue}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload up to 3 images of the venue
                  </p>

                  {/* Image Previews */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {/* Existing Images */}
                    {currentVenue?.images?.map((image, index) => (
                      <div
                        key={`existing-${index}`}
                        className="relative h-24 rounded-lg overflow-hidden"
                      >
                        <img
                          src={`${baseURL}/${image}`}
                          alt={`Venue ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Venue;
                          }}
                        />
                      </div>
                    ))}

                    {/* New Image Previews */}
                    {selectedFiles.map((file, index) => (
                      <div
                        key={`new-${index}`}
                        className="relative h-24 rounded-lg overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Save size={18} className="mr-2" />
                    {currentVenue ? "Update Venue" : "Add Venue"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && venueToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center bg-red-600 text-white px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-1 rounded-full hover:bg-red-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-slate-700 mb-4">
                Are you sure you want to delete{" "}
                <strong>{venueToDelete.name}</strong>? This action cannot be
                undone.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteVenue}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Venue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Update Venue Status
                </h2>
                <button
                  onClick={() => {
                    setIsStatusModalOpen(false);
                    setVenueToUpdateStatus(null);
                    setNewStatus("");
                    setError(null);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <p className="text-slate-600 mb-2">
                  Current Status:{" "}
                  <span className="font-semibold">
                    {venueToUpdateStatus?.status}
                  </span>
                </p>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="available">Available</option>
                  <option value="booked">Booked</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsStatusModalOpen(false);
                    setVenueToUpdateStatus(null);
                    setNewStatus("");
                    setError(null);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenuesManagement;
