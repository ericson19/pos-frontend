import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import axios from "axios";
import { useState, useEffect, use } from "react";

function AddProduct() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [stockQuantity, setStockQuantity] = useState(0);
  const [barcode, setBarcode] = useState("");
  const [storeId, setStoreId] = useState("");
  const [description, setDescription] = useState("");
  const [lowStockAlert, setLowStockAlert] = useState("");
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      productName,
      price,
      categoryId,
      stockQuantity,
      barcode,
      storeId,
      description,
      lowStockAlert,
    });
    try {
      const newProduct = {
        name: productName,
        price: price,
        categoryId: categoryId,
        stock: stockQuantity,
        barCode: barcode,
        storeId: storeId,
        description: description,
        lowAlert: lowStockAlert,
      };
      await axios.post(`${API_URL}/product/add-product`, newProduct, {
        withCredentials: true,
      });
      // Reset form fields
      setProductName("");
      setPrice("");
      setCategoryId("");
      setStockQuantity("");
      setBarcode("");
      setStoreId("");
      setDescription("");
      setLowStockAlert("");
      setError("");
      alert("Product added successfully!");
    } catch (error) {
      console.error("Failed to add product:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        return;
      }
    }
  };

  useEffect(() => {
    document.title = "Add Product - POS System";
    const getCat = async () => {
      try {
        const response = await axios.get(`${API_URL}/product/view-category`, {
          withCredentials: true,
        });
        setCategories(response.data.categories);
        console.log(response.data);
      } catch (error) {
        setError("Failed to fetch categories");
      }
    };
    const getStores = async () => {
      try {
        const response = await axios.get(`${API_URL}/stores`, {
          withCredentials: true,
        });
        setStores(response.data.stores);
        console.log(response.data);
      } catch (error) {
        setError("Failed to fetch stores");
      }
    };
    getCat();
    getStores();
  }, []);

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Add Product Page</h1>
          {/* Add Product Form or Content Goes Here */}
          <div className="bg-white p-6 rounded shadow-md">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form
              className="md:grid md:grid-cols-2 gap-4"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-2">Product Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Stock Quantity</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter stock quantity"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">Barcode</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">Description</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label className="block mb-2">Select Store</label>
                <select
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="">Select store</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Set Low Stock Alert</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter low stock alert quantity"
                  value={lowStockAlert}
                  onChange={(e) => setLowStockAlert(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded w-1/2"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
