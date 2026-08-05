import React, { useState, useEffect, use } from "react";
import Select from "react-select";
import Sidebar from "../components/sidebar.jsx";
import Navbar from "../components/navbar.jsx";
import { success, failed } from "../services/helper.jsx";
import axios from "axios";

export default function TransferStock() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [productId, setProductId] = useState("");
  const [toStoreId, setToStoreId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const productOptions = products.map((prod) => ({
    value: prod.id,
    label: prod.name,
  }));

  const storeOptions = stores.map((store) => ({
    value: store.id,
    label: store.name,
  }));
  //fetch products
  const fetchProducts = async () => {
    // Fetch products from API and set state
    try {
      const response = await axios.get(
        `${API_URL}/product/viewAll-product-user`,
        {
          withCredentials: true,
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchStores = async () => {
    // Fetch stores from API and set state
    try {
      const response = await axios.get(`${API_URL}/stores`, {
        withCredentials: true,
      });
      setStores(response.data.stores);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        productId: productId,
        quantity: quantity,
        toStoreId: toStoreId,
      };
      const response = await axios.post(
        `${API_URL}/stock/transfer-Stock`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("Transfer successful:", response.data);
      success("Success", "Stock transferred successfully");
    } catch (error) {
      console.error("Error transferring stock:", error);
      if (error.response && error.response.data) {
        failed("Error", error.response.data.message);
        console.log("Error details:", error.response.data);
      }
    }
  };

  useEffect(() => {
    // Fetch products and stores if needed
    fetchProducts();
    fetchStores();
  }, []);
  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-2">
            <h1 className="text-2xl font-bold mb-4">Transfer Stock Page</h1>
            {/* Transfer Stock content goes here */}

            <form
              onSubmit={handleSubmit}
              className="flex justify-center"
              action=""
            >
              <div className="bg-white p-6 rounded shadow-md w-full md:w-1/2">
                <div className="space-y-4">
                  <Select
                    options={productOptions}
                    placeholder="Select Product"
                    isSearchable={true}
                    onChange={(selected) => setProductId(selected?.value)}
                    className="w-full"
                  />
                  <Select
                    options={storeOptions}
                    placeholder="Select Store to Transfer"
                    isSearchable={true}
                    onChange={(selected) => setToStoreId(selected?.value)}
                    className="w-full"
                  />
                  <input
                    className="w-full bg-white rounded p-2 border border-gray-300 focus:border-blue-400 focus:outline-none"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="block bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  Transfer Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
