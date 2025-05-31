import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "react-feather";

const StudentsManagement = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    registrationNumber: "",
    yearOfStudy: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);

  // Sorting
  const [sortField, setSortField] = useState("registrationNumber");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchStudents();
  }, [currentPage, studentsPerPage, sortField, sortOrder]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/students?page=${currentPage}&limit=${studentsPerPage}&sort=${sortField}&order=${sortOrder}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch students");
      }
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        setStudents(data.data);
        setTotalStudents(data.totalCount || data.data.length);
      } else if (Array.isArray(data)) {
        setStudents(data);
        setTotalStudents(data.length);
      } else {
        console.error("Unexpected API response structure:", data);
        setStudents([]);
        setTotalStudents(0);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError(err.message);
      setStudents([]);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    // Check if registration number is provided
    if (!formData.registrationNumber) {
      setError("Registration number is required");
      return false;
    }

    // Check if registration number is a valid number
    const regNumber = Number(formData.registrationNumber);
    if (isNaN(regNumber)) {
      setError("Registration number must be a number");
      return false;
    }

    // Check if registration number is exactly 14 digits
    if (!/^\d{14}$/.test(regNumber.toString())) {
      setError("Registration number must be exactly 14 digits");
      return false;
    }

    // Check if year of study is provided
    if (!formData.yearOfStudy) {
      setError("Year of study is required");
      return false;
    }

    // Check year of study format (YYYY/YYYY)
    if (!/^\d{4}\/\d{4}$/.test(formData.yearOfStudy)) {
      setError(
        "Year of study must be in the format 'YYYY/YYYY' (e.g., 2024/2025)"
      );
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "registrationNumber") {
      // Only allow numbers and limit to 14 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 14);
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      registrationNumber: "",
      yearOfStudy: "",
    });
    setError(null);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/v1/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          registrationNumber: Number(formData.registrationNumber),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add student");
      }

      await fetchStudents();
      setShowAddModal(false);
      resetForm();
      toast.success("Student added successfully");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const validateEditForm = (originalStudent, newData) => {
    const errors = {};

    // Only validate fields that have been modified
    if (newData.registrationNumber !== originalStudent.registrationNumber) {
      // Check if registration number is a valid number
      const regNumber = Number(newData.registrationNumber);
      if (isNaN(regNumber)) {
        errors.registrationNumber = "Registration number must be a number";
      }
      // Check if registration number is exactly 14 digits
      else if (!/^\d{14}$/.test(regNumber.toString())) {
        errors.registrationNumber =
          "Registration number must be exactly 14 digits";
      }
    }

    if (newData.yearOfStudy !== originalStudent.yearOfStudy) {
      // Check year of study format (YYYY/YYYY)
      if (!/^\d{4}\/\d{4}$/.test(newData.yearOfStudy)) {
        errors.yearOfStudy =
          "Year of study must be in the format 'YYYY/YYYY' (e.g., 2024/2025)";
      }
    }

    return errors;
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    setFormData({
      registrationNumber: student.registrationNumber?.toString() || "",
      yearOfStudy: student.yearOfStudy || "",
    });
    setShowEditModal(true);
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    setError(null);

    // Get only the changed fields
    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== currentStudent[key]?.toString()) {
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
    const validationErrors = validateEditForm(currentStudent, formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/students/${currentStudent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...changedFields,
            registrationNumber: changedFields.registrationNumber
              ? Number(changedFields.registrationNumber)
              : undefined,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update student");
      }

      await fetchStudents();
      setShowEditModal(false);
      resetForm();
      toast.success("Student updated successfully");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/v1/students/${currentStudent._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete student");
      }

      await fetchStudents();
      setShowDeleteModal(false);
      toast.success("Student deleted successfully");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  const openDeleteModal = (student) => {
    setCurrentStudent(student);
    setShowDeleteModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtering logic
  const filteredStudents = Array.isArray(students)
    ? students.filter(
        (student) =>
          student.registrationNumber.toString().includes(searchTerm) ||
          student.yearOfStudy.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Sorting logic
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aValue =
      sortField === "registrationNumber"
        ? a[sortField]
        : a[sortField]?.toString().toLowerCase();
    const bValue =
      sortField === "registrationNumber"
        ? b[sortField]
        : b[sortField]?.toString().toLowerCase();

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Pagination logic
  const pageCount = Math.ceil(totalStudents / studentsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Students Management
        </h1>
        <p className="text-slate-600 mb-6">Manage and track student records</p>

        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            onClick={() => {
              setShowAddModal(true);
              resetForm();
            }}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Add New Student
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-slate-600">Loading students...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        ) : (
          <>
            {/* Students Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Registration Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Year of Study
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {sortedStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-800">
                          {student.registrationNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          {student.yearOfStudy}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditClick(student)}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setCurrentStudent(student);
                              setShowDeleteModal(true);
                            }}
                            className="px-3 py-1 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-slate-600">
                Showing {students.length} of {totalStudents} students
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? "bg-slate-100 text-slate-400"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage * studentsPerPage >= totalStudents}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage * studentsPerPage >= totalStudents
                      ? "bg-slate-100 text-slate-400"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {/* Add/Edit Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  {showAddModal ? "Add New Student" : "Edit Student"}
                </h2>
                <form
                  onSubmit={showAddModal ? handleAddStudent : handleEditStudent}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter 14-digit number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Year of Study
                      </label>
                      <input
                        type="text"
                        name="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="YYYY/YYYY"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="mt-6 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        showAddModal
                          ? setShowAddModal(false)
                          : setShowEditModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      {showAddModal ? "Add Student" : "Update Student"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Student Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Edit Student
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleEditStudent}>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder={currentStudent?.registrationNumber}
                    />
                    <p className="mt-1 text-sm text-slate-500">
                      Must be exactly 14 digits
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Year of Study
                    </label>
                    <input
                      type="text"
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder={currentStudent?.yearOfStudy}
                    />
                    <p className="mt-1 text-sm text-slate-500">
                      Format: YYYY/YYYY (e.g., 2024/2025)
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
                  >
                    Update Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && currentStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Delete Student
                </h2>
                <p className="text-slate-600">
                  Are you sure you want to delete this student? This action
                  cannot be undone.
                </p>
                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteStudent}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsManagement;
