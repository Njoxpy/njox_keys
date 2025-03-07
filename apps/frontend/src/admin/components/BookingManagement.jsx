import { useState } from "react";
import { Search, Filter, Check, X } from "lucide-react";

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      venue: "Conference Hall A",
      studentName: "John Doe",
      date: "2023-10-15",
      status: "pending",
    },
    {
      id: 2,
      venue: "Workshop Room B",
      studentName: "Jane Smith",
      date: "2023-10-16",
      status: "approved",
    },
    {
      id: 3,
      venue: "Studio C",
      studentName: "Alice Johnson",
      date: "2023-10-17",
      status: "rejected",
    },
    {
      id: 4,
      venue: "Auditorium D",
      studentName: "Bob Brown",
      date: "2023-10-18",
      status: "pending",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleApprove = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "approved" } : booking
      )
    );
  };

  const handleReject = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "rejected" } : booking
      )
    );
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === "all" || booking.status === filter;
    const matchesSearch = booking.studentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
            placeholder="Search by student name..."
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
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Venue
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {booking.venue}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {booking.studentName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {booking.date}
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
                        onClick={() => handleApprove(booking.id)}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(booking.id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200"
                      >
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
    </div>
  );
}
