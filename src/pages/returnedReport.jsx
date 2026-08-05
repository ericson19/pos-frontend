import { use, useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import ReturnedTable from "../components/returnedTable.jsx";
import JumpButton from "../components/limitComp/jumpButton.jsx";
import NextButton from "../components/limitComp/nextButton.jsx";
import PrevButton from "../components/limitComp/prevButton.jsx";
import LimitSelect from "../components/limitComp/selectLimit.jsx";

import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../context/authContext.jsx";

function ReturnedReport() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [fetchCategory, setFetchCategory] = useState([]);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");

  const { user } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/return/returns`, {
        params: {
          limit,
          page,
        },
        withCredentials: true,
      });
      setReports(response.data.returns);
      setTotalPages(response.data.totalPages);
      console.log("total pages:", response.data.totalPages);
      console.log("Products fetched:", response.data.returns);
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response && error.response.data) {
        console.error("Error details:", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    document.title = "Product List - POS System";
  }, [page, limit]);
  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-2">
            <h3 className="text-2xl font-semibold mb-4">Returned List</h3>
            <div className="flex bg-white p-4 rounded-lg justify-around mb-4 text-sm  shadow-2xl gap-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            {isLoading && <p>Loading products...</p>}
            {reports && reports.length > 0 ? (
              <div ref={printRef} className="bg-white rounded-2xl p-4 shadow ">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <p>Showing {reports.length} reports</p>
                  <p>{user ? `Logged in as: ${user.name}` : "Guest"}</p>
                  <p>
                    printed on {new Date().toLocaleDateString()} at{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <ReturnedTable
                  reports={reports.filter((report) =>
                    report.invoiceNumber
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                  )}
                />

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

                    <LimitSelect
                      limit={limit}
                      setLimit={setLimit}
                      setPage={setPage}
                    />
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

export default ReturnedReport;
