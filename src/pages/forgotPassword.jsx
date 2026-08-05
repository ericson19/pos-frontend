import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar.jsx";
import Navbar from "../components/navbar.jsx";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { success, failed } from "../services/helper.jsx";

export default function ForgotPassword() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [selectedStore, setSelectedStore] = useState([]);
  const [storeId, setStoreId] = useState(null);
  const [email, setEmail] = useState("");
  const APP_URL = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  const storeOptions = selectedStore?.map((store) => ({
    value: store.id,
    label: store.name,
  }));
  useEffect(() => {
    // Fetch stores from API
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${APP_URL}/stores`);

        console.log(response.data.stores);
        setSelectedStore(response.data.stores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, [APP_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Email:", email);
    console.log("Store ID:", storeId);

    try {
      const formData = { email: email, storeId: storeId };
      const response = await axios.post(
        `${APP_URL}/password/receive-otp`,
        formData
      );
      console.log(response.data.message);
      localStorage.setItem("email", email);
      localStorage.setItem("storeId", storeId);
      localStorage.setItem("otpExpiry", response.data.expiredAt); // Store OTP expiry time
      localStorage.setItem("userName", response.data.user);
      // Optionally, show a success message to the user
      success(response.data.message);
      navigate("/otp");
    } catch (error) {
      console.error("Error during password reset:", error);
      // Optionally, show an error message to the user
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        failed("Error", error.response.data.message);
      } else {
        failed("Error", "An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
              <p className="mb-4">Enter your email to reset your password.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <Select
                    options={storeOptions}
                    value={storeId?.label}
                    onChange={(e) => setStoreId(e.value)}
                    placeholder="Select Store"
                  />
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
