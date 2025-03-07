import { useState } from "react";
import { Plus, Trash, Search } from "lucide-react";

export default function StudentsManagement() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", regNumber: "REG001", yearOfStudy: "Year 1" },
    { id: 2, name: "Jane Smith", regNumber: "REG002", yearOfStudy: "Year 2" },
    {
      id: 3,
      name: "Alice Johnson",
      regNumber: "REG003",
      yearOfStudy: "Year 3",
    },
    { id: 4, name: "Bob Brown", regNumber: "REG004", yearOfStudy: "Year 4" },
    {
      id: 5,
      name: "Charlie Davis",
      regNumber: "REG005",
      yearOfStudy: "Year 1",
    },
    { id: 6, name: "Eve White", regNumber: "REG006", yearOfStudy: "Year 2" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    regNumber: "",
    yearOfStudy: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const handleAddStudent = () => {
    setStudents([...students, { id: students.length + 1, ...newStudent }]);
    setIsModalOpen(false);
    setNewStudent({ name: "", regNumber: "", yearOfStudy: "" });
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        Students Management
      </h1>

      {/* Add Student Button and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Student
        </button>

        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Registration Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Year of Study
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {student.regNumber}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {student.yearOfStudy}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 flex items-center"
                  >
                    <Trash size={16} className="mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from(
          { length: Math.ceil(filteredStudents.length / studentsPerPage) },
          (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">
                Add Student
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddStudent();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={newStudent.regNumber}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        regNumber: e.target.value,
                      })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Year of Study
                  </label>
                  <input
                    type="text"
                    value={newStudent.yearOfStudy}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        yearOfStudy: e.target.value,
                      })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
