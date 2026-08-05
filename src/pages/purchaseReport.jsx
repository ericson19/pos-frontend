import { use, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import PurchaseTable from "../components/tablesComp/purchaseTable.jsx";
import NameDisplay from "../components/nameDisplay";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../context/authContext.jsx";
import DatePicker from "react-datepicker";

function Product() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [userId, setUserId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [users, setUsers] = useState([]);
  const [supplierDateRange, setSupplierDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/purchase-users`, {
        withCredentials: true,
      });
      setUsers(response.data.users);
      console.log("Users fetched:", response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${API_URL}/supplier/suppliers`, {
        withCredentials: true,
      });
      setSuppliers(response.data.suppliers);
      console.log("Suppliers fetched:", response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchPurchase = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/purchase/allPurchases`, {
        withCredentials: true,
      });
      setPurchases(response.data.purchases);
      console.log("Purchases fetched:", response.data.purchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async () => {
    console.log(supplierDateRange.startDate.toISOString());
    console.log(supplierDateRange.endDate.toISOString());
    setPurchases([]);
    try {
      const response = await axios.get(`${API_URL}/purchase/dateRange`, {
        params: {
          startDate: supplierDateRange.startDate.toISOString(),
          endDate: supplierDateRange.endDate.toISOString(),
        },
        withCredentials: true,
      });
      setPurchases(response.data.purchases);
      console.log("Filtered Purchases fetched:", response.data.purchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    }
  };

  //filter by staff and date
  const handleStaff = async () => {
    console.log(supplierDateRange.startDate.toISOString());
    console.log(supplierDateRange.endDate.toISOString());
    setPurchases([]);
    try {
      const response = await axios.get(
        `${API_URL}/purchase/receivedBy/${userId}`,
        {
          params: {
            startDate: supplierDateRange.startDate.toISOString(),
            endDate: supplierDateRange.endDate.toISOString(),
          },
          withCredentials: true,
        }
      );
      setPurchases(response.data.purchases);
      console.log("Filtered Purchases fetched:", response.data.purchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    }
  };

  //filter by supplier and date
  const handleSupplier = async () => {
    console.log(supplierDateRange.startDate.toISOString());
    console.log(supplierDateRange.endDate.toISOString());
    setPurchases([]);
    try {
      const response = await axios.get(
        `${API_URL}/purchase/supplier/${supplierId}`,
        {
          params: {
            startDate: supplierDateRange.startDate.toISOString(),
            endDate: supplierDateRange.endDate.toISOString(),
          },
          withCredentials: true,
        }
      );
      setPurchases(response.data.purchases);
      console.log("Filtered Purchases fetched:", response.data.purchases);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchPurchase();
    fetchSuppliers();
    fetchUsers();
  }, []);
  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-2">
            <h2 className="text-2xl font-semibold mb-4">Purchase List</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg mb-2"
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>
            {showFilter && (
              <div className=" bg-white rounded-lg text-sm  shadow-2xl ">
                <div className="flex justify-around items-center tracking-normal gap-4 p-1 mb-2">
                  <div className="w-full">
                    <label className="block" htmlFor="">
                      Search Products
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-full p-2">
                    <label htmlFor="">Filter by Staff and Date</label>
                    <div className="w-full flex items-center   gap-4 text-sm">
                      <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full p-2 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        name=""
                        id=""
                      >
                        <option value="">Filter by Staff</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                      <DatePicker
                        selectsRange
                        showIcon
                        showMonthDropdown
                        startDate={supplierDateRange.startDate}
                        endDate={supplierDateRange.endDate}
                        onChange={([start, end]) => {
                          setSupplierDateRange({
                            startDate: start,
                            endDate: end,
                          });
                        }}
                        isClearable={true}
                        placeholderText="Select date range"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={handleStaff}
                        className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional filter row */}
                <div className="flex justify-around items-center tracking-normal gap-4 p-1 mb-2">
                  <div className="w-full p-2">
                    <label className="block" htmlFor="">
                      Filter by Supplier and Date
                    </label>
                    <div className="flex gap-2 w-full">
                      <select
                        value={supplierId}
                        onChange={(e) => setSupplierId(e.target.value)}
                        className="w-full border px-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        name=""
                        id=""
                      >
                        <option value="">Filter by Supplier</option>
                        {suppliers.map((supplier) => (
                          <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </option>
                        ))}
                      </select>
                      <DatePicker
                        selectsRange
                        showIcon
                        showMonthDropdown
                        startDate={supplierDateRange.startDate}
                        endDate={supplierDateRange.endDate}
                        onChange={([start, end]) => {
                          setSupplierDateRange({
                            startDate: start,
                            endDate: end,
                          });
                        }}
                        isClearable={true}
                        placeholderText="Select date range"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={handleSupplier}
                        className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                  <div className="w-full ">
                    <div className="w-full">
                      <label className="block" htmlFor="">
                        Filter by Dates Only
                      </label>
                      <div className="flex items-center gap-4">
                        <DatePicker
                          selectsRange
                          startDate={supplierDateRange.startDate}
                          endDate={supplierDateRange.endDate}
                          onChange={([start, end]) => {
                            setSupplierDateRange({
                              startDate: start,
                              endDate: end,
                            });
                          }}
                          isClearable={true}
                          placeholderText="Select date range"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        />
                        <button
                          onClick={handleFilter}
                          className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isLoading && <p>Loading products...</p>}
            {purchases.length > 0 ? (
              <div ref={printRef} className="bg-white rounded-2xl p-4 shadow ">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <p>Showing {purchases.length} purchases</p>
                  <p>{user ? `Logged in as: ${user.name}` : "Guest"}</p>
                  <p>
                    printed on {new Date().toLocaleDateString()} at{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <PurchaseTable
                  purchases={purchases.filter((purchase) =>
                    purchase?.Supplier?.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
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
