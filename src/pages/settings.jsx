import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { General, Contact, Payment, Email } from "../components/settingComp";
import { success, failed } from "../services/helper";

import axios from "axios";

function Settings() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isActive, setIsActive] = useState("general");

  const [settings, setSettings] = useState({
    siteName: "",
    siteUrl: "",
    logo: null,
    frontPic: null,
    favicon: null,
    city: "",
    country: "",
    email: "",
    phone: "",
    bankName: "",
    bankAccountNumber: "",
    bankAccountName: "",
    currency: "",
    taxRate: "",
    discountRate: "",
    emailHost: "",
    emailPort: "",
    emailUsername: "",
    emailPassword: "",
    address: "",
  });
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    document.title = "Settings - POS";
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/settings/fetch-settings`, {
          withCredentials: true,
        });
        setSettings(response.data.settings);

        console.log("Settings fetched:", response.data.settings);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Settings to be saved:", settings);
    try {
      const formData = new FormData();
      for (const key in settings) {
        formData.append(key, settings[key]);
      }

      const response = await axios.put(
        `${API_URL}/settings/update-settings`,
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("Settings saved successfully:", response.data);
      success("Success", "Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      failed("Error", "Failed to save settings");
    }
  };

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="text-sm p-6">
          <h3 className="text-2xl font-bold">Settings Page</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 justify-around  mt-6">
            <button
              className={`border transition-all duration-300 px-4 py-2 ${isActive === "general" ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"}`}
              onClick={() => setIsActive("general")}
            >
              General
            </button>
            <button
              className={`border transition-all duration-300 px-4 py-2 ${isActive === "contact" ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"}`}
              onClick={() => setIsActive("contact")}
            >
              Contact
            </button>
            <button
              className={`border transition-all duration-300 px-4 py-2 ${isActive === "payment" ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"}`}
              onClick={() => setIsActive("payment")}
            >
              Payment
            </button>
            <button
              className={`border transition-all duration-300 px-4 py-2 ${isActive === "email" ? "bg-blue-600 text-white" : "hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"}`}
              onClick={() => setIsActive("email")}
            >
              Email
            </button>
          </div>
          <div className="p-6">
            <form
              className="bg-white p-6 rounded-lg shadow-md"
              enctype="multipart/form-data"
              method="post"
              onSubmit={handleSave}
            >
              <div>
                {isActive === "general" && (
                  <General settings={settings} setSettings={setSettings} />
                )}
                {isActive === "contact" && (
                  <Contact settings={settings} setSettings={setSettings} />
                )}
                {isActive === "payment" && (
                  <Payment settings={settings} setSettings={setSettings} />
                )}
                {isActive === "email" && (
                  <Email settings={settings} setSettings={setSettings} />
                )}
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
