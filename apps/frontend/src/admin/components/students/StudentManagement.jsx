import { useState, useEffect } from "react";

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
      const response = await fetch(
        `http://localhost:3000/api/v1/students?page=${currentPage}&limit=${studentsPerPage}&sort=${sortField}&order=${sortOrder}`
      );
      if (!response.ok) throw new Error("Failed to fetch students");
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "registrationNumber" ? value : value,
    });
  };

  const resetForm = () => {
    setFormData({
      registrationNumber: "",
      yearOfStudy: "",
    });
  };

  const validateRegistrationNumber = (num) => {
    return /^\d{10}$/.test(num.toString());
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    if (!validateRegistrationNumber(formData.registrationNumber)) {
      setError("Registration number must be exactly 10 digits");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add student");
      }

      await fetchStudents();
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();

    if (!validateRegistrationNumber(formData.registrationNumber)) {
      setError("Registration number must be exactly 10 digits");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/students/${currentStudent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update student");
      }

      await fetchStudents();
      setShowEditModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/students/${currentStudent._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete student");

      await fetchStudents();
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const openEditModal = (student) => {
    setCurrentStudent(student);
    setFormData({
      registrationNumber: student.registrationNumber.toString(),
      yearOfStudy: student.yearOfStudy,
    });
    setShowEditModal(true);
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
  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Pagination logic
  const pageCount = Math.ceil(totalStudents / studentsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-slate-800">
          Students Management
        </h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Sorting Controls */}
      <div className="mb-6">
        <label className="block text-sm mb-1">Sort by:</label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="p-2 border rounded-md text-slate-800"
        >
          <option value="registrationNumber">Registration Number</option>
          <option value="yearOfStudy">Year of Study</option>
          <option value="createdAt">Created At</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-md text-slate-800 ml-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 mb-4 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="px-4 py-3 text-left font-semibold">
                    Registration Number
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Year of Study
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.length > 0 ? (
                  sortedStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="border-t border-gray-200 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">
                        {student.registrationNumber}
                      </td>
                      <td className="px-4 py-3">{student.yearOfStudy}</td>
                      <td className="px-4 py-3">
                        {new Date(student.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(student)}
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(student)}
                            className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      {searchTerm
                        ? "No matching students found"
                        : "No students found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(currentPage - 1) * studentsPerPage + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(currentPage * studentsPerPage, totalStudents)}
                    </span>{" "}
                    of <span className="font-medium">{totalStudents}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Previous
                    </button>

                    {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                      let pageNum;
                      if (pageCount <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pageCount - 2) {
                        pageNum = pageCount - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginate(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === pageNum
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() =>
                        paginate(Math.min(pageCount, currentPage + 1))
                      }
                      disabled={currentPage === pageCount}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === pageCount
                          ? "text-gray-300"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 text-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
            <form onSubmit={handleAddStudent}>
              <div className="mb-4">
                <label className="block text-sm mb-1">
                  Registration Number
                </label>
                <input
                  type="number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded text-slate-800"
                  required
                  pattern="\d{10}"
                  title="Registration number must be exactly 10 digits"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Must be exactly 10 digits
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-1">Year of Study</label>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded text-slate-800"
                  required
                  placeholder="e.g. 2023/2024"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && currentStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 text-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
            <form onSubmit={handleEditStudent}>
              <div className="mb-4">
                <label className="block text-sm mb-1">
                  Registration Number
                </label>
                <input
                  type="number"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded text-slate-800"
                  required
                  pattern="\d{10}"
                  title="Registration number must be exactly 10 digits"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Must be exactly 10 digits
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-1">Year of Study</label>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded text-slate-800"
                  required
                  placeholder="e.g. 2023/2024"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 text-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete student with registration number{" "}
              {currentStudent.registrationNumber}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStudent}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;
