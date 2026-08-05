import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed, warning2 } from "../services/helper";
import DeleteComp from "../components/deleteComp";

export default function DeleteCustomer() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const API_URL = import.meta.env.VITE_APP_API_URL;

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_URL}/customers/customers`, {
        withCredentials: true,
      });
      console.log("Customers fetched:", response.data.customers);
      setCustomers(response.data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  const handleDelete = async () => {
    if (!selectedCustomerId) {
      alert("Please select a customer first");
      return;
    }

    const result = await warning2(
      "warning",
      "Are you sure you want to delete this customer?",
    );
    if (!result.isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `${API_URL}/customers/delete-customers/${selectedCustomerId}`,
        {
          withCredentials: true,
        },
      );
      success("Customer deleted successfully!");
    } catch (error) {
      if (error.response.status === 500) {
        failed("Cannot delete customer that have made sales records.");
        return;
      }
      console.error("Error deleting customer:", error);
      failed("Failed to delete customer. Please try again.");
    }
  };
  const customerOptions = customers.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Delete Customer</h2>

          <DeleteComp
            Options={customerOptions}
            setSelectedId={setSelectedCustomerId}
            handleDelete={handleDelete}
            action="Customer"
          />
        </div>
      </div>
    </div>
  );
}
