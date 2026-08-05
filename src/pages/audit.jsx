import { use, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { success, failed } from "../services/helper";
import AuditTable from "../components/tablesComp/auditTable.jsx";
import SalesTable from "../components/tablesComp/salesTable.jsx";
import NextButton from "../components/limitComp/nextButton.jsx";
import PrevButton from "../components/limitComp/prevButton.jsx";
import JumpButton from "../components/limitComp/jumpButton.jsx";
import SelectLimit from "../components/limitComp/selectLimit.jsx";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../context/authContext.jsx";
import DatePicker from "react-datepicker";
import Select from "react-select";

function Sales() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [categoryId, setCategoryId] = useState("");
  const [fetchCategory, setFetchCategory] = useState([]);
  const [sales, setSales] = useState([]);
  const [userId, setUserId] = useState("");
  const [dateUserId, setDateUserId] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalLogs, setTotalLogs] = useState(0);
  const [actionsType, setActionsType] = useState("");
  const [users, setUsers] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("none");

  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/audit-summary`, {
        params: {
          limit: limit,
          page: page,
        },
        withCredentials: true,
      });
      // API returns an array (not wrapped in { sales })
      setSales(response.data.auditLogs || []);

      console.log("Sales fetched:", response.data.auditLogs);
      setTotalPages(response.data.totalPages || 1);
      setTotalLogs(response.data.totalLogs || 0);
      console.log("Total pages:", response.data.totalPages);
    } catch (error) {
      console.error("Error fetching sales:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    }
  };
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
  const handleActionFilter = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/stock-movement-report/${actionsType}`,
        {
          params: {
            limit: limit,
            page: page,
          },
          withCredentials: true,
        },
      );
      setCurrentFilter("actionType");
      setPage(1);
      setSales(response.data.auditLogs || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalLogs(response.data.totalLogs || 0);
      console.log("Sales fetched by action type:", response.data.auditLogs);
    } catch (error) {
      console.error("Error fetching sales by action type:", error);
    }
  };

  // Filter by user
  const handleUserFilter = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/audit-summaries/${userId}`,
        {
          params: {
            limit: limit,
            page: page,
          },
          withCredentials: true,
        },
      );
      setCurrentFilter("user");
      setPage(1);
      setSales(response.data.auditLogs || []);
      setTotalPages(response.data.totalPages || 1);
      // setTotalAmount(response.data.totalAmount || 0);
      // setTotalPaid(response.data.totalPaid || 0);
      console.log("user id", userId);
      console.log("Sales fetched by product:", response.data.auditLogs);
    } catch (error) {
      console.error("Error fetching sales by user:", error);
    }
  };

  const handleDateRange = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/audit-summaries`, {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          limit: limit,
          page: page,
        },
        withCredentials: true,
      });
      setCurrentFilter("dateRange");
      setPage(1);
      setSales(response.data.auditLogs || []);
      setTotalPages(response.data.totalPages || 1);
      console.log("Sales fetched by date range:", response.data.auditLogs);
    } catch (error) {
      console.error("Error fetching sales by date range:", error);
    }
  };

  // Filter by user and date range
  const handleUserAndDateFilter = async () => {
    console.log(
      "Filtering for userId:",
      dateUserId,
      "from",
      dateRange.startDate,
      "to",
      dateRange.endDate,
    );
    try {
      const response = await axios.get(
        `${API_URL}/report/audit-summaries-by-user-and-date`,
        {
          params: {
            userId: dateUserId,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            limit: limit,
            page: page,
          },
          withCredentials: true,
        },
      );
      setPage(1);
      setCurrentFilter("userAndDate");
      setSales(response.data.auditLogs || []);
      setTotalPages(response.data.totalPages || 1);
      console.log(
        "Sales fetched by user and date range:",
        response.data.auditLogs,
      );
    } catch (error) {
      console.error("Error fetching sales by user and date range:", error);
    }
  };
  const userOptions = users.map((usr) => ({
    value: usr.id,
    label: usr.name,
  }));

  const actionsOptions = [
    { value: "purchase", label: "Purchase" },
    { value: "return", label: "Return" },
    { value: "adjustment", label: "Adjustment" },
    { value: "sold", label: "Sold" },
    { value: "damage", label: "Damage" },
    { value: "transfer-in", label: "Transfer In" },
    { value: "transfer-out", label: "Transfer Out" },
  ];

  useEffect(() => {
    fetchUsers();
    if (currentFilter === "none") fetchProducts();
    if (currentFilter === "actionType") handleActionFilter();
    if (currentFilter === "user") handleUserFilter();
    if (currentFilter === "dateRange") handleDateRange();
    if (currentFilter === "userAndDate") handleUserAndDateFilter();
  }, [page, limit, currentFilter]);
  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-2">
            <h2 className="text-2xl font-semibold mb-4">Sales List</h2>
            <button
              className={`mb-4 px-4 py-2 ${
                showFilter ? "bg-red-600" : "bg-blue-600"
              } text-white rounded`}
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>
            {showFilter && (
              <div className="flex flex-col md:flex-row bg-white p-4 rounded-lg justify-around items-center mb-4 text-sm  shadow-2xl gap-4">
                <div className="w-full flex p-2 border border-gray-300 shadow  gap-4">
                  <Select
                    options={actionsOptions}
                    placeholder="Select Action Type"
                    isSearchable={true}
                    onChange={(selected) => setActionsType(selected?.value)}
                    className="w-full"
                  />
                  <button
                    onClick={handleActionFilter}
                    className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                  >
                    Filter
                  </button>
                </div>

                {/* filter by user */}
                <div className="w-full flex border border-gray-300 shadow  p-2  gap-4">
                  <Select
                    options={userOptions}
                    placeholder="Select User"
                    isSearchable={true}
                    onChange={(selected) => setUserId(selected?.value)}
                    className="w-full"
                  />
                  <button
                    onClick={handleUserFilter}
                    className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                  >
                    Filter
                  </button>
                </div>

                <div className=" w-full border border-gray-300 shadow flex justify-around items-center px-2 gap-2">
                  <DatePicker
                    selectsRange
                    withPortal
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onChange={([start, end]) => {
                      setDateRange({ startDate: start, endDate: end });
                    }}
                    isClearable={true}
                    placeholderText="Select date range"
                    className="w-full md:w-[20vw] p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />

                  <button
                    onClick={handleDateRange}
                    className="w-full py-2 px-4 my-2  bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                  >
                    Filter
                  </button>
                </div>

                <div className="text-sm w-full border border-gray-300 shadow flex items-center px-2  gap-2 my-2">
                  <DatePicker
                    selectsRange
                    withPortal
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onChange={([start, end]) => {
                      setDateRange({ startDate: start, endDate: end });
                    }}
                    isClearable={true}
                    placeholderText="Select date range"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />

                  <Select
                    options={userOptions}
                    placeholder="Select User"
                    isSearchable={true}
                    onChange={(selected) => setDateUserId(selected?.value)}
                    className="w-full py-2"
                  />
                  <button
                    onClick={handleUserAndDateFilter}
                    className="py-2 px-4 bg-linear-to-r from-blue-300 to-blue-800 text-white text-sm rounded"
                  >
                    Filter
                  </button>
                </div>
              </div>
            )}
            {sales && sales.length > 0 ? (
              <div ref={printRef} className="bg-white rounded-2xl p-4 shadow ">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <p>
                    Showing {sales.length} of {totalLogs} actions
                  </p>
                  <p>{user ? `Logged in as: ${user.name}` : "Guest"}</p>
                  <p>
                    printed on {new Date().toLocaleDateString()} at{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                {/* <div>
                  <p>Total Amount N: {formatMoney(totalAmount)}</p>
                  <p>Total Paid N: {formatMoney(totalPaid)}</p>
                </div> */}
                <AuditTable sales={sales} />

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
                    {/* <button
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={page === 1}
                      className="px-2 py-1 bg-gray-300 rounded mr-2"
                    >
                      Previous
                    </button>
                    <span className="text-xs">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((prev) => prev + 1)}
                      disabled={page === totalPages}
                      className="px-2 py-1 bg-gray-300 rounded ml-2"
                    >
                      Next
                    </button>
                    <select
                      value={limit}
                      onChange={(e) => setLimit(Number(e.target.value))}
                      name=""
                      id=""
                      className="ml-4 px-2 py-1 border border-gray-300 rounded focus:border-blue-500 outline-none"
                    >
                      <option value="">select Limit</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select> */}
                  </div>
                </div>
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

export default Sales;
