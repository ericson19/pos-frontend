import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed } from "../services/helper";

export default function UpdateUser() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [users, setUsers] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    email: "",
    role: "",
    // storeId: "",
  });
  const [selectedUserId, setSelectedUserId] = useState("");
  const [stores, setStores] = useState([]);

  const API_URL = import.meta.env.VITE_APP_API_URL;
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/users`, {
        withCredentials: true,
      });
      console.log("Users fetched:", response.data.users);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert("Please select a user first");
      return;
    }
    try {
      const response = await axios.put(
        `${API_URL}/users/updateuser/${selectedUserId}`,
        updatedUserData,
        {
          withCredentials: true,
        }
      );
      console.log("User updated successfully:", response.data);
      success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      failed("Failed to update user");
    }
  };

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Update User</h2>
          {/* Permission update content goes here */}
          <div className="w-full max-w-md">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Select staff to update
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => {
                setSelectedUserId(e.target.value);
                const selectedUser = users.find(
                  (user) => user.id.toString() === e.target.value
                );
                setUpdatedUserData(selectedUser);
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm
               focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="bg-white p-6 rounded-3xl shadow-md mt-4">
              <div className="mb-4 ">
                <label className="block mb-2">Name</label>

                {/* <UserIcon className="h-6 w-6 pr-2 text-gray-500" /> */}
                <input
                  type="text"
                  value={updatedUserData.name}
                  name="name"
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                {/* <div className="flex items-center border border-gray-300 rounded pl-3">
                  <InboxIcon className="h-6 w-6 pr-2 text-gray-500" /> */}
                <input
                  type="text"
                  value={updatedUserData.email}
                  name="email"
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Role</label>

                {/* <UserIcon className="h-6 w-6 pr-2 text-gray-500" /> */}
                <select
                  value={updatedUserData.role}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      role: e.target.value,
                    })
                  }
                >
                  <option>Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="client">Client</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 mt-2 bg-linear-to-r from-blue-500 to-blue-700 text-white rounded"
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
