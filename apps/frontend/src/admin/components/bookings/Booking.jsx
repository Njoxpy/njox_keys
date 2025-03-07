import { useState } from "react";
import { Search, Check, X, ChevronUp, ChevronDown } from "lucide-react";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([
    {
      _id: "67c89622f11980648a0f3389",
      venueId: {
        _id: "67c5934c205b559f79d9e632",
        name: "Discussion Room12",
      },
      userId: "67c7e7a43484815840aa4d31",
      status: "approved",
      createdAt: "2025-03-05T18:21:22.299Z",
    },
    {
      _id: "67c89622f11980648a0f3390",
      venueId: {
        _id: "67c5934c205b559f79d9e633",
        name: "Conference Hall A",
      },
      userId: "67c7e7a43484815840aa4d32",
      status: "pending",
      createdAt: "2025-03-04T12:15:10.299Z",
    },
    {
      _id: "67c89622f11980648a0f3391",
      venueId: {
        _id: "67c5934c205b559f79d9e634",
        name: "Workshop Room B",
      },
      userId: "67c7e7a43484815840aa4d33",
      status: "rejected",
      createdAt: "2025-03-06T09:45:30.299Z",
    },
    // Add more sample data here
  ]);

  const [filter, setFilter] = useState("all"); // Filter by status
  const [searchQuery, setSearchQuery] = useState(""); // Search by venue name
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Sorting
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const bookingsPerPage = 5; // Number of bookings per page

  // Handle Approve
  const handleApprove = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === id ? { ...booking, status: "approved" } : booking
      )
    );
  };

  // Handle Reject
  const handleReject = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === id ? { ...booking, status: "rejected" } : booking
      )
    );
  };

  // Filter bookings by status and search query
  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === "all" || booking.status === filter;
    const matchesSearch = booking.venueId.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = sortedBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        Bookings Management
      </h1>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Filters */}
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-blue-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-md ${
              filter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-blue-100"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-md ${
              filter === "approved"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-blue-100"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-md ${
              filter === "rejected"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-blue-100"
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by venue name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-slate-700 cursor-pointer"
                onClick={() => handleSort("venueId.name")}
              >
                Venue
                {sortConfig.key === "venueId.name" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Student ID
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-slate-700 cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Date
                {sortConfig.key === "createdAt" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </span>
                )}
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-slate-700 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status
                {sortConfig.key === "status" && (
                  <span className="ml-2">
                    {sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {currentBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {booking.venueId.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {booking.userId}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : booking.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {booking.status === "pending" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(booking._id)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 flex items-center"
                      >
                        <Check size={16} className="mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(booking._id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 flex items-center"
                      >
                        <X size={16} className="mr-2" />
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from(
          { length: Math.ceil(filteredBookings.length / bookingsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
