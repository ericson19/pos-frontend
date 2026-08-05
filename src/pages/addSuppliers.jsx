import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SettingContext } from "../context/settingContext";
import { success, failed } from "../services/helper";
import Select from "react-select";

function AddSuppliers() {
  const [stores, setStores] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    storeId: "",
    address: "",
    contactInfo: "",
  });
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const { settings, loading } = useContext(SettingContext);

  const fetchStores = async () => {
    try {
      const response = await axios.get(`${API_URL}/stores`);
      setStores(response.data.stores);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    if (!formData.name || !formData.contactInfo || !formData.storeId) {
      setError("Name and Email are required fields.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/supplier/reg-supplier`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (response.status === 201) {
        setFormData({
          name: "",
          storeId: "",
          phone: "",
          contactInfo: "",
        });
        setError("");
        success("Supplier added successfully", "The customer has been added.");
      }
    } catch (error) {
      console.error("Failed to add Supplier:", error);
      if (error.response && error.response.data) {
        failed("Error", error.response.data.message);
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      document.title = "POS - " + settings.siteName;
    }
    fetchStores();
  }, [loading]);

  const storeOptions = stores.map((store) => ({
    value: store.id,
    label: store.name,
  }));
  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Suppliet's Page</h1>
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
                <label className="block mb-2"> Supplier Name</label>
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
                <label className="block mb-2">Contact info</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="eg: 08123456789"
                  value={formData.contactInfo}
                  onChange={(e) =>
                    setFormData({ ...formData, contactInfo: e.target.value })
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
              <div>
                <label className="block mb-2">Store</label>
                <Select
                  options={storeOptions}
                  value={storeOptions.find(
                    (option) => option.value === formData.storeId,
                  )}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      storeId: selectedOption.value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded w-1/2"
              >
                Add Supplier
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSuppliers;
