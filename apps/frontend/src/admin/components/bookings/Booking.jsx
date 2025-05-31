import React, { useState, useEffect } from "react";
import { Search, Filter, Trash2, KeyRound } from "lucide-react";

const baseURL = "http://localhost:5000";

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Get token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURL}/api/v1/orders`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.message === "No orders for now") {
          setBookings([]);
        } else {
          setBookings(data);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again.");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to handle key return
  const handleKeyReturn = async (bookingId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/orders/return/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ status: "pending" }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the local state to reflect the changes
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "pending" }
            : booking
        )
      );
      setError(null);
    } catch (error) {
      console.error("Error returning keys:", error);
      setError("Failed to process key return. Please try again.");
    }
  };

  // Function to handle booking deletion
  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/v1/orders/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      setError(null);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Failed to delete booking. Please try again.");
    }
  };

  // Filter bookings based on search term and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      (booking.venueId?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (booking.student?.registrationNumber || "")
        .toString()
        .includes(searchTerm.toLowerCase()) ||
      (booking.student?.yearOfStudy || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (booking.employee?.email || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Bookings Management
        </h1>
        <p className="text-slate-600 mb-6">Manage and track venue bookings</p>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === "all"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800 border border-slate-300"
              }`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === "pending"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800 border border-slate-300"
              }`}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === "approved"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800 border border-slate-300"
              }`}
              onClick={() => setStatusFilter("approved")}
            >
              Approved
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === "rejected"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800 border border-slate-300"
              }`}
              onClick={() => setStatusFilter("rejected")}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-slate-600">Loading bookings...</p>
          </div>
        ) : (
          <>
            {/* Bookings Table */}
            {filteredBookings.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full divide-y divide-slate-200 table-fixed">
                  <thead className="bg-slate-800 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">
                        Venue
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">
                        Student
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">
                        Employee
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider w-1/6">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider w-2/6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 truncate">
                          <div className="text-sm font-medium text-slate-800 truncate">
                            {booking.venueId?.name || "N/A"}
                          </div>
                          <div className="text-sm text-slate-600 truncate">
                            {booking.venueId?.block || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-4 truncate">
                          <div className="text-sm text-slate-800 truncate">
                            {booking.student?.registrationNumber || "N/A"}
                          </div>
                          <div className="text-sm text-slate-600 truncate">
                            {booking.student?.yearOfStudy || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-4 truncate">
                          <div className="text-sm text-slate-800 truncate">
                            {booking.employee?.email || "N/A"}
                          </div>
                          <div className="text-sm text-slate-600 truncate">
                            {booking.employee?.role || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600 truncate">
                          {formatDate(booking.createdAt)}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === "approved"
                                  ? "bg-blue-100 text-blue-600"
                                  : booking.status === "rejected"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>

                            <div className="flex items-center space-x-2 ml-2">
                              {booking.status === "approved" && (
                                <button
                                  onClick={() => handleKeyReturn(booking._id)}
                                  className="inline-flex items-center px-3 py-1 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                                >
                                  <KeyRound className="h-4 w-4 mr-1" />
                                  Return
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteBooking(booking._id)}
                                className="inline-flex p-1 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-slate-600">
                  No bookings found matching your search criteria.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingsManagement;
