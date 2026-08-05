import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

import axios from "axios";
import { useState, useEffect } from "react";
import { success, failed } from "../services/helper";
import Select from "react-select";

export default function EditProduct() {
  const [searchName, setSearchName] = useState("");
  const [customers, setCustomers] = useState(null);
  const [getAllStores, setGetAllStores] = useState([]);
  const [stores, setStores] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers/customers`, {
          withCredentials: true,
        });
        console.log("Customers fetched:", response.data.customers);
        setCustomerId(response.data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchProducts();
  }, []);
  const customerOptions = customerId.map((customer) => ({
    value: customer.id,
    label: `${customer.name} - ${customer.phone}`,
  }));
  const handleClick = async () => {
    if (!searchName) {
      setCustomers(null);
      setError("Please enter a product name to search.");
      return;
    }
    try {
      const response = await axios.get(
        `${API_URL}/customers/get-By-customers/${searchName}`,
        {
          withCredentials: true,
        },
      );
      setError("");
      console.log("Customer fetched:", response.data.customer);
      setCustomers(response.data.customer);
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error fetching customers:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        setCustomers(null);
        failed("Fetch Failed", error.response.data.message);
        return;
      }
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: customers.name,
        email: customers.email,
        phone: customers.phone,
        address: customers.address,
      };
      await axios.put(
        `${API_URL}/customers/update-customers/${customers.id}`,
        updatedData,
        {
          withCredentials: true,
        },
      );
      success("Update Successful", "Customer updated successfully");
    } catch (error) {
      console.error("Error updating customer:", error);
      if (error.response && error.response.status === 404) {
        failed("Update Failed", error.response.data.message);
        return;
      } else if (error.response && error.response.status === 500) {
        failed("Update Failed", "Phone number already exists");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="mb-4 w-full md:w-1/2">
                <div>
                  <label htmlFor="">Search for a customer</label>
                  <Select
                    options={customerOptions}
                    onChange={(selectedOption) =>
                      setSearchName(selectedOption.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="Enter customer name"
                  />
                </div>

                <button
                  onClick={handleClick}
                  className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Search
                </button>
              </div>
              {customers ? (
                <div className="mt-4 ">
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    action=""
                    method="get"
                  >
                    <div className="mb-4">
                      <label className="block mb-2">Customer Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={customers.name}
                        onChange={(e) =>
                          setCustomers({ ...customers, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Phone Number</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={customers.phone}
                        onChange={(e) =>
                          setCustomers({ ...customers, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Email</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={customers.email}
                        onChange={(e) =>
                          setCustomers({ ...customers, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Address</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={customers.address}
                        onChange={(e) =>
                          setCustomers({
                            ...customers,
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
                      Update Customer
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
