import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed, warning2 } from "../services/helper";
import DeleteComp from "../components/deleteComp";

export default function DeleteUser() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const API_URL = import.meta.env.VITE_APP_API_URL;

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

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async () => {
    if (!selectedUserId) {
      alert("Please select a user first");
      return;
    }

    const result = await warning2(
      "warning",
      "Are you sure you want to delete this user?",
    );
    if (!result.isConfirmed) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/users/deleteuser/${selectedUserId}`, {
        withCredentials: true,
      });
      success("User deleted successfully!");
    } catch (error) {
      if (error.response.status === 500) {
        failed("Cannot delete user that have made sales records.");
        return;
      }
      console.error("Error deleting user:", error);
      failed("Failed to delete user. Please try again.");
    }
  };
  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Delete User</h2>

          <DeleteComp
            Options={userOptions}
            setSelectedId={setSelectedUserId}
            handleDelete={handleDelete}
            action="User"
          />
        </div>
      </div>
    </div>
  );
}
