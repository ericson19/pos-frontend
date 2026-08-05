import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed, warning2 } from "../services/helper";
import DeleteComp from "../components/deleteComp";

export default function DeleteStore() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [fetchStore, setFetchStore] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState("");

  const API_URL = import.meta.env.VITE_APP_API_URL;

  const fetchStores = async () => {
    try {
      const response = await axios.get(`${API_URL}/stores`, {
        withCredentials: true,
      });
      setFetchStore(response.data.stores);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);
  const handleDelete = async () => {
    if (!selectedStoreId) {
      alert("Please select a store first");
      return;
    }

    const result = await warning2(
      "warning",
      "Are you sure you want to delete this store?",
    );
    if (!result.isConfirmed) {
      return;
    }
    try {
      await axios.delete(`${API_URL}/delete-store/${selectedStoreId}`, {
        withCredentials: true,
      });
      success("Store deleted successfully!");
    } catch (error) {
      if (error.response.status === 500) {
        console.error("Error deleting store:", error);
        failed("Failed", error.response.data.message);
        return;
      }
      console.error("Error deleting store:", error);
      failed("Failed to delete store. Please try again.");
    }
  };
  const storeOptions = fetchStore.map((store) => ({
    value: store.id,
    label: store.name,
  }));

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Delete Store</h2>

          <DeleteComp
            Options={storeOptions}
            setSelectedId={setSelectedStoreId}
            handleDelete={handleDelete}
            action="Store"
          />
        </div>
      </div>
    </div>
  );
}
