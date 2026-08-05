import { useState } from "react";
import Sidebar from "../components/sidebar";
import { success, failed } from "../services/helper";
import Navbar from "../components/navbar";
import axios from "axios";
function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCategory = {
        name: categoryName,
        description: categoryDescription,
      };
      await axios.post(`${API_URL}/product/add-category`, newCategory, {
        withCredentials: true,
      });
      setCategoryName("");
      setCategoryDescription("");
      setError("");
      success("Success", "Category added successfully");
    } catch (error) {
      console.error("Error adding category:", error);
      if (error.response && error.response.data) {
        failed("Error", error.response.data.message);
        setError(error.response.data.message);
        return;
      }
      failed("Error", "Failed to add category");
    }
  };
  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          {/* Category content goes here */}
          <div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form
              action=""
              method="post"
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className=" bg-white p-4 rounded-lg">
                <div className="mb-4 w-full md:w-1/2">
                  <label className="block mb-2">Category Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>
                <div className="mb-4 w-full md:w-1/2">
                  <label className="block mb-2">Category Description</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter category description"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 w-40 bg-amber-500 text-white rounded hover:bg-amber-600"
              >
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
