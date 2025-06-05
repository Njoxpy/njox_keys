import React, { useState, useEffect } from "react";
import { User } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      const userEmail = user?.email;

      if (userEmail) {
        setEmail(userEmail);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-gray-50 rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Settings
              </h2>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full ${
                      activeTab === tab.id
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Profile Settings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your email address
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
