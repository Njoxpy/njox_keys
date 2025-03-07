import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const DashboardOverview = () => {
  // Sample data for the metrics
  const metrics = [
    {
      title: "Total Venues",
      value: 148,
      icon: MapPin,
      change: 12.5,
      increasing: true,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Bookings",
      value: 87,
      icon: Calendar,
      change: 8.2,
      increasing: true,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Approvals",
      value: 24,
      icon: Clock,
      change: 5.1,
      increasing: false,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Users Registered",
      value: 1893,
      icon: Users,
      change: 16.8,
      increasing: true,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  // Sample data for charts
  const chartData = {
    bookings: [38, 45, 32, 50, 62, 58, 70],
    revenue: [2800, 3200, 2950, 3800, 4200, 3950, 4800],
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-slate-600">
          Welcome back! Here's a summary of your business metrics.
        </p>
      </div>

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
                  <h3 className="text-2xl font-bold text-slate-800">
                    {metric.title === "Users Registered"
                      ? metric.value.toLocaleString()
                      : metric.value}
                  </h3>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bookings Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-800">Booking Trends</h3>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
              This Week
            </div>
          </div>

          <div className="flex items-end h-48">
            {chartData.bookings.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full max-w-[30px] bg-blue-600 rounded-t-sm mx-1"
                  style={{ height: `${(value / 70) * 100}%` }}
                ></div>
                <span className="text-xs text-slate-500 mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-800">Revenue Overview</h3>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
              This Week
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white mr-4">
              <TrendingUp size={20} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-slate-800">$24,950</h4>
              <p className="text-xs text-slate-500">Total revenue this week</p>
            </div>
            <div className="ml-auto flex items-center text-green-600 text-sm font-medium">
              <ArrowUpRight size={16} className="mr-1" />
              18.2%
            </div>
          </div>

          <div className="flex items-end h-32">
            {chartData.revenue.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full max-w-[30px] bg-slate-800 rounded-t-sm mx-1"
                  style={{ height: `${(value / 5000) * 100}%` }}
                ></div>
                <span className="text-xs text-slate-500 mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-4">Recent Activity</h3>

          <div className="space-y-4">
            {[
              {
                action: "New booking confirmed",
                venue: "Studio A",
                time: "10 minutes ago",
              },
              {
                action: "User registration",
                venue: "James Wilson",
                time: "45 minutes ago",
              },
              {
                action: "Venue approved",
                venue: "Conference Hall B",
                time: "2 hours ago",
              },
              {
                action: "Payment received",
                venue: "Workshop Space",
                time: "3 hours ago",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start pb-4 border-b border-slate-100 last:border-0"
              >
                <div className="mr-4 mt-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800">
                    {activity.action}
                  </p>
                  <p className="text-sm text-slate-600">{activity.venue}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-slate-800 rounded-lg shadow-sm p-6 text-white">
          <h3 className="font-semibold mb-4">Performance Snapshot</h3>

          <div className="space-y-6">
            {[
              {
                label: "Average Booking Value",
                value: "$342.50",
                icon: BarChart2,
              },
              { label: "Conversion Rate", value: "24.8%", icon: TrendingUp },
              { label: "Active Venues", value: "91%", icon: MapPin },
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

          <button className="w-full mt-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors">
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
