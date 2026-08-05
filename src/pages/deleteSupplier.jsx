import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed, warning2 } from "../services/helper";
import DeleteComp from "../components/deleteComp";

export default function DeleteSupplier() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [fetchSupplier, setFetchSupplier] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState("");

  const API_URL = import.meta.env.VITE_APP_API_URL;

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${API_URL}/supplier/suppliers`, {
        withCredentials: true,
      });
      setFetchSupplier(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);
  const handleDelete = async () => {
    if (!selectedSupplierId) {
      alert("Please select a supplier first");
      return;
    }

    const result = await warning2(
      "warning",
      "Are you sure you want to delete this supplier?",
    );
    if (!result.isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `${API_URL}/supplier/delete-supplier/${selectedSupplierId}`,
        {
          withCredentials: true,
        },
      );
      success("Success", response.data.message);
    } catch (error) {
      if (error.response.status === 500) {
        console.error("Error deleting supplier:", error);
        failed("Failed", error.response.data.message);
        return;
      }
      console.error("Error deleting supplier:", error);
      failed("Failed to delete supplier. Please try again.");
    }
  };
  const supplierOptions = fetchSupplier.map((supplier) => ({
    value: supplier.id,
    label: supplier.name,
  }));

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Delete Supplier</h2>

          <DeleteComp
            Options={supplierOptions}
            setSelectedId={setSelectedSupplierId}
            handleDelete={handleDelete}
            action="Supplier"
          />
        </div>
      </div>
    </div>
  );
}
