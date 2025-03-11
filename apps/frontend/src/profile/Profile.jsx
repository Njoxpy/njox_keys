import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Shield,
  Save,
  Calendar,
  LogOut,
  Eye,
  EyeOff,
  AlertTriangle,
  Check,
} from "lucide-react";

const UserProfilePage = () => {
  // State for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Form state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    registrationNumber: "",
    role: "",
    createdAt: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // Simulate API call with dummy data
    setTimeout(() => {
      const dummyData = {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        registrationNumber: "REG12345",
        role: "Administrator",
        createdAt: "2023-05-15T08:30:00Z",
        profileImage: null,
      };
      setUserData(dummyData);
      setFormData({
        ...dummyData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (!formData.currentPassword)
        newErrors.currentPassword = "Current password is required";
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirmSave = () => {
    // Here you would make the API call to update the user data

    // Simulate API call success
    setTimeout(() => {
      setUserData({
        ...userData,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
      });

      setIsEditing(false);
      setShowModal(false);

      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Show success toast
      setToastMessage("Profile updated successfully!");
      setToastType("success");
      setShowToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }, 1000);
  };

  const handleCancelEdit = () => {
    // Reset form data to current user data
    setFormData({
      ...userData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleLogout = () => {
    // Here you would clear authentication tokens
    alert("Logging out...");
    // Redirect to login page
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-6 border-b border-slate-200">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center">
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt={`${userData.firstname} ${userData.lastname}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div>
                  <img
                    src={`https://ui-avatars.com/api/?name=${userData.firstname}+${userData.lastname}&background=0D8ABC&color=fff&size=128`}
                    alt={`${userData.firstname} ${userData.lastname}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-slate-800">
                {userData.firstname} {userData.lastname}
              </h2>
              <p className="text-slate-600 flex items-center justify-center md:justify-start gap-2 mt-2">
                <Shield size={18} />
                <span>{userData.role}</span>
              </p>
              <p className="text-slate-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                <Calendar size={18} />
                <span>Member since {formatDate(userData.createdAt)}</span>
              </p>
            </div>

            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="md:ml-auto px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border ${
                    errors.firstname ? "border-red-500" : "border-slate-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    !isEditing ? "bg-slate-50" : "bg-white"
                  }`}
                />
                {errors.firstname && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    {errors.firstname}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border ${
                    errors.lastname ? "border-red-500" : "border-slate-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    !isEditing ? "bg-slate-50" : "bg-white"
                  }`}
                />
                {errors.lastname && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    {errors.lastname}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1"
                >
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-slate-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    !isEditing ? "bg-slate-50" : "bg-white"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Registration Number (Read-only) */}
              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  disabled
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
                />
                <p className="mt-1 text-xs text-slate-500">
                  This field cannot be edited
                </p>
              </div>

              {/* Role (Read-only) */}
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1"
                >
                  <Shield size={16} />
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  disabled
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
                />
                <p className="mt-1 text-xs text-slate-500">
                  This field cannot be edited
                </p>
              </div>
            </div>

            {/* Password Change Section */}
            {isEditing && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-lg font-medium text-slate-800 mb-4">
                  Change Password
                </h3>
                <div className="space-y-4">
                  {/* Current Password */}
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          errors.currentPassword
                            ? "border-red-500"
                            : "border-slate-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500"
                        onClick={() => togglePasswordVisibility("current")}
                      >
                        {showPassword.current ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle size={14} />
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-slate-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500"
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {showPassword.new ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle size={14} />
                        {errors.newPassword}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-slate-500">
                      Password must be at least 8 characters
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-slate-300"
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500"
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {showPassword.confirm ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle size={14} />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-6 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Confirm Changes
            </h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to update your profile information? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 transition-opacity duration-300 ${
            toastType === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toastType === "success" ? (
            <Check size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
