import { useState, useEffect } from "react";
import { Plus, Search, X } from "react-feather";

const baseURL = "http://localhost:5000";

const UsersManagement = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    registrationNumber: "",
    password: "",
    role: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  // Filtering state
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting state
  const [sortField, setSortField] = useState("firstname");
  const [sortOrder, setSortOrder] = useState("asc");

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      registrationNumber: "",
      password: "",
      role: "",
    });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter and search users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !searchTerm ||
      (user.firstname?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (user.lastname?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.registrationNumber?.toString() || "").includes(searchTerm);

    const matchesRole = filterRole === "all" || user.role === filterRole;

    return matchesSearch && matchesRole;
  });

  // Fetch users from API
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${baseURL}/api/v1/users?page=${currentPage}&limit=${itemsPerPage}&sort=${sortField}&order=${sortOrder}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const data = await response.json();

      // Handle "no users" response
      if (data.message === "No users found") {
        setUsers([]);
        setTotalUsers(0);
        setError(null);
        return;
      }

      if (data && data.data && Array.isArray(data.data)) {
        setUsers(data.data);
        setTotalUsers(data.totalCount || data.data.length);
      } else if (Array.isArray(data)) {
        setUsers(data);
        setTotalUsers(data.length);
      } else {
        console.error("Unexpected API response structure:", data);
        throw new Error("Failed to load users. Please try again.");
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message);
      setUsers([]);
      setTotalUsers(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage, sortField, sortOrder]);

  // Form validation
  const validateForm = () => {
    const errors = {};

    // Firstname validation
    if (
      !formData.firstname ||
      formData.firstname.length < 2 ||
      formData.firstname.length > 35
    ) {
      errors.firstname = "First name should be between 2 and 35 characters";
    }

    // Lastname validation
    if (
      !formData.lastname ||
      formData.lastname.length < 2 ||
      formData.lastname.length > 35
    ) {
      errors.lastname = "Last name should be between 2 and 35 characters";
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Registration number validation
    const regNumberStr = formData.registrationNumber.toString();
    if (!formData.registrationNumber || !/^\d{10}$/.test(regNumberStr)) {
      errors.registrationNumber =
        "Registration number must be exactly 10 digits";
    }

    // Password validation
    if (!formData.password || !isStrongPassword(formData.password)) {
      errors.password =
        "Password must be at least 8 characters long, with at least one lowercase letter, one uppercase letter, one number, and one special character.";
    }

    // Role validation
    if (!formData.role || !["admin", "employee"].includes(formData.role)) {
      errors.role = "Role must be either 'admin' or 'employee'";
    }

    return errors;
  };

  const isStrongPassword = (password) => {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  // Add user handler
  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]); // Show first error
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/api/v1/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          registrationNumber: parseInt(formData.registrationNumber, 10),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add user");
      }

      setShowAddModal(false);
      resetForm();
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize edit modal with user data
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setFormData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      registrationNumber: user.registrationNumber || "",
      password: "", // Empty password field for edit
      role: user.role || "",
    });
    setShowEditModal(true);
  };

  // Validate edit form - only validate fields that have been changed
  const validateEditForm = (originalUser, newData) => {
    const errors = {};

    // Only validate fields that have been modified
    if (newData.firstname !== originalUser.firstname) {
      if (newData.firstname.length < 2 || newData.firstname.length > 35) {
        errors.firstname = "First name should be between 2 and 35 characters";
      }
    }

    if (newData.lastname !== originalUser.lastname) {
      if (newData.lastname.length < 2 || newData.lastname.length > 35) {
        errors.lastname = "Last name should be between 2 and 35 characters";
      }
    }

    if (newData.email !== originalUser.email) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(newData.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (newData.registrationNumber !== originalUser.registrationNumber) {
      const regNumberStr = newData.registrationNumber.toString();
      if (!/^\d{10}$/.test(regNumberStr)) {
        errors.registrationNumber =
          "Registration number must be exactly 10 digits";
      }
    }

    if (newData.password) {
      if (!isStrongPassword(newData.password)) {
        errors.password =
          "Password must be at least 8 characters long, with at least one lowercase letter, one uppercase letter, one number, and one special character.";
      }
    }

    if (newData.role !== originalUser.role) {
      if (!["admin", "employee"].includes(newData.role)) {
        errors.role = "Role must be either 'admin' or 'employee'";
      }
    }

    return errors;
  };

  // Handle edit user submission
  const handleEditUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Get only the changed fields
    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      // Include field if it's different from current user data or if it's a password
      if (key === "password") {
        if (formData[key]) {
          // Only include password if it was entered
          changedFields[key] = formData[key];
        }
      } else if (formData[key] !== currentUser[key]) {
        changedFields[key] = formData[key];
      }
    });

    // If no fields were changed, close the modal
    if (Object.keys(changedFields).length === 0) {
      setShowEditModal(false);
      resetForm();
      return;
    }

    // Validate only changed fields
    const validationErrors = validateEditForm(currentUser, formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${baseURL}/api/v1/users/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...changedFields,
            registrationNumber: changedFields.registrationNumber
              ? parseInt(changedFields.registrationNumber, 10)
              : undefined,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      setShowEditModal(false);
      resetForm();
      fetchUsers(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-800">
            User Management
          </h1>
          <button
            onClick={() => {
              setShowAddModal(true);
              resetForm();
            }}
            className="inline-flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg 
              hover:bg-slate-700 active:bg-slate-900 
              focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 
              transition-colors duration-150"
          >
            <Plus size={20} className="mr-2" />
            Add New User
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-slate-800 
                  focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
                  hover:border-slate-300 transition-colors"
              />
              <Search
                size={20}
                className="absolute left-3 top-2.5 text-slate-400"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-slate-800 
                focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
                hover:border-slate-300 transition-colors"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-slate-600">Loading users...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      ) : users.length > 0 ? (
        <>
          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-800">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                      onClick={() => {
                        setSortField("firstname");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Name
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                      onClick={() => {
                        setSortField("email");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Email
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                      onClick={() => {
                        setSortField("registrationNumber");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Registration Number
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                      onClick={() => {
                        setSortField("role");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Role
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredUsers
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-900">
                            {user.firstname} {user.lastname}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-500">
                            {user.registrationNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setCurrentUser(user);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="border border-slate-300 rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="ml-2">entries</span>
            </div>
            <div className="flex gap-2">
              {Array.from(
                { length: Math.ceil(filteredUsers.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 border border-blue-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              No Users Found
            </h3>
            <p className="text-slate-600 mb-6">
              {searchTerm
                ? "No users match your search criteria. Try adjusting your search terms."
                : "There are no users registered at the moment. Click the 'Add New User' button to add one."}
            </p>
            {!searchTerm && (
              <button
                onClick={() => {
                  setShowAddModal(true);
                  resetForm();
                }}
                className="inline-flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Add New User
              </button>
            )}
          </div>
        </div>
      )}
      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">
                Add New User
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddUser}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                    minLength={2}
                    maxLength={35}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                    minLength={2}
                    maxLength={35}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                    pattern="\S+@\S+\.\S+"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="number"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                    pattern="\d{10}"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                  <p className="mt-1 text-sm text-slate-500">
                    Must be at least 8 characters with 1 uppercase, 1 lowercase,
                    1 number, and 1 special character
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center bg-slate-800 text-white px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">Edit User</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                }}
                className="p-1 rounded-full hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditUser} className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-slate-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
                        hover:border-slate-400 transition-colors"
                      placeholder={currentUser?.firstname}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-slate-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
                        hover:border-slate-400 transition-colors"
                      placeholder={currentUser?.lastname}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
                      hover:border-slate-400 transition-colors"
                    placeholder={currentUser?.email}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="number"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
                      hover:border-slate-400 transition-colors"
                    placeholder={currentUser?.registrationNumber}
                  />
                  <p className="mt-1 text-sm text-slate-500">
                    Must be exactly 10 digits
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
                      hover:border-slate-400 transition-colors"
                    placeholder="Leave empty to keep current password"
                  />
                  <p className="mt-1 text-sm text-slate-500">
                    Leave empty to keep current password, or enter a new
                    password with at least 8 characters, 1 uppercase, 1
                    lowercase, 1 number, and 1 special character
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-slate-300 rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent
                      hover:border-slate-400 transition-colors"
                  >
                    <option value="">Select a role</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg 
                    hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 
                    focus:ring-opacity-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg 
                    hover:bg-slate-700 focus:outline-none focus:ring-2 
                    focus:ring-slate-500 focus:ring-opacity-50 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Editing..." : "Edit User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete User Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center bg-slate-800 text-white px-6 py-4 rounded-t-lg">
              <h3 className="text-lg font-semibold">Delete User</h3>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                }}
                className="p-1 rounded-full hover:bg-slate-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-lg font-medium text-slate-700 mb-2">
                Are you sure you want to delete this user?
              </p>
              <p className="text-sm text-slate-500 mb-6">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg 
                    hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 
                    focus:ring-opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitting(true);
                    try {
                      const token = localStorage.getItem("token");
                      const response = fetch(
                        `${baseURL}/api/v1/users/${currentUser._id}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      response
                        .then((res) => {
                          if (!res.ok) {
                            throw new Error(res.statusText);
                          }
                          return res.json();
                        })
                        .then(() => {
                          setUsers((prevUsers) =>
                            prevUsers.filter(
                              (user) => user._id !== currentUser._id
                            )
                          );
                          setShowDeleteModal(false);
                          setError(null);
                        })
                        .catch((err) => {
                          setError(err.message);
                        })
                        .finally(() => {
                          setIsSubmitting(false);
                        });
                    } catch (err) {
                      setError(err.message);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg 
                    hover:bg-red-700 focus:outline-none focus:ring-2 
                    focus:ring-red-500 focus:ring-opacity-50 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Deleting..." : "Delete User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
