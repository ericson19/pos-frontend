import loginImage from "../assets/login.jpg";
import { UserIcon, EyeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";
import { SettingContext } from "../context/settingContext.jsx";
import ShowPassword from "./showPassword.jsx";
import { Link } from "react-router-dom";

function LoginForm() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [storeId, setStoreId] = useState("");
  const [stores, setStores] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const { login } = useContext(AuthContext);
  const { settings, loading } = useContext(SettingContext);
  const [error, setError] = useState("");

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
  function handleclick(e) {
    e.preventDefault();

    const fethcData = async () => {
      try {
        console.log(storeId);

        const response = await axios.post(
          `${API_URL}/users/login`,
          {
            email,
            password,
            storeId,
          },
          {
            withCredentials: true,
          },
        );
        if (response.status === 201) {
          setData(response.data);
          console.log(response.data.user);
          // localStorage.setItem("user", JSON.stringify(response.data.user));
          // localStorage.setItem("token", response.data.token);
          login(response.data.user);

          navigate("/pos");
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        }
        console.log("Error during login:", error.response.data.message);
        console.error("Error during login:", error);
      }
    };
    fethcData();
  }

  return (
    <div className="bg-linear-to-r from-blue-700 to-fuchsia-500 min-h-screen">
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          Loading Login
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 px-5 md:px-50 py-5">
          <img
            src={`${API_URL}/${settings.frontPicture}?v=${settings.updatedAt}`}
            className="w-full rounded-2xl"
            alt="Login"
          />
          <div className="bg-white shadow-2xl">
            <form className="p-10" onSubmit={handleclick}>
              <h2 className=" mb-5 text-center">Login to Your Account</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="mb-4">
                <label className="block mb-2">Username</label>
                <div className="flex items-center border border-gray-300 rounded pl-3">
                  <UserIcon className="h-6 w-6 text-gray-500" />
                  <input
                    type="text"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="mb-6 relative">
                <label className="block mb-2">Password</label>
                <div className="flex items-center border border-gray-300 rounded pl-3">
                  <LockClosedIcon className="h-6 w-6 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ShowPassword
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
              </div>
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
              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-700 to-fuchsia-600 text-white p-2 rounded "
              >
                Login
              </button>
              <span className="mt-4 text-sm block text-end">
                forgot password?{" "}
                <Link className="text-blue-600" to="/forgot-password">
                  click here
                </Link>
              </span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default LoginForm;
