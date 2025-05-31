import React, { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalVenues: 0,
    totalStudents: 0,
    totalUsers: 0,
    availableVenues: 0,
    totalOrders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for metrics that we'll partially replace with API data
  const [metrics, setMetrics] = useState([
    {
      title: "Total Venues",
      value: 0,
      icon: MapPin,
      change: 12.5,
      increasing: true,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Available Venues",
      value: 0,
      icon: Calendar,
      change: 8.2,
      increasing: true,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: 0,
      icon: ShoppingBag,
      change: 10.3,
      increasing: true,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Users",
      value: 0,
      icon: Users,
      change: 16.8,
      increasing: true,
      color: "bg-purple-100 text-purple-600",
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication required. Please log in.");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Helper function to handle API response
        const handleResponse = async (response, endpoint) => {
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error("Session expired. Please log in again.");
            }
            throw new Error(`Failed to fetch ${endpoint} data`);
          }
          const data = await response.json();

          // Validate response format based on endpoint
          switch (endpoint) {
            case "venues":
              if (typeof data?.venueCount !== "number") {
                throw new Error("Invalid venues data format");
              }
              break;
            case "students":
              if (typeof data?.studentsCount !== "number") {
                throw new Error("Invalid students data format");
              }
              break;
            case "users":
              if (typeof data?.usersCount !== "number") {
                throw new Error("Invalid users data format");
              }
              break;
            case "available venues":
              if (typeof data?.venueCountAvailable !== "number") {
                throw new Error("Invalid available venues data format");
              }
              break;
            case "orders":
              if (typeof data?.ordersCount !== "number") {
                throw new Error("Invalid orders data format");
              }
              break;
          }

          return data;
        };

        // Fetch data from all endpoints
        const venuesPromise = fetch(
          "http://localhost:5000/api/v1/stats/total-venues",
          { headers }
        ).then((res) => handleResponse(res, "venues"));

        const studentsPromise = fetch(
          "http://localhost:5000/api/v1/stats/total-students",
          { headers }
        ).then((res) => handleResponse(res, "students"));

        const usersPromise = fetch(
          "http://localhost:5000/api/v1/stats/total-users",
          { headers }
        ).then((res) => handleResponse(res, "users"));

        const availableVenuesPromise = fetch(
          "http://localhost:5000/api/v1/stats/total-available",
          { headers }
        ).then((res) => handleResponse(res, "available venues"));

        const ordersPromise = fetch(
          "http://localhost:5000/api/v1/stats/total-orders",
          { headers }
        ).then((res) => handleResponse(res, "orders"));

        // Resolve all promises
        const [
          venuesData,
          studentsData,
          usersData,
          availableVenuesData,
          ordersData,
        ] = await Promise.all([
          venuesPromise,
          studentsPromise,
          usersPromise,
          availableVenuesPromise,
          ordersPromise,
        ]);

        // Update stats based on API responses
        const updatedStats = {
          totalVenues: venuesData?.venueCount || 0,
          totalStudents: studentsData?.studentsCount || 0,
          totalUsers: usersData?.usersCount || 0,
          availableVenues: availableVenuesData?.venueCountAvailable || 0,
          totalOrders: ordersData?.ordersCount || 0,
        };

        setStats(updatedStats);

        // Update metrics array with the fetched data
        setMetrics((prevMetrics) =>
          prevMetrics.map((metric) => {
            if (metric.title === "Total Venues") {
              return { ...metric, value: updatedStats.totalVenues };
            } else if (metric.title === "Available Venues") {
              return { ...metric, value: updatedStats.availableVenues };
            } else if (metric.title === "Total Users") {
              return { ...metric, value: updatedStats.totalUsers };
            } else if (metric.title === "Total Orders") {
              return { ...metric, value: updatedStats.totalOrders };
            }
            return metric;
          })
        );

        setError(null);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.message || "Failed to load data. Please try again later.");
        // Reset stats and metrics on error
        setStats({
          totalVenues: 0,
          totalStudents: 0,
          totalUsers: 0,
          availableVenues: 0,
          totalOrders: 0,
        });
        setMetrics((prevMetrics) =>
          prevMetrics.map((metric) => ({ ...metric, value: 0 }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-slate-600">
          Welcome back! Here's a summary of your venue metrics.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const ArrowIcon = metric.increasing ? ArrowUpRight : ArrowDownRight;

          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    {metric.title}
                  </p>
                  {loading ? (
                    <div className="animate-pulse h-8 w-16 bg-slate-200 rounded"></div>
                  ) : (
                    <h3 className="text-2xl font-bold text-slate-800">
                      {["Total Users", "Total Orders"].includes(metric.title)
                        ? metric.value.toLocaleString()
                        : metric.value}
                    </h3>
                  )}
                </div>
                <div
                  className={`p-3 rounded-full ${metric.color} bg-opacity-20`}
                >
                  <Icon size={18} />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <div
                  className={`text-xs font-medium flex items-center ${
                    metric.increasing ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <ArrowIcon size={14} className="mr-1" />
                  {metric.change}%
                </div>
                <span className="text-xs text-slate-500 ml-2">
                  vs last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Stats Card */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Student Statistics</h3>
            <div className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
              Overview
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <Users size={20} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-slate-800">
                {loading ? (
                  <div className="animate-pulse h-8 w-16 bg-slate-200 rounded"></div>
                ) : (
                  stats.totalStudents.toLocaleString()
                )}
              </h4>
              <p className="text-sm text-slate-600">
                Total registered students
              </p>
            </div>
            <div className="ml-auto">
              <Link to="/admin/students">
                <button className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Snapshot */}
      <div className="bg-slate-800 rounded-lg shadow-sm p-6 text-white mb-8">
        <h3 className="font-semibold mb-4">Performance Snapshot</h3>

        <div className="space-y-6">
          {[
            {
              label: "Available Venues",
              value: loading
                ? "Loading..."
                : `${stats.availableVenues} (${
                    stats.totalVenues > 0
                      ? Math.round(
                          (stats.availableVenues / stats.totalVenues) * 100
                        )
                      : 0
                  }%)`,
              icon: MapPin,
            },
            {
              label: "Total Venue Capacity",
              value: loading
                ? "Loading..."
                : stats.totalVenues.toLocaleString(),
              icon: Calendar,
            },
            {
              label: "Venue Utilization",
              value: loading
                ? "Loading..."
                : stats.totalVenues > 0
                ? `${Math.round(
                    ((stats.totalVenues - stats.availableVenues) /
                      stats.totalVenues) *
                      100
                  )}%`
                : "N/A",
              icon: TrendingUp,
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center mr-4">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Link to={"/admin/venues"}>
          <button className="w-full mt-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
            View Full Report
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardOverview;
