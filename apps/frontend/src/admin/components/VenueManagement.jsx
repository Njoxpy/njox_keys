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

const baseURL = "http://localhost:3000"; // Base URL for fetching images

const VenuesManagement = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [venueToDelete, setVenueToDelete] = useState(null);

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

  // Fetch venues from the API
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/venues`);
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error("Error fetching venues:", error);
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
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  const handleEditVenue = (venue) => {
    setFormData({
      abbreviation: venue.abbreviation,
      block: venue.block,
      capacity: venue.capacity,
      venueNumber: venue.venueNumber,
      description: venue.description,
      equipment: venue.equipment.join(", "),
      images: venue.images,
      name: venue.name,
      status: venue.status,
    });
    setCurrentVenue(venue);
    setIsModalOpen(true);
  };

  // Handle delete confirmation prompt
  const handleDeletePrompt = (venue) => {
    setVenueToDelete(venue);
    setIsDeleteModalOpen(true);
  };

  // Handle deleting a venue
  const handleDeleteVenue = async () => {
    try {
      await fetch(`${baseURL}/api/v1/venues/${venueToDelete._id}`, {
        method: "DELETE",
      });
      setVenues(venues.filter((venue) => venue._id !== venueToDelete._id));
      setIsDeleteModalOpen(false);
      setVenueToDelete(null);
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (add/edit venue)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newVenue = {
      abbreviation: formData.abbreviation,
      block: formData.block,
      capacity: parseInt(formData.capacity),
      venueNumber: parseInt(formData.venueNumber),
      description: formData.description,
      equipment: formData.equipment.split(",").map((item) => item.trim()),
      images: formData.images,
      name: formData.name,
      status: formData.status,
    };

    try {
      if (currentVenue) {
        // Edit existing venue
        const response = await fetch(
          `${baseURL}/api/v1/venues/${currentVenue._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newVenue),
          }
        );
        const updatedVenue = await response.json();
        setVenues(
          venues.map((venue) =>
            venue._id === currentVenue._id ? updatedVenue : venue
          )
        );
      } else {
        // Add new venue
        const response = await fetch(`${baseURL}/api/v1/venues`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVenue),
        });
        const addedVenue = await response.json();
        setVenues([...venues, addedVenue]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving venue:", error);
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
                  src={`${baseURL}${venue.images[0]}`} // Fetch image using baseURL
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      venue.status
                    )}`}
                  >
                    {venue.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {venue.name}
                </h3>

                <div className="flex items-center text-slate-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{venue.block}</span>
                </div>

                <div className="flex items-center text-slate-600 mb-2">
                  <Users size={16} className="mr-1" />
                  <span className="text-sm">Capacity: {venue.capacity}</span>
                </div>

                <div className="flex items-center text-slate-600 mb-2">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">
                    Venue Number: {venue.venueNumber}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-slate-500 mb-1">Equipment:</p>
                  <div className="flex flex-wrap gap-1">
                    {venue.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
          <p className="text-slate-600">
            No venues found matching your search criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
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

      {/* Add/Edit Venue Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center bg-slate-800 text-white px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">
                {currentVenue ? "Edit Venue" : "Add New Venue"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Abbreviation
                  </label>
                  <input
                    type="text"
                    name="abbreviation"
                    value={formData.abbreviation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Equipment (comma separated)
                  </label>
                  <input
                    type="text"
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Chairs, Whiteboard"
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                  </select>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Venue Images
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                    <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-500">
                      Drag & drop an image or click to browse
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-sm text-blue-600"
                    >
                      Select File
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  {currentVenue ? "Update Venue" : "Add Venue"}
                </button>
              </div>
            </form>
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
    </div>
  );
};

export default VenuesManagement;
