import React, { useState } from "react";
import { Bell, Lock, Moon, Sun, User } from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { id: "system", label: "System", icon: <Bell className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Settings
              </h2>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md w-full ${
                      activeTab === tab.id
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Profile Settings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your account information
                  </p>

                  <div className="mt-6 space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue="Admin User"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue="admin@example.com"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue="System Administrator"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "system" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    System Settings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Customize your dashboard experience
                  </p>

                  <div className="mt-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Dark Mode
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Switch between light and dark themes
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                      >
                        {darkMode ? (
                          <Sun className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <Moon className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notifications
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Enable or disable system notifications
                        </p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          name="notifications"
                          id="notifications"
                          defaultChecked
                          className="sr-only"
                        />
                        <label
                          htmlFor="notifications"
                          className="block h-6 rounded-full cursor-pointer bg-blue-600"
                        >
                          <span className="block h-6 w-6 rounded-full bg-white shadow transform"></span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Analytics
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Share anonymous usage data
                        </p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          name="analytics"
                          id="analytics"
                          defaultChecked
                          className="sr-only"
                        />
                        <label
                          htmlFor="analytics"
                          className="block h-6 rounded-full cursor-pointer bg-blue-600"
                        >
                          <span className="block h-6 w-6 rounded-full bg-white shadow transform"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Security Settings
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage your account security
                  </p>

                  <div className="mt-6 space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Change Password
                      </h4>
                      <div className="mt-2 space-y-4">
                        <div>
                          <label
                            htmlFor="current-password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="current-password"
                            id="current-password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="new-password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            name="new-password"
                            id="new-password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Two-Factor Authentication
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="twoFactor"
                            id="twoFactor"
                            checked={twoFactorEnabled}
                            onChange={() =>
                              setTwoFactorEnabled(!twoFactorEnabled)
                            }
                            className="sr-only"
                          />
                          <label
                            htmlFor="twoFactor"
                            className={`block h-6 rounded-full cursor-pointer ${
                              twoFactorEnabled ? "bg-blue-600" : "bg-gray-400"
                            }`}
                          >
                            <span
                              className={`block h-6 w-6 rounded-full bg-white shadow transform ${
                                twoFactorEnabled
                                  ? "translate-x-4"
                                  : "translate-x-0"
                              }`}
                            ></span>
                          </label>
                        </div>
                      </div>

                      {twoFactorEnabled && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            Scan the QR code with an authenticator app like
                            Google Authenticator or Authy.
                          </p>
                          <div className="mt-4 flex justify-center">
                            <div className="bg-white p-4 inline-block">
                              <div className="w-32 h-32 bg-gray-300 flex items-center justify-center text-xs text-gray-500">
                                QR Code Placeholder
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <label
                              htmlFor="verify-code"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Verification Code
                            </label>
                            <div className="mt-1 flex">
                              <input
                                type="text"
                                name="verify-code"
                                id="verify-code"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Enter 6-digit code"
                              />
                              <button
                                type="button"
                                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm"
                              >
                                Verify
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
