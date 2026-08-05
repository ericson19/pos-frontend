import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed, warning2 } from "../services/helper";

import DeleteComp from "../components/deleteComp";

export default function DeleteProduct() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  const API_URL = import.meta.env.VITE_APP_API_URL;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/product/viewAll-product-user`,
        {
          withCredentials: true,
        },
      );
      console.log("Products fetched:", response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async () => {
    if (!selectedProductId) {
      alert("Please select a product first");
      return;
    }

    const result = await warning2(
      "warning",
      "Are you sure you want to delete this product?",
    );
    if (!result.isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `${API_URL}/product/delete-product/${selectedProductId}`,
        {
          withCredentials: true,
        },
      );
      success("Product deleted successfully!");
    } catch (error) {
      if (error.response.status === 500) {
        failed("Cannot delete product that have made sales records.");
        return;
      }
      console.error("Error deleting product:", error);
      failed("Product that have made sales records cannot be deleted.");
    }
  };
  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Delete Product</h2>
          <DeleteComp
            Options={productOptions}
            setSelectedId={setSelectedProductId}
            handleDelete={handleDelete}
            action="Product"
          />
        </div>
      </div>
    </div>
  );
}
