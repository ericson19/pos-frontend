import loginImage from "../assets/login.jpg";
import { UserIcon, InboxIcon, EyeDropperIcon } from "@heroicons/react/24/solid";
import ShowPassword from "../components/showPassword";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { success, warning } from "../services/helper";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { SettingContext } from "../context/settingContext.jsx";
import axios from "axios";

function Register() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [storeId, setStoreId] = useState("");
  const [stores, setStores] = useState([]);
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [permissionIds, setPermissionIds] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConPassword, setShowConPassword] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { settings } = useContext(SettingContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const storeData = async () => {
      try {
        const response = await axios.get(`${API_URL}/stores`);

        setStores(response.data.stores);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    storeData();
  }, []);

  async function handleclick(e) {
    e.preventDefault();
    if (password !== conPassword) {
      warning("Passwords do not match");
      return;
    }

    try {
      console.log(storeId);
      const userDate = {
        name: name,
        email: email,
        password: password,
        role: role,
        storeId: storeId,
        permissionIds: permissionIds,
      };
      const response = await axios.post(`${API_URL}/users/reg`, userDate, {
        withCredentials: true,
      });
      if (response.status === 201) {
        // setData(response.data);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("otpExpiry", response.data.expiredAt);
        console.log("Registration successful:", response.data);
        navigate("/otp");
        // navigate("/pos");
      } else {
        setError("Registration failed");
        warning("Registration failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        warning("Registration failed", error.response.data.message);
      }
    }
  }

  useEffect(() => {
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
    fetchPermissions();
  }, []);
  useEffect(() => {
    console.log("Selected Permissions:", permissionIds);
  }, [permissionIds]);
  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="bg-linear-to-r from-blue-700 to-fuchsia-500">
          <div className="grid grid-cols-1 xl:grid-cols-2 px-5 md:px-50 py-5">
            <img
              src={`${API_URL}/${settings.frontPicture}?v=${settings.updatedAt}`}
              className="w-full rounded-2xl"
              alt="reigister"
            />
            <div className="bg-white shadow-2xl">
              <h2 className=" mb-5 text-center">Register new staff</h2>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <form onSubmit={handleclick}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2 p-10">
                  <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <div className="flex items-center border border-gray-300 rounded pl-3">
                      <UserIcon className="h-6 w-6 pr-2 text-gray-500" />
                      <input
                        type="text"
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <div className="flex items-center border border-gray-300 rounded pl-3">
                      <InboxIcon className="h-6 w-6 pr-2 text-gray-500" />
                      <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Role</label>
                    <div className="flex items-center border border-gray-300 rounded pl-3">
                      <UserIcon className="h-6 w-6 pr-2 text-gray-500" />
                      <select
                        value={role}
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        <option value="client">Client</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6 relative">
                    <label className="block mb-2">Password</label>
                    <div className="flex items-center border border-gray-300 rounded pl-3">
                      <EyeDropperIcon className="h-6 w-6 pr-2 text-gray-500" />
                      <input
                        type={showPassword ? "password" : "text"}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2  rounded"
                      />
                      <ShowPassword
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />
                    </div>
                  </div>
                  <div className="mb-6 relative">
                    <label className="block mb-2">Confirm Password</label>
                    <div className="flex items-center border border-gray-300 rounded pl-3">
                      <EyeDropperIcon className="h-6 w-6 pr-2 text-gray-500" />
                      <input
                        type={showConPassword ? "password" : "text"}
                        name="password"
                        value={conPassword}
                        onChange={(e) => setConPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <ShowPassword
                        showPassword={showConPassword}
                        setShowPassword={setShowConPassword}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2">Store</label>
                    <select
                      className="mb-6 w-full p-2 border border-gray-300 rounded"
                      value={storeId}
                      onChange={(e) => setStoreId(e.target.value)}
                    >
                      <option value="">select store</option>
                      {stores &&
                        stores.map((store) => (
                          <option key={store.id} value={store.id}>
                            {store.name}
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
                              (p) => p.name === permission.name,
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
                                    (p) => p.name !== permission.name,
                                  ),
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
                    type="submit"
                    className="w-3/4 h-10 mt-auto bg-gradient-to-r from-blue-700 to-fuchsia-600 text-white p-2 rounded"
                  >
                    Add Staff
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
