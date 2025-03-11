import { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
  X,
  Filter,
  Trash2,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New key request from user John Doe",
      date: "2025-03-09T09:23:42",
      type: "Info",
      read: false,
    },
    {
      id: 2,
      message: "Key #KM-2458 has been successfully assigned",
      date: "2025-03-08T15:12:30",
      type: "Success",
      read: true,
    },
    {
      id: 3,
      message: "Failed login attempt detected",
      date: "2025-03-08T11:45:18",
      type: "Error",
      read: false,
    },
    {
      id: 4,
      message: "Key #KM-1098 is expiring in 5 days",
      date: "2025-03-07T16:30:00",
      type: "Warning",
      read: false,
    },
    {
      id: 5,
      message: "System backup completed successfully",
      date: "2025-03-06T23:00:15",
      type: "Success",
      read: true,
    },
    {
      id: 6,
      message: "Access permission updated for user group 'Managers'",
      date: "2025-03-05T14:25:33",
      type: "Info",
      read: true,
    },
    {
      id: 7,
      message: "Hardware key scanner disconnected",
      date: "2025-03-05T10:17:22",
      type: "Error",
      read: false,
    },
    {
      id: 8,
      message: "License renewal required within 30 days",
      date: "2025-03-04T08:45:10",
      type: "Warning",
      read: true,
    },
  ]);

  const [filters, setFilters] = useState({
    type: "All",
    readStatus: "All",
    startDate: "",
    endDate: "",
  });

  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Handle mark as read/unread
  const toggleReadStatus = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get icon based on notification type
  const getTypeIcon = (type) => {
    switch (type) {
      case "Success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "Warning":
        return <AlertTriangle className="text-amber-500" size={20} />;
      case "Error":
        return <AlertCircle className="text-red-500" size={20} />;
      case "Info":
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  // Get background color based on notification type
  const getTypeBgColor = (type) => {
    switch (type) {
      case "Success":
        return "bg-green-100 border-l-4 border-green-500";
      case "Warning":
        return "bg-amber-100 border-l-4 border-amber-500";
      case "Error":
        return "bg-red-100 border-l-4 border-red-500";
      case "Info":
      default:
        return "bg-blue-100 border-l-4 border-blue-500";
    }
  };

  // Apply filters to notifications
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by type
    if (filters.type !== "All" && notification.type !== filters.type)
      return false;

    // Filter by read status
    if (filters.readStatus === "Read" && !notification.read) return false;
    if (filters.readStatus === "Unread" && notification.read) return false;

    // Filter by date range
    const notifDate = new Date(notification.date);
    if (filters.startDate && new Date(filters.startDate) > notifDate)
      return false;
    if (filters.endDate && new Date(filters.endDate) < notifDate) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center">
            <Bell className="mr-2" /> Notifications and Alerts
          </h1>
          <div className="space-x-2">
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-700 flex items-center hover:bg-slate-100"
            >
              <Filter size={18} className="mr-2" /> Filters
            </button>
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Check size={18} className="mr-2" /> Mark All Read
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                >
                  <Trash2 size={18} className="mr-2" /> Clear All
                </button>
              </>
            )}
          </div>
        </div>

        {/* Filter Section */}
        {isFilterExpanded && (
          <div className="bg-white p-4 rounded-md shadow-sm mb-6 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Type
                </label>
                <select
                  className="w-full p-2 border border-slate-300 rounded-md"
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                >
                  <option value="All">All Types</option>
                  <option value="Info">Info</option>
                  <option value="Success">Success</option>
                  <option value="Warning">Warning</option>
                  <option value="Error">Error</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full p-2 border border-slate-300 rounded-md"
                  value={filters.readStatus}
                  onChange={(e) =>
                    setFilters({ ...filters, readStatus: e.target.value })
                  }
                >
                  <option value="All">All</option>
                  <option value="Read">Read</option>
                  <option value="Unread">Unread</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-slate-300 rounded-md"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-slate-300 rounded-md"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="bg-slate-800 rounded-md shadow-md overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-medium text-white">
              Notification List
            </h2>
            <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium">
              {notifications.filter((n) => !n.read).length} Unread
            </span>
          </div>

          {filteredNotifications.length === 0 ? (
            <div className="bg-white p-8 text-center text-slate-500">
              <div className="flex justify-center mb-4">
                <Bell size={48} className="text-slate-300" />
              </div>
              <p className="text-lg">No notifications found</p>
              <p className="text-sm">Adjust your filters or check back later</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`${
                    notification.read ? "bg-white" : "bg-blue-50"
                  } hover:bg-slate-100 transition-colors`}
                >
                  <div className="p-4 flex items-start">
                    <div
                      className={`mr-4 p-2 rounded-full ${getTypeBgColor(
                        notification.type
                      )} mt-1`}
                    >
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <p
                          className={`text-slate-800 ${
                            !notification.read ? "font-semibold" : ""
                          }`}
                        >
                          {notification.message}
                        </p>
                        <div className="flex space-x-2 ml-2">
                          <button
                            onClick={() => toggleReadStatus(notification.id)}
                            className="text-slate-500 hover:text-blue-600"
                            title={
                              notification.read
                                ? "Mark as unread"
                                : "Mark as read"
                            }
                          >
                            {notification.read ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              setNotifications(
                                notifications.filter(
                                  (n) => n.id !== notification.id
                                )
                              )
                            }
                            className="text-slate-500 hover:text-red-600"
                            title="Remove notification"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-slate-500">
                          {formatDate(notification.date)}
                        </span>
                        <span
                          className={`ml-2 text-xs px-2 py-0.5 rounded-full 
                          ${
                            notification.type === "Success"
                              ? "bg-green-100 text-green-800"
                              : notification.type === "Warning"
                              ? "bg-amber-100 text-amber-800"
                              : notification.type === "Error"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {notification.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination (simplified for this example) */}
        {filteredNotifications.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-slate-600">
              Showing {filteredNotifications.length} of {notifications.length}{" "}
              notifications
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-100">
                Previous
              </button>
              <button className="px-3 py-1 border border-slate-300 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                1
              </button>
              <button className="px-3 py-1 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-100">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
