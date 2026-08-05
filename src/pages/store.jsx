import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from "axios";
import { success, failed } from "../services/helper";

export default function Store() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [storeData, setStoreData] = useState({
    name: "",
    location: "",
  });
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/create-store`, storeData, {
        withCredentials: true,
      });

      success("Store added successfully!");
      setStoreData({ name: "", location: "" });
    } catch (error) {
      console.error("Error adding store:", error);
      failed("Failed to add store. Please try again.");
    }
  };

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="w-full p-6">
          <h2 className="text-2xl font-semibold mb-4">Add Store</h2>
          <form
            method="post"
            onSubmit={handleSubmit}
            className="w-full bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Store Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                placeholder="Enter store name"
                value={storeData.name}
                onChange={(e) =>
                  setStoreData({ ...storeData, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Store Location
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                placeholder="Enter store location"
                value={storeData.location}
                onChange={(e) =>
                  setStoreData({ ...storeData, location: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Store
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
