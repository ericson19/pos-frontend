import { useState, useEffect, useRef, useContext } from "react";
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Bar } from "recharts";
import { Pie, PieChart, Tooltip } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import InventoryTable from "../components/tablesComp/invenoryTable.jsx";

import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../context/authContext.jsx";
import DatePicker from "react-datepicker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";

function InventoryReport() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [outProducts, setOutProducts] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateProduct, setStartDateProduct] = useState(null);
  const [endDateProduct, setEndDateProduct] = useState(null);
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState([]);
  const [summaryinventory, setSummaryInventory] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chartIn, setChartIn] = useState([]);
  const [chartOut, setChartOut] = useState([]);
  const [data, setData] = useState([]);

  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/report/inventory-report`, {
        withCredentials: true,
      });
      setProducts(response.data.inflows);
      setOutProducts(response.data.outflows);
      setChartIn(response.data.inflows);
      setChartOut(response.data.outflows);
      console.log("Products fetched:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/viewAll-product`, {
        withCredentials: true,
      });
      setProductData(response.data.product);
      console.log("Products data fetched:", response.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleFilter = async () => {
    console.log(startDateProduct.toISOString());
    console.log(endDateProduct.toISOString());
    console.log(productId);

    try {
      const response = await axios.get(
        `${API_URL}/report/product-date-inventory-report/${productId}`,
        {
          params: {
            startDate: startDateProduct.toISOString(),
            endDate: endDateProduct.toISOString(),
          },
          withCredentials: true,
        },
      );
      setProducts(response.data.inflows);
      setOutProducts(response.data.outflows);

      console.log("Filtered Products fetched:", response.data);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };
  const handleSummary = async () => {
    try {
      console.log(startDate.toISOString());
      console.log(endDate.toISOString());
      const response = await axios.get(`${API_URL}/report/inventory-summary`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        withCredentials: true,
      });
      setSummaryInventory(response.data.summary);
      console.log("Summary data:", response.data.summary);
    } catch (error) {
      console.error("Error fetching inventory summary:", error);
    }
  };

  //product option for select dropdown
  const productOptions = productData.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  useEffect(() => {
    fetchInventory();
    fetchProductData();
  }, []);

  //chart data
  const totalIn = chartIn.reduce(
    (sum, item) => sum + parseInt(item.totalInflow),
    0,
  );
  const totalOut = chartOut.reduce(
    (sum, item) => sum + parseInt(item.totalOutflow),
    0,
  );
  console.log("Total In:", totalIn);
  console.log("Total Out:", totalOut);

  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-2">
            <h2 className="text-2xl font-semibold mb-4">Stock List</h2>
            <div className="flex justify-center mb-4">
              <BarChart
                style={{ width: "30vh", height: "30vh", aspectRatio: 2 }}
                data={[
                  { name: "Inflow", value: totalIn },
                  { name: "Outflow", value: totalOut },
                ]}
                responsive={true}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
                <RechartsDevtools />
              </BarChart>
            </div>

            <div className="flex flex-col lg:flex-row bg-white p-4 rounded-lg justify-around items-center mb-4 text-sm  shadow-2xl gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search User..."
                className="w-full h-15 p-2 border border-gray-300 rounded-lg"
              />
              <div className="w-full h-20  p-2 border border-gray-300 rounded-lg">
                <label htmlFor="">select date to check product added</label>
                <div className="flex gap-4 mt-2">
                  <Select
                    options={productOptions}
                    placeholder="Select Product"
                    isSearchable={true}
                    onChange={(selected) => setProductId(selected?.value)}
                    className="w-full"
                  />
                  <DatePicker
                    selectsRange
                    startDate={startDateProduct}
                    endDate={endDateProduct}
                    onChange={([start, end]) => {
                      setStartDateProduct(start);
                      setEndDateProduct(end);
                    }}
                    withPortal
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 shadow-sm
                   focus:border-blue-500 focus:outline-none"
                    placeholderText="select date"
                  />
                  <button
                    onClick={handleFilter}
                    className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                  >
                    Filter
                  </button>
                </div>
              </div>
              <div className="container w-full h-20 p-2 border border-gray-300 rounded-lg gap-4">
                <label htmlFor="">select date to check summary</label>
                <div className="container flex gap-4 mt-2">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    withPortal
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 shadow-sm
                   focus:border-blue-500 focus:outline-none"
                    placeholderText="select date"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    withPortal
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-800 shadow-sm
                  focus:border-blue-500 focus:outline-none"
                    placeholderText="select date"
                  />
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg "
                    onClick={handleSummary}
                  >
                    Summarize
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowTable(!showTable)}
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              {showTable ? "Hide Inventory Table" : "Show Inventory Table"}
            </button>
            {products && products.length > 0 ? (
              <div ref={printRef} className="bg-white rounded-2xl p-4 shadow ">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  {/* <p>Showing {products.length} products</p> */}
                  <p>{user ? `Logged in as: ${user.name}` : "Guest"}</p>
                  <p>
                    printed on {new Date().toLocaleDateString()} at{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <InventoryTable
                  product={products.filter((product) =>
                    product?.User?.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )}
                  outProducts={outProducts.filter((product) =>
                    product?.User?.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )}
                  summaryInventory={summaryinventory}
                  showTable={showTable}
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

export default InventoryReport;
