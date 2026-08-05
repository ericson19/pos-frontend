import { use, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import ProductTable from "../components/tablesComp/productTable.jsx";

import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../context/authContext.jsx";

function Product() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [fetchCategory, setFetchCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/product/viewAll-product-user`,
        {
          withCredentials: true,
        },
      );
      setProducts(response.data.products);
      console.log("Products fetched:", response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/product/view-category`, {
        withCredentials: true,
      });
      setFetchCategory(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleFilter = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/product/viewby-category/${categoryId}`,
        {
          withCredentials: true,
        },
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    handleFilter();
    document.title = "Product List - POS System";
  }, []);
  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-2">
            <h3 className="text-2xl font-semibold mb-4">Stock List</h3>
            <div className="flex bg-white p-4 rounded-lg justify-around mb-4 text-sm  shadow-2xl gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <div className="w-full flex p-2 border border-gray-300 rounded-lg gap-4">
                <select
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm
               focus:border-blue-500 focus:outline-none"
                  name=""
                  id=""
                >
                  <option value="">Filter by category</option>
                  {fetchCategory.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleFilter}
                  className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                >
                  Filter
                </button>
              </div>
            </div>
            {isLoading && <p>Loading products...</p>}
            {products && products.length > 0 ? (
              <div ref={printRef} className="bg-white rounded-2xl p-4 shadow ">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <p>Showing {products.length} products</p>
                  <p>{user ? `Logged in as: ${user.name}` : "Guest"}</p>
                  <p>
                    printed on {new Date().toLocaleDateString()} at{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <ProductTable
                  products={products.filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )}
                />

                <button
                  onClick={handlePrint}
                  className="bg-blue-900 px-4 py-2 rounded text-white mt-4"
                >
                  Print Products
                </button>
              </div>
            ) : (
              "No products found"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
