import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar.jsx";
import Navbar from "../../components/navbar.jsx";
import ShowPassword from "../../components/showPassword.jsx";
import axios from "axios";
import { success, failed } from "../../services/helper.jsx";
import { useNavigate } from "react-router-dom";
import { use } from "react";

export default function ResetPassword() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    if (password !== confirmPassword) {
      failed("Error", "Passwords do not match");
      return;
    }
    const email = localStorage.getItem("email");
    const storeId = localStorage.getItem("storeId");
    const otpExpired = localStorage.getItem("otpExpiry");

    if (otpExpired && Date.now() > parseInt(otpExpired)) {
      failed("Error", "OTP has expired");
      localStorage.removeItem("email");
      localStorage.removeItem("storeId");
      localStorage.removeItem("otpExpiry");
      navigate("/forgot-password");
      return;
    }

    const formData = {
      email: email,
      storeId: storeId,
      newPassword: password,
      conPassword: confirmPassword,
    };
    try {
      const response = await axios.post(
        `${API_URL}/password/reset-password`,
        formData,
      );
      if (response.status === 200) {
        success("Password reset successfully", "You can now log in.");
        localStorage.removeItem("email");
        localStorage.removeItem("storeId");
        localStorage.removeItem("otpExpiry");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.response && error.response.data) {
        failed("Error", error.response.data.message);
        navigate("/forgot-password");
      } else {
        failed("Error", "An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setName(userName);
    }
  }, []);

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
              <p className="mb-4">
                {name} Enter your email to reset your password.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="flex items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1  w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                    <ShowPassword
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="flex items-center">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1  w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                    <ShowPassword
                      showPassword={showConfirmPassword}
                      setShowPassword={setShowConfirmPassword}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
