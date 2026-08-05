import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

import axios from "axios";
import { useState, useEffect } from "react";
import { success, failed } from "../services/helper";
import Select from "react-select";

export default function EditProduct() {
  const [searchName, setSearchName] = useState("");
  const [products, setProducts] = useState(null);
  const [getAllStores, setGetAllStores] = useState([]);
  const [stores, setStores] = useState([]);
  const [productId, setProductId] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/product/viewAll-product-user`,
          {
            withCredentials: true,
          },
        );
        console.log("Products fetched:", response.data.products);
        setProductId(response.data.products);
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
  const productOptions = productId.map((product) => ({
    value: product.id,
    label: product.name,
  }));
  const handleClick = async () => {
    if (!searchName) {
      setProducts(null);
      setError("Please enter a product name to search.");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/product/viewByName/`, {
        params: { productId: searchName, storeId: stores },
        withCredentials: true,
      });
      setError("");
      setProducts(response.data.product);
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
        name: products.name,
        barCode: products.barCode,
        price: products.price,
        description: products.description,
        lowAlert: products.lowAlert,
      };
      await axios.put(
        `${API_URL}/product/update-product/${products.id}`,
        updatedData,
        {
          withCredentials: true,
        },
      );
      success("Update Successful", "Product updated successfully");
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
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="mb-4 w-full md:w-1/2">
                <div>
                  <label htmlFor="">Search for a product</label>
                  <Select
                    options={productOptions}
                    onChange={(e) => setSearchName(e.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="mt-4 ">
                  <label className="block" htmlFor="">
                    Select store
                  </label>
                  <select
                    value={stores.value}
                    onChange={(e) => setStores(e.target.value)}
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
              {products ? (
                <div className="mt-4 ">
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    action=""
                    method="get"
                  >
                    <div className="mb-4">
                      <label className="block mb-2">Product Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={products.name}
                        onChange={(e) =>
                          setProducts({ ...products, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Bar Code</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={products.barCode}
                        onChange={(e) =>
                          setProducts({ ...products, barCode: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Price</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={products.price}
                        onChange={(e) =>
                          setProducts({ ...products, price: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">Description</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={products.description}
                        onChange={(e) =>
                          setProducts({
                            ...products,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2">low stock alert</label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={products.lowAlert}
                        onChange={(e) =>
                          setProducts({
                            ...products,
                            lowAlert: e.target.value,
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
