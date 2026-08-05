import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

export default function UpdatePermission() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [users, setUsers] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [permissionIds, setPermissionIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const API_URL = import.meta.env.VITE_APP_API_URL;
  useEffect(() => {
    fetchUsers();
    fetchPermissions();
  }, []);
  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/permissions`, {
        withCredentials: true,
      });
      console.log("Full response:", response.data);
      setAllPermissions(response.data.permissions || []);
      if (response.status === 200) {
        console.log("Permissions:", response.data.permissions);
      } else {
        console.log("Failed to fetch permissions");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      console.error("Error details:", error.response?.data);
    }
  };

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
  const handleUpdate = async () => {
    if (!selectedUserId) {
      alert("Please select a user first");
      return;
    }
    try {
      const response = await axios.put(
        `${API_URL}/users/permissions/${selectedUserId}`,
        { permissionIds },
        {
          withCredentials: true,
        }
      );
      console.log("Permissions updated successfully:", response.data);
      alert("Permissions updated successfully");
    } catch (error) {
      console.error("Error updating permissions:", error);
      alert("Failed to update permissions");
    }
  };

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Update Permissions</h2>
          {/* Permission update content goes here */}
          <div className="w-full max-w-md">
            <label
              htmlFor="user"
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Select staff to update permissions
            </label>
            <select
              id="user"
              value={selectedUserId}
              onChange={(e) => {
                setSelectedUserId(e.target.value);
                const selectedUser = users.find(
                  (user) => user.id.toString() === e.target.value
                );
                setPermissionIds(selectedUser?.Permissions || []);
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

          <div>
            <label htmlFor="">Choose Permission</label>
            <div className=" grid grid-cols-2 gap-2">
              {allPermissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center gap-2 bg-amber-100 border border-amber-400 rounded p-2"
                >
                  <input
                    type="checkbox"
                    value={permission.name}
                    checked={permissionIds.some(
                      (p) => p.name === permission.name
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPermissionIds([
                          ...permissionIds,
                          { name: permission.name },
                        ]);
                        console.log(permissionIds);
                      } else {
                        setPermissionIds(
                          permissionIds.filter(
                            (p) => p.name !== permission.name
                          )
                        );
                        console.log(permissionIds);
                      }
                    }}
                  />
                  <span>{permission.name}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            className="px-4 py-2 mt-2 bg-linear-to-r from-blue-500 to-blue-700 text-white rounded"
            onClick={handleUpdate}
          >
            Update Permissions
          </button>
        </div>
      </div>
    </div>
  );
}
