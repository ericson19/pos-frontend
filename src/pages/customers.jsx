import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SettingContext } from "../context/settingContext";
import { success, failed } from "../services/helper";

function Customers() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const { settings, loading } = useContext(SettingContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    if (!formData.name || !formData.phone) {
      setError("Name and Email are required fields.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/customers/add-customer`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (response.status === 201) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
        setError("");
        success("Customer added successfully", "The customer has been added.");
      }
    } catch (error) {
      console.error("Failed to add customer:", error);
      if (error.response && error.response.data) {
        failed("Error", error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      document.title = "Customers - " + settings.siteName;
    }
  }, [loading]);

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Customers Page</h1>
          {/* Customers Content Goes Here */}
          <div className="bg-white p-6 rounded shadow-md">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form
              className="md:grid md:grid-cols-2 gap-4"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-2"> Customer Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="eg: John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="eg: john.name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="eg: 08123456789"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">Address</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="eg: 123 Main St, Lagos"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded w-1/2"
              >
                Add Customer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers;
