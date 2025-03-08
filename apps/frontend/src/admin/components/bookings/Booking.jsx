import React, { useState } from "react";
import { Search, Filter, Check, X } from "lucide-react";

const BookingsManagement = () => {
  // Sample bookings data based on the provided structure
  const [bookings, setBookings] = useState([
    {
      _id: "67c89622f11980648a0f3389",
      venueId: {
        _id: "67c5934c205b559f79d9e632",
        abbreviation: "JJ10",
        block: "Block J",
        capacity: 60,
        name: "Discussion Room12",
        status: "available",
      },
      userId: "67c7e7a43484815840aa4d31",
      studentName: "Alice Johnson", // Added for display purposes
      bookingDate: "2025-03-15", // Added for display purposes
      status: "approved",
      createdAt: "2025-03-05T18:21:22.299Z",
      updatedAt: "2025-03-05T18:21:22.299Z",
    },
    {
      _id: "67c89622f11980648a0f3390",
      venueId: {
        _id: "67c5934c205b559f79d9e633",
        abbreviation: "KL05",
        block: "Block K",
        capacity: 30,
        name: "Seminar Room 5",
        status: "available",
      },
      userId: "67c7e7a43484815840aa4d32",
      studentName: "Bob Smith", // Added for display purposes
      bookingDate: "2025-03-18", // Added for display purposes
      status: "pending",
      createdAt: "2025-03-06T10:15:42.299Z",
      updatedAt: "2025-03-06T10:15:42.299Z",
    },
    {
      _id: "67c89622f11980648a0f3391",
      venueId: {
        _id: "67c5934c205b559f79d9e634",
        abbreviation: "LL20",
        block: "Block L",
        capacity: 100,
        name: "Lecture Hall 2",
        status: "available",
      },
      userId: "67c7e7a43484815840aa4d33",
      studentName: "Charlie Davis", // Added for display purposes
      bookingDate: "2025-03-20", // Added for display purposes
      status: "rejected",
      createdAt: "2025-03-06T14:30:10.299Z",
      updatedAt: "2025-03-06T14:30:10.299Z",
    },
    {
      _id: "67c89622f11980648a0f3392",
      venueId: {
        _id: "67c5934c205b559f79d9e635",
        abbreviation: "MM01",
        block: "Block M",
        capacity: 25,
        name: "Meeting Room 1",
        status: "available",
      },
      userId: "67c7e7a43484815840aa4d34",
      studentName: "Diana Williams", // Added for display purposes
      bookingDate: "2025-03-22", // Added for display purposes
      status: "pending",
      createdAt: "2025-03-07T09:45:22.299Z",
      updatedAt: "2025-03-07T09:45:22.299Z",
    },
  ]);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Function to handle status change
  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  // Filter bookings based on search term and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.venueId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.studentName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Bookings Management
        </h1>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search venues or students..."
              className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                statusFilter === "all"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800 border border-slate-300"
              }`}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                statusFilter === "pending"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800 border border-slate-300"
              }`}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                statusFilter === "approved"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-800 border border-slate-300"
              }`}
              onClick={() => setStatusFilter("approved")}
            >
              Approved
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
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

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Venue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-slate-800">
                            {booking.venueId.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {booking.venueId.abbreviation},{" "}
                            {booking.venueId.block}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-slate-800">
                          {booking.studentName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-slate-800">
                          {booking.bookingDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {booking.status === "pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleStatusChange(booking._id, "approved")
                              }
                              className="bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-full"
                              title="Approve"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(booking._id, "rejected")
                              }
                              className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-full"
                              title="Reject"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        {booking.status !== "pending" && (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-slate-500"
                    >
                      No bookings found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination - simplified for demo */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-slate-600">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-800 hover:bg-slate-50">
              Previous
            </button>
            <button className="px-4 py-2 border border-slate-300 rounded-md bg-white text-slate-800 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsManagement;
