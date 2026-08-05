import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { useReactToPrint } from "react-to-print";

export default function Users() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  useEffect(() => {
    // Fetch users or any other data here
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/users`, {
          withCredentials: true,
        });
        console.log("Users fetched:", response.data.users);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("Failed to fetch users");
        }
      }
    };
    fetchUsers();
  }, []);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Users List</h2>
          <div className="flex bg-white p-4 rounded-lg justify-around mb-4 shadow-2xl gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <div className="w-full flex p-2 border border-gray-300 rounded-lg gap-4">
              <select name="" id="">
                <option value="">Filter by category</option>
              </select>
              <button className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white rounded">
                Filter
              </button>
            </div>
          </div>
          {users && users.length > 0 ? (
            <div ref={printRef} className="bg-white rounded-2xl p-4 shadow ">
              <div className="flex justify-between mb-4">
                <p>Showing {users.length} users</p>
                {/* <p>{user ? `Logged in as: ${user.name}` : "Guest"}</p> */}
                <p>
                  printed on {new Date().toLocaleDateString()} at{" "}
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200">
                  <thead className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                    <tr>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Email
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Role
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Permission
                      </th>
                      <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                        Store
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user.id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-3 px-6">{user.name}</td>
                        <td className="py-3 px-6">{user.email}</td>
                        <td className="py-3 px-6">{user.role}</td>
                        <td className="py-3 px-6">
                          {user.Permissions?.map((perm) => perm.name).join(
                            ", ",
                          ) || "N/A"}
                        </td>
                        <td className="py-3 px-6">{user.Store?.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handlePrint}
                className="bg-blue-900 px-4 py-2 rounded text-white mt-4"
              >
                Print Products
              </button>
            </div>
          ) : (
            "No products found"
          )}
        </div>
      </div>
    </div>
  );
}
