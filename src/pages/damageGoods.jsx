import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed } from "../services/helper";
import Select from "react-select";

export default function DamageGoods() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);

  const [damageData, setDamageData] = useState({
    productId: "",
    quantity: "",
    reason: "",
  });
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/product/viewbystore/product`,
        {
          withCredentials: true,
        }
      );
      console.log("Products fetched:", response.data.product);
      setProducts(response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!damageData.productId) {
      alert("Please select a product first");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/stock/Damaged-Goods`,
        damageData,
        {
          withCredentials: true,
        }
      );
      console.log("Damaged goods recorded successfully:", response.data);
      success("Damaged goods recorded successfully");
    } catch (error) {
      console.error("Error recording damaged goods:", error);
      failed("Failed to record damaged goods");
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
          <h2 className="text-2xl font-semibold mb-4">Damage Stocks</h2>
          {/* Permission update content goes here */}
          <div className="w-full max-w-md">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Select staff to update
            </label>

            <Select
              options={productOptions}
              onChange={(selectedOption) => {
                // setSelectedProductId(selectedOption.value);
                setDamageData({
                  ...damageData,
                  productId: selectedOption.value,
                });
                setShowForm(true);
              }}
              classNames={{
                container: (state) =>
                  state.isFocused
                    ? "mb-4 w-full border-blue-500"
                    : "mb-4 w-full border-gray-300",
              }}
              placeholder="Select Product"
            />
          </div>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <input
                  type="number"
                  value={damageData.quantity}
                  onChange={(e) =>
                    setDamageData({ ...damageData, quantity: e.target.value })
                  }
                  className="w-full md:w-1/4 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm
                 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter quantity"
                />
                <input type="hidden" value={damageData.productId} />
              </div>
              <div>
                <textarea
                  value={damageData.reason}
                  onChange={(e) =>
                    setDamageData({ ...damageData, reason: e.target.value })
                  }
                  className="w-full md:w-1/4 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm
                 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Enter reason for damage"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 mt-2 bg-linear-to-r from-blue-500 to-blue-700 text-white rounded"
              >
                Update Stock
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
