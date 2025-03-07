import { useState } from "react";
import { Plus, Edit, Trash, Save, X } from "lucide-react";

export default function UsersManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "employee" },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "employee",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "employee",
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const currentUserRole = "admin"; // Simulate current user role (admin or employee)

  const handleAddUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setIsModalOpen(false);
    setNewUser({ name: "", email: "", role: "employee" });
  };

  const handleEditUser = (id) => {
    const user = users.find((user) => user.id === id);
    setEditingUserId(id);
    setEditUserData({ name: user.name, email: user.email, role: user.role });
  };

  const handleSaveEdit = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, ...editUserData } : user
      )
    );
    setEditingUserId(null);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">
        Users Management
      </h1>

      {/* Add User Button */}
      {currentUserRole === "admin" && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add User
        </button>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                Role
              </th>
              {currentUserRole === "admin" && (
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {editingUserId === user.id ? (
                    <input
                      type="text"
                      value={editUserData.name}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          name: e.target.value,
                        })
                      }
                      className="border rounded-md px-2 py-1"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {editingUserId === user.id ? (
                    <input
                      type="email"
                      value={editUserData.email}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          email: e.target.value,
                        })
                      }
                      className="border rounded-md px-2 py-1"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800">
                  {editingUserId === user.id ? (
                    <select
                      value={editUserData.role}
                      onChange={(e) =>
                        setEditUserData({
                          ...editUserData,
                          role: e.target.value,
                        })
                      }
                      className="border rounded-md px-2 py-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                {currentUserRole === "admin" && (
                  <td className="px-6 py-4 text-sm text-slate-800">
                    {editingUserId === user.id ? (
                      <button
                        onClick={() => handleSaveEdit(user.id)}
                        className="bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200 flex items-center"
                      >
                        <Save size={16} className="mr-2" />
                        Save
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 flex items-center"
                        >
                          <Edit size={16} className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 flex items-center"
                        >
                          <Trash size={16} className="mr-2" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Add User</h2>
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
                handleAddUser();
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="w-full border rounded-md px-3 py-2 mt-1"
                  >
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
