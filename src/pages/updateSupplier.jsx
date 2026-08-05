import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

import axios from "axios";
import { useState, useEffect } from "react";
import { success, failed } from "../services/helper";
import Select from "react-select";

export default function UpdateSupplier() {
  const [supplierId, setSupplierId] = useState("");

  const [updatingSupplier, setUpdatingSupplier] = useState(null);
  const [getAllStores, setGetAllStores] = useState([]);
  const [storeId, setStoreId] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/supplier/suppliers`, {
          withCredentials: true,
        });
        console.log("Suppliers fetched:", response.data.suppliers);
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchStores = async () => {
      try {
        const response = await axios.get(`${API_URL}/stores`, {
          withCredentials: true,
        });
        setGetAllStores(response.data.stores);
        console.log("Stores fetched:", response.data.stores);
      } catch (err) {
        console.error("Error fetching stores:", err);
        if (err.response && err.response.data) {
          console.error("Error details:", err.response.data);
          setError(err.response.data.message);
        }
      }
    };
    fetchStores();
    fetchProducts();
  }, []);
  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));
  const handleClick = async () => {
    if (!supplierId) {
      setUpdatingSupplier(null);
      setError("Please enter a product name to search.");
      return;
    }
    console.log("Supplier ID:", supplierId, "Store ID:", storeId);
    try {
      const response = await axios.get(
        `${API_URL}/supplier/supplier/${supplierId}`,
        {
          params: { storeId: storeId },
          withCredentials: true,
        },
      );
      setError("");
      setUpdatingSupplier(response.data.supplier);
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error fetching products:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        setProducts(null);
        failed("Fetch Failed", error.response.data.message);
        return;
      }
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: updatingSupplier.name,
        contactInfo: updatingSupplier.contactInfo,
        address: updatingSupplier.address,
      };
      await axios.put(
        `${API_URL}/supplier/supplier/${updatingSupplier.id}`,
        updatedData,
        {
          withCredentials: true,
        },
      );
      success("Update Successful", "Supplier updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        failed("Update Failed", error.response.data.message);
        return;
      }
    }
  };

  return (
    <div className="">
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300 h-screen">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="mb-4 w-full md:w-1/2">
                <div>
                  <label htmlFor="">Search for a supplier</label>
                  <Select
                    options={supplierOptions}
                    onChange={(e) => setSupplierId(e.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="Search supplier name"
                  />
                </div>

                <div className="mt-4 ">
                  <label className="block" htmlFor="">
                    Select store
                  </label>
                  <select
                    value={storeId.value}
                    onChange={(e) => {
                      setStoreId(e.target.value);
                    }}
                    name=""
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                    id=""
                  >
                    <option>Select a store</option>
                    {/* Populate store options here */}
                    {getAllStores.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleClick}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Search
                </button>
              </div>
              {updatingSupplier ? (
                <div className="mt-4 ">
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    action=""
                    method="get"
                  >
                    <div className="mb-4">
                      <label className="block mb-2">Supplier Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={updatingSupplier.name}
                        onChange={(e) =>
                          setUpdatingSupplier({
                            ...updatingSupplier,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Conatact Info</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={updatingSupplier.contactInfo}
                        onChange={(e) =>
                          setUpdatingSupplier({
                            ...updatingSupplier,
                            contactInfo: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Address</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={updatingSupplier.address}
                        onChange={(e) =>
                          setUpdatingSupplier({
                            ...updatingSupplier,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleEdit}
                      className="px-4 py-2 bg-green-500 text-white rounded w-1/2"
                    >
                      Update Product
                    </button>
                  </form>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
