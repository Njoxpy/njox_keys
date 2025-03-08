import React, { useState } from "react";
import {
  Calendar,
  Download,
  FileText,
  Key,
  MapPin,
  Printer,
  User,
} from "lucide-react";

const AdminReportsDashboard = () => {
  // Sample data
  const stats = {
    totalOrders: 248,
    keysNotReturned: 32,
    venuesBooked: 15,
    mostRequestedVenue: "Main Auditorium",
  };

  const recentOrders = [
    {
      id: "KMS-2458",
      venue: "Main Auditorium",
      student: "Alex Johnson",
      employee: "Emily Smith",
      status: "Approved",
      date: "2025-03-05",
    },
    {
      id: "KMS-2457",
      venue: "Science Lab B",
      student: "Michael Chang",
      employee: "David Wilson",
      status: "Pending",
      date: "2025-03-05",
    },
    {
      id: "KMS-2456",
      venue: "Conference Room 3",
      student: "Sarah Miller",
      employee: "Emily Smith",
      status: "Rejected",
      date: "2025-03-04",
    },
    {
      id: "KMS-2455",
      venue: "Main Auditorium",
      student: "Jessica Thompson",
      employee: "Robert Lee",
      status: "Approved",
      date: "2025-03-04",
    },
    {
      id: "KMS-2454",
      venue: "Music Room",
      student: "Daniel Brown",
      employee: "Emily Smith",
      status: "Approved",
      date: "2025-03-03",
    },
  ];

  const keysNotReturned = [
    {
      venue: "Main Auditorium",
      student: "Alex Johnson",
      dueDate: "2025-03-04",
      status: "Not Returned",
      overdue: true,
    },
    {
      venue: "Conference Room 3",
      student: "Sarah Miller",
      dueDate: "2025-03-06",
      status: "Not Returned",
      overdue: false,
    },
    {
      venue: "Science Lab B",
      student: "Michael Chang",
      dueDate: "2025-03-01",
      status: "Not Returned",
      overdue: true,
    },
    {
      venue: "Music Room",
      student: "Daniel Brown",
      dueDate: "2025-02-28",
      status: "Not Returned",
      overdue: true,
    },
  ];

  const venueBookings = [
    { venue: "Main Auditorium", count: 78 },
    { venue: "Conference Room 3", count: 56 },
    { venue: "Science Lab B", count: 42 },
    { venue: "Music Room", count: 38 },
    { venue: "Library Study Room", count: 34 },
  ];

  const ordersTimeline = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [35, 42, 56, 48, 62, 54],
  };

  // UI State
  const [activeTab, setActiveTab] = useState("recent");
  const [timelineView, setTimelineView] = useState("monthly");

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      Approved: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Rejected: "bg-red-100 text-red-800",
      "Not Returned": "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-800 py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            Key Management System
          </h1>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-1">
              <Download size={16} />
              Export
            </button>
            <button className="bg-white text-slate-800 hover:bg-slate-100 px-3 py-1 rounded-md flex items-center gap-1">
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Admin Reports Dashboard
          </h2>

          {/* Overview Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-white shadow-sm border-l-4 border-blue-500 rounded">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-md text-blue-600">
                  <FileText size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white shadow-sm border-l-4 border-red-500 rounded">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-500">Keys Not Returned</p>
                  <p className="text-2xl font-bold">{stats.keysNotReturned}</p>
                </div>
                <div className="bg-red-100 p-2 rounded-md text-red-600">
                  <Key size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white shadow-sm border-l-4 border-purple-500 rounded">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-500">Venues Booked</p>
                  <p className="text-2xl font-bold">{stats.venuesBooked}</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-md text-purple-600">
                  <MapPin size={24} />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white shadow-sm border-l-4 border-amber-500 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">Most Requested</p>
                  <p className="text-lg font-bold">
                    {stats.mostRequestedVenue}
                  </p>
                </div>
                <div className="bg-amber-100 p-2 rounded-md text-amber-600">
                  <MapPin size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Custom Tabs */}
          <div className="mb-4">
            <div className="bg-slate-400 p-1 rounded-md inline-flex">
              <button
                onClick={() => setActiveTab("recent")}
                className={`px-4 py-2 rounded ${
                  activeTab === "recent" ? "bg-blue-600 text-white" : ""
                } transition-colors duration-150`}
              >
                Recent Orders
              </button>
              <button
                onClick={() => setActiveTab("unreturned")}
                className={`px-4 py-2 rounded ${
                  activeTab === "unreturned" ? "bg-blue-600 text-white" : ""
                } transition-colors duration-150`}
              >
                Keys Not Returned
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 rounded ${
                  activeTab === "analytics" ? "bg-blue-600 text-white" : ""
                } transition-colors duration-150`}
              >
                Analytics
              </button>
            </div>
          </div>

          {/* Recent Orders Tab */}
          {activeTab === "recent" && (
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <h3 className="font-bold">Recent Orders</h3>
                <div className="flex gap-2 flex-wrap">
                  <select className="bg-slate-50 rounded-md text-sm px-2 py-1 border border-slate-200">
                    <option>All Statuses</option>
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Rejected</option>
                  </select>
                  <select className="bg-slate-50 rounded-md text-sm px-2 py-1 border border-slate-200">
                    <option>All Venues</option>
                    <option>Main Auditorium</option>
                    <option>Conference Room 3</option>
                    <option>Science Lab B</option>
                  </select>
                  <button className="bg-slate-50 rounded-md text-sm px-2 py-1 border border-slate-200 flex items-center gap-1">
                    <Calendar size={14} />
                    Date Range
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-sm text-slate-500">
                      <th className="px-4 py-2 font-medium">Order ID</th>
                      <th className="px-4 py-2 font-medium">Venue</th>
                      <th className="px-4 py-2 font-medium">Student</th>
                      <th className="px-4 py-2 font-medium">Employee</th>
                      <th className="px-4 py-2 font-medium">Status</th>
                      <th className="px-4 py-2 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-slate-100">
                    {recentOrders.map((order, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-blue-600 font-medium">
                          {order.id}
                        </td>
                        <td className="px-4 py-3">{order.venue}</td>
                        <td className="px-4 py-3">{order.student}</td>
                        <td className="px-4 py-3">{order.employee}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-500">
                          {order.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
                <p className="text-sm text-slate-500">
                  Showing 5 of 248 orders
                </p>
                <div className="flex gap-1">
                  <button className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-sm">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Keys Not Returned Tab */}
          {activeTab === "unreturned" && (
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <h3 className="font-bold">Keys Not Returned</h3>
                <select className="bg-slate-50 rounded-md text-sm px-2 py-1 border border-slate-200">
                  <option>All Venues</option>
                  <option>Main Auditorium</option>
                  <option>Conference Room 3</option>
                  <option>Science Lab B</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-sm text-slate-500">
                      <th className="px-4 py-2 font-medium">Venue</th>
                      <th className="px-4 py-2 font-medium">Student</th>
                      <th className="px-4 py-2 font-medium">Due Date</th>
                      <th className="px-4 py-2 font-medium">Status</th>
                      <th className="px-4 py-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-slate-100">
                    {keysNotReturned.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          item.overdue
                            ? "bg-red-50 hover:bg-red-100"
                            : "hover:bg-slate-50"
                        }
                      >
                        <td className="px-4 py-3">{item.venue}</td>
                        <td className="px-4 py-3">{item.student}</td>
                        <td className="px-4 py-3 text-sm">
                          {item.dueDate}
                          {item.overdue && (
                            <span className="ml-2 text-red-600 text-xs font-medium">
                              OVERDUE
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:underline text-sm">
                            Send Reminder
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Most Booked Venues */}
              <div className="bg-white p-4 rounded shadow-sm">
                <h3 className="font-bold mb-4">Most Booked Venues</h3>
                <div className="h-64">
                  {/* Bar Chart Representation */}
                  <div className="flex h-full items-end space-x-2">
                    {venueBookings.map((venue, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-t"
                          style={{ height: `${(venue.count / 80) * 100}%` }}
                        ></div>
                        <p className="text-xs text-slate-500 mt-2 truncate w-full text-center">
                          {venue.venue}
                        </p>
                        <p className="text-sm font-medium">{venue.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Orders Trend */}
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h3 className="font-bold">Orders Trend</h3>
                  <div className="bg-slate-100 rounded-md p-1 text-sm">
                    <button
                      onClick={() => setTimelineView("daily")}
                      className={`px-2 py-1 rounded ${
                        timelineView === "daily" ? "bg-blue-600 text-white" : ""
                      }`}
                    >
                      Daily
                    </button>
                    <button
                      onClick={() => setTimelineView("weekly")}
                      className={`px-2 py-1 rounded ${
                        timelineView === "weekly"
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                    >
                      Weekly
                    </button>
                    <button
                      onClick={() => setTimelineView("monthly")}
                      className={`px-2 py-1 rounded ${
                        timelineView === "monthly"
                          ? "bg-blue-600 text-white"
                          : ""
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                <div className="h-64">
                  {/* Line Chart Representation */}
                  <div className="h-full flex items-end relative">
                    <div className="absolute left-0 top-0 h-full w-full">
                      <div className="border-b border-slate-200 h-1/4 relative">
                        <span className="absolute -left-6 -top-3 text-xs text-slate-500">
                          60
                        </span>
                      </div>
                      <div className="border-b border-slate-200 h-1/4 relative">
                        <span className="absolute -left-6 -top-3 text-xs text-slate-500">
                          45
                        </span>
                      </div>
                      <div className="border-b border-slate-200 h-1/4 relative">
                        <span className="absolute -left-6 -top-3 text-xs text-slate-500">
                          30
                        </span>
                      </div>
                      <div className="border-b border-slate-200 h-1/4 relative">
                        <span className="absolute -left-6 -top-3 text-xs text-slate-500">
                          15
                        </span>
                      </div>
                    </div>

                    <svg
                      className="h-full w-full"
                      viewBox="0 0 600 240"
                      preserveAspectRatio="none"
                    >
                      <path
                        d={`M0,${240 - (ordersTimeline.data[0] / 70) * 240} 
                            L${100},${
                          240 - (ordersTimeline.data[1] / 70) * 240
                        } 
                            L${200},${
                          240 - (ordersTimeline.data[2] / 70) * 240
                        } 
                            L${300},${
                          240 - (ordersTimeline.data[3] / 70) * 240
                        } 
                            L${400},${
                          240 - (ordersTimeline.data[4] / 70) * 240
                        } 
                            L${500},${
                          240 - (ordersTimeline.data[5] / 70) * 240
                        }`}
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3"
                      />
                      <path
                        d={`M0,${240 - (ordersTimeline.data[0] / 70) * 240} 
                            L${100},${
                          240 - (ordersTimeline.data[1] / 70) * 240
                        } 
                            L${200},${
                          240 - (ordersTimeline.data[2] / 70) * 240
                        } 
                            L${300},${
                          240 - (ordersTimeline.data[3] / 70) * 240
                        } 
                            L${400},${
                          240 - (ordersTimeline.data[4] / 70) * 240
                        } 
                            L${500},${
                          240 - (ordersTimeline.data[5] / 70) * 240
                        } 
                            L${500},240 L0,240 Z`}
                        fill="url(#blue-gradient)"
                        fillOpacity="0.2"
                      />
                      <defs>
                        <linearGradient
                          id="blue-gradient"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop
                            offset="100%"
                            stopColor="#2563eb"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-xs text-slate-500">
                      {ordersTimeline.labels.map((label, index) => (
                        <span key={index}>{label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminReportsDashboard;
