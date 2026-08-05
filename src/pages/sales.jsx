import { use, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed, useFormatMoney } from "../services/helper";
import SalesTable from "../components/tablesComp/salesTable.jsx";
import NextButton from "../components/limitComp/nextButton.jsx";
import PrevButton from "../components/limitComp/prevButton.jsx";
import SelectLimit from "../components/limitComp/selectLimit.jsx";
import ItemModal from "../components/sales/itemModal.jsx";
import Select from "react-select";

import JumpButton from "../components/limitComp/jumpButton.jsx";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../context/authContext.jsx";
import { SettingContext } from "../context/settingContext.jsx";
import DatePicker from "react-datepicker";

function Sales() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [categoryId, setCategoryId] = useState("");
  const [fetchCategory, setFetchCategory] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [userId, setUserId] = useState("");
  const [userDateId, setUserDateId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [users, setUsers] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [isActive, setIsActive] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [salesDetails, setSalesDetails] = useState({});

  const { user } = useContext(AuthContext);
  const { settings } = useContext(SettingContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const printRef = useRef(null);
  const formatMoney = useFormatMoney();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  // Fetch Sales Data
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/sales/sales`, {
        params: {
          limit: limit,
          page,
        },
        withCredentials: true,
      });
      // API returns an array (not wrapped in { sales })
      setSales(response.data.sales || []);
      setTotalAmount(response.data.totalAmount || 0);
      setTotalPaid(response.data.totalPaid || 0);
      setTotalPages(response.data.totalPages || 0);
      console.log("Sales fetched:", response.data.sales);
      console.log("Total Amount:", response.data.totalAmount);
      console.log("Total Paid:", response.data.totalPaid);
      console.log("Total Pages:", response.data.totalPages);
    } catch (error) {
      console.error("Error fetching sales:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    }
  };

  // Fetch Users for filter
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/sales-users`, {
        withCredentials: true,
      });
      setUsers(response.data.users || []);
      console.log("Users fetched:", response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch Customers for filter
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_URL}/customers/customers`, {
        withCredentials: true,
      });
      setCustomers(response.data.customers);
      console.log("Customers fetched:", response.data.customers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  const customerOptions = customers.map((customer) => ({
    value: customer.id,
    label: `${customer.name} - ${customer.phone}`,
  }));

  // Filter Handlers for customer
  const handleCustomerFilter = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/sales/customer-name/${customerId}`,
        {
          params: {
            limit: limit,
            page,
          },
          withCredentials: true,
        },
      );
      setIsActive("customer");
      if (isActive != "customer") setPage(1);
      setSales(response.data.sales || []);
      console.log("customerId:", response.data.sales);
      setTotalAmount(response.data.totalAmount || 0);
      setTotalPages(response.data.totalPages || 0);
      setTotalPaid(response.data.totalPaid || 0);

      console.log("Sales fetched by user:", response.data.sales);
    } catch (error) {
      console.error("Error fetching sales by user:", error);
    }
  };

  // Filter Handlers for user
  const handleUserFilter = async () => {
    try {
      const response = await axios.get(`${API_URL}/sales/user/${userId}`, {
        params: {
          limit: limit,
          page,
        },
        withCredentials: true,
      });
      setIsActive("user");
      if (isActive != "user") setPage(1);
      setSales(response.data.sales || []);
      setTotalAmount(response.data.totalAmount || 0);
      setTotalPages(response.data.totalPages || 0);
      setTotalPaid(response.data.totalPaid || 0);

      console.log("Sales fetched by user:", response.data.sales);
    } catch (error) {
      console.error("Error fetching sales by user:", error);
    }
  };

  // Filter Handlers for date range
  const handleDateRange = async () => {
    try {
      const response = await axios.get(`${API_URL}/sales/date-range`, {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          limit: limit,
          page: page,
        },
        withCredentials: true,
      });
      setIsActive("date");
      if (isActive != "date") setPage(1);
      setSales(response.data.sales || []);
      setTotalAmount(response.data.totalAmount || 0);
      setTotalPages(response.data.totalPages || 0);
      setTotalPaid(response.data.totalPaid || 0);
      console.log("Sales fetched by date range:", response.data.sales);
    } catch (error) {
      console.error("Error fetching sales by date range:", error);
    }
  };

  // Filter Handlers for user and date range
  const handleUserAndDateFilter = async () => {
    try {
      const response = await axios.get(`${API_URL}/sales/seller-date-range/`, {
        params: {
          sellerId: userDateId,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          limit: limit,
          page: page,
        },
        withCredentials: true,
      });
      setIsActive("userDate");
      if (isActive != "userDate") setPage(1);
      setSales(response.data.sales || []);
      setTotalAmount(response.data.totalAmount || 0);
      setTotalPaid(response.data.totalPaid || 0);
      setTotalPages(response.data.totalPages);

      console.log("Sales fetched by user and date range:", response.data.sales);
    } catch (error) {
      console.error("Error fetching sales by user and date range:", error);
    }
  };
  const handlePaymentStatusFilter = async () => {
    try {
      const response = await axios.get(`${API_URL}/sales/payment-status`, {
        params: {
          paymentStatus,
          limit,
          page,
        },
        withCredentials: true,
      });
      setIsActive("payment");
      if (isActive != "payment") setPage(1);
      setSales(response.data.sales || []);
      setTotalAmount(response.data.totalAmount || 0);
      setTotalPaid(response.data.totalPaid || 0);
      setTotalPages(response.data.totalPages);
      console.log("Sales fetched by payment status:", response.data.sales);
    } catch (error) {
      console.error("Error fetching sales by payment status:", error);
    }
  };

  // Filter Handlers for payment status
  const handleItems = async (invoiceNumber) => {
    try {
      const response = await axios.get(
        `${API_URL}/sales/sale-items/${invoiceNumber}`,
        {
          withCredentials: true,
        },
      );
      console.log("data:", response.data);
      setSalesDetails(response.data.sale || {});
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching sale items:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCustomers();
    if (isActive === "all") fetchProducts();
    if (isActive === "user") handleUserFilter();
    if (isActive === "date") handleDateRange();
    if (isActive === "userDate") handleUserAndDateFilter();
    if (isActive === "payment") handlePaymentStatusFilter();
    if (isActive === "customer") handleCustomerFilter();
  }, [page, limit, isActive]);

  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-2">
            <h2 className="text-2xl font-semibold mb-4">Sales List</h2>
            <button
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>
            {showFilter && (
              <div className="mb-4">
                <div className="flex flex-col md:flex-row bg-white p-4 rounded-lg justify-around items-center mb-4 text-sm  shadow-2xl gap-4">
                  <div className="w-full">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-full flex p-2  gap-4">
                    <Select
                      options={customerOptions}
                      onChange={(selectedOption) =>
                        setCustomerId(selectedOption.value)
                      }
                      classNames={{
                        container: (state) =>
                          state.isFocused
                            ? "w-full border-blue-500"
                            : "w-full border-gray-300",
                      }}
                      placeholder="Select Customer"
                    />
                    <button
                      onClick={handleCustomerFilter}
                      className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                    >
                      Filter
                    </button>
                  </div>
                  <div className="w-full flex p-2  gap-4">
                    <select
                      onChange={(e) => setUserId(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm
                   focus:border-blue-500 focus:outline-none"
                      name=""
                      id=""
                    >
                      <option value="">Filter by user</option>
                      {users.map((usr) => (
                        <option key={usr.id} value={usr.id}>
                          {usr.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleUserFilter}
                      className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                    >
                      Filter
                    </button>
                  </div>
                </div>
                {/* Filter Section */}
                <div className="text-sm w-full p-2 mb-4 bg-white flex flex-col md:flex-row justify-around rounded-lg">
                  <div className="w-full">
                    <label className="block mt-2">Filter by date</label>
                    <div className="flex justify-around items-center px-2 gap-2">
                      {/* <label className="w-full" htmlFor="">
                      Select Date Range
                    </label> */}
                      <DatePicker
                        selectsRange
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        onChange={([start, end]) => {
                          setDateRange({ startDate: start, endDate: end });
                        }}
                        isClearable={true}
                        placeholderText="Select date range"
                        className="w-full md:w-[25vw] p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />

                      <button
                        onClick={handleDateRange}
                        className="w-full py-2 px-4 my-2  bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block mt-2">
                      Filter by Payment Status
                    </label>
                    <div className="text-sm w-full flex px-2  gap-4 my-2">
                      <select
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm
                    focus:border-blue-500 focus:outline-none"
                        name=""
                        id=""
                      >
                        <option value="">Filter by Payment Status</option>
                        <option value="partial">Partial</option>
                        <option value="debt">Debt</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={handlePaymentStatusFilter}
                        className=" py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                      >
                        Filter
                      </button>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block mt-2">
                      Filter by Date and User
                    </label>
                    <div className="text-sm w-full flex px-2  gap-2 my-2">
                      <DatePicker
                        selectsRange
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        onChange={([start, end]) => {
                          setDateRange({ startDate: start, endDate: end });
                        }}
                        isClearable={true}
                        placeholderText="Select date range"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />

                      <select
                        onChange={(e) => setUserDateId(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 w-full py-2 text-sm text-gray-800 shadow-sm
               focus:border-blue-500 focus:outline-none"
                        name=""
                        id=""
                      >
                        <option value="">select user</option>
                        {users.map((usr) => (
                          <option key={usr.id} value={usr.id}>
                            {usr.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleUserAndDateFilter}
                        className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {sales && sales.length > 0 ? (
              <div className="bg-white rounded-2xl p-4 shadow ">
                <div ref={printRef}>
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <p>Showing {sales.length} sales</p>
                    <p>{user ? `Logged in as: ${user.name}` : "Guest"}</p>
                    <p>
                      printed on {new Date().toLocaleDateString()} at{" "}
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <p>Total Amount N: {formatMoney(totalAmount)}</p>
                    <p>Total Paid N: {formatMoney(totalPaid)}</p>
                  </div>
                  <SalesTable sales={sales} handleItems={handleItems} />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                  <button
                    onClick={handlePrint}
                    className="bg-blue-900 px-4 py-2 rounded text-white mt-4"
                  >
                    Print Products
                  </button>
                  <div>
                    <PrevButton page={page} setPage={setPage} />

                    <span className="text-xs">
                      Page {page} of {totalPages}
                    </span>

                    <JumpButton
                      totalPages={totalPages}
                      page={page}
                      setPage={setPage}
                      jump={2}
                    />
                    <JumpButton
                      totalPages={totalPages}
                      page={page}
                      setPage={setPage}
                      jump={3}
                    />
                    <JumpButton
                      totalPages={totalPages}
                      page={page}
                      setPage={setPage}
                      jump={4}
                    />

                    {/* next button */}
                    <NextButton
                      page={page}
                      setPage={setPage}
                      totalPages={totalPages}
                    />

                    <SelectLimit
                      limit={limit}
                      setLimit={setLimit}
                      setPage={setPage}
                    />
                  </div>
                </div>
              </div>
            ) : (
              "Refresh to load sales data"
            )}
          </div>
          {isModalOpen && (
            <ItemModal
              onClose={() => setIsModalOpen(false)}
              sales={salesDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Sales;
