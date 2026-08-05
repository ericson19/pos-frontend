import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed, warning2 } from "../services/helper";
import DeleteComp from "../components/deleteComp";

export default function DeleteCategory() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [fetchCategory, setFetchCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const API_URL = import.meta.env.VITE_APP_API_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/view-category`, {
        withCredentials: true,
      });
      setFetchCategory(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const handleDelete = async () => {
    if (!selectedCategoryId) {
      alert("Please select a category first");
      return;
    }

    const result = await warning2(
      "warning",
      "Are you sure you want to delete this category?",
    );
    if (!result.isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `${API_URL}/product/delete-category/${selectedCategoryId}`,
        {
          withCredentials: true,
        },
      );
      success("Category deleted successfully!");
    } catch (error) {
      if (error.response.status === 500) {
        failed("Falied", error.response.data.message);
        return;
      }
      console.error("Error deleting category:", error);
      failed("Failed to delete category. Please try again.");
    }
  };
  const categoryOptions = fetchCategory.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Delete Category</h2>

          <DeleteComp
            Options={categoryOptions}
            setSelectedId={setSelectedCategoryId}
            handleDelete={handleDelete}
            action="Category"
          />
        </div>
      </div>
    </div>
  );
}
