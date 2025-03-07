import React, { useState } from "react";
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
} from "lucide-react";

import Venue from "../.././assets/venue.jpg";

const VenuesManagement = () => {
  const [venues, setVenues] = useState([
    {
      id: 1,
      name: "Grand Conference Hall",
      image: Venue,
      capacity: 250,
      location: "Downtown",
      hourlyRate: 150,
      amenities: ["Wi-Fi", "Projector", "Sound System", "Catering"],
      availability: "Available",
    },
    {
      id: 2,
      name: "Studio Workshop Space",
      image: Venue,
      capacity: 30,
      location: "East Wing",
      hourlyRate: 75,
      amenities: ["Whiteboard", "Tables", "Wi-Fi"],
      availability: "Booked",
    },
    {
      id: 3,
      name: "Executive Meeting Room",
      image: Venue,
      capacity: 15,
      location: "North Tower",
      hourlyRate: 95,
      amenities: ["Video Conferencing", "Coffee Bar", "Wi-Fi"],
      availability: "Available",
    },
    {
      id: 4,
      name: "Auditorium",
      image: Venue,
      capacity: 400,
      location: "South Campus",
      hourlyRate: 220,
      amenities: ["Stage", "Premium Sound", "Lighting", "Wi-Fi"],
      availability: "Maintenance",
    },
    {
      id: 5,
      name: "Training Room A",
      image: Venue,
      capacity: 50,
      location: "West Building",
      hourlyRate: 85,
      amenities: ["Computers", "Whiteboard", "Wi-Fi"],
      availability: "Available",
    },
    {
      id: 6,
      name: "Outdoor Pavilion",
      image: Venue,
      capacity: 120,
      location: "Garden Area",
      hourlyRate: 110,
      amenities: ["Weather Protection", "Picnic Tables", "Power Outlets"],
      availability: "Available",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [venueToDelete, setVenueToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    location: "",
    hourlyRate: "",
    amenities: "",
    availability: "Available",
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddVenue = () => {
    setFormData({
      name: "",
      capacity: "",
      location: "",
      hourlyRate: "",
      amenities: "",
      availability: "Available",
    });
    setCurrentVenue(null);
    setIsModalOpen(true);
  };

  const handleEditVenue = (venue) => {
    setFormData({
      name: venue.name,
      capacity: venue.capacity,
      location: venue.location,
      hourlyRate: venue.hourlyRate,
      amenities: venue.amenities.join(", "),
      availability: venue.availability,
    });
    setCurrentVenue(venue);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (venue) => {
    setVenueToDelete(venue);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteVenue = () => {
    setVenues(venues.filter((venue) => venue.id !== venueToDelete.id));
    setIsDeleteModalOpen(false);
    setVenueToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVenue = {
      id: currentVenue ? currentVenue.id : venues.length + 1,
      name: formData.name,
      image: Venue, // Placeholder image for new venues
      capacity: parseInt(formData.capacity),
      location: formData.location,
      hourlyRate: parseInt(formData.hourlyRate),
      amenities: formData.amenities.split(",").map((item) => item.trim()),
      availability: formData.availability,
    };

    if (currentVenue) {
      // Edit existing venue
      setVenues(
        venues.map((venue) => (venue.id === currentVenue.id ? newVenue : venue))
      );
    } else {
      // Add new venue
      setVenues([...venues, newVenue]);
    }

    setIsModalOpen(false);
  };

  // Function to determine status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-600";
      case "Booked":
        return "bg-blue-100 text-blue-600";
      case "Maintenance":
        return "bg-orange-100 text-orange-600";
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
      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      venue.availability
                    )}`}
                  >
                    {venue.availability}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {venue.name}
                </h3>

                <div className="flex items-center text-slate-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{venue.location}</span>
                </div>

                <div className="flex items-center text-slate-600 mb-2">
                  <Users size={16} className="mr-1" />
                  <span className="text-sm">Capacity: {venue.capacity}</span>
                </div>

                <div className="flex items-center text-slate-600 mb-2">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">${venue.hourlyRate}/hour</span>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-slate-500 mb-1">Amenities:</p>
                  <div className="flex flex-wrap gap-1">
                    {venue.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                      >
                        {amenity}
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
                    Venue Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Amenities (comma separated)
                  </label>
                  <input
                    type="text"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Wi-Fi, Projector, Tables"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Venue Image
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
