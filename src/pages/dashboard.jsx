import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChartBarIcon,
  SparklesIcon,
  PresentationChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  PlusCircleIcon,
  TrashIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

function Dashboard() {
  const [productOption, setProductOption] = useState(false);
  const [categoryOption, setCategoryOption] = useState(false);
  const [report, setReport] = useState(false);
  const [userOption, setUserOption] = useState(false);
  const [storeOption, setStoreOption] = useState(false);
  const [supplierOption, setSupplierOption] = useState(false);

  const [stockOption, setStockOption] = useState(false);
  const [user, setUser] = useState({});
  // const [openSidebar, setOpenSidebar] = useState(true);
  useEffect(() => {
    const mainUser = localStorage.getItem("user");
    setUser(JSON.parse(mainUser));
  }, []);

  return (
    <div>
      <div className="flex justify-start">
        <div
          className={`sidebar  top-0 left-0 z-50 transition-transform duration-300 ease-in-out bg-blue-950 text-amber-50 p-4 w-80 h-auto rounded-r-2xl text-xs translate-x-0 md:relative `}
        >
          <h4 className="mb-10 font-bold text-2xl underline">Sidebar</h4>
          <ul className="space-y-6">
            <li>
              <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                <ShoppingCartIcon className="h-5 w-5 inline mr-2" />
                <Link to="/pos">P.O.S</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                <ShoppingBagIcon className="h-5 w-5 inline mr-2" />
                <Link to="/purchase-goods">Purchase Goods</Link>
              </div>
            </li>

            <li>
              <button
                className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full"
                onClick={() => setProductOption(!productOption)}
              >
                Products Options
                {productOption ? (
                  <ChevronUpIcon className="h-5 w-5 inline" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 inline" />
                )}
              </button>
              {productOption && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/add-product">Add Product</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2  hover:bg-blue-800 w-full">
                      <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/update-product">Product</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2  hover:bg-blue-800 w-full">
                      <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/update-product"> Update Product</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <TrashIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/delete-product">Delete Product</Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full"
                onClick={() => setCategoryOption(!categoryOption)}
              >
                Category Options
                {categoryOption ? (
                  <ChevronUpIcon className="h-5 w-5 inline" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 inline" />
                )}
              </button>
              {categoryOption && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/add-category">Add Category</Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full"
                onClick={() => setReport(!report)}
              >
                Reports
                {report ? (
                  <ChevronUpIcon className="h-5 w-5 inline" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 inline" />
                )}
              </button>
              {report && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/sales-report">Sales Report</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/inventory-report">Inventory Report</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/purchase-report">Purchase Report</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/stock-report">Stock Report</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 w- hover:bg-blue-800 w-full">
                      <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/suppliers-report">Suppliers Report</Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full"
                onClick={() => setStockOption(!stockOption)}
              >
                Manage Stocks
                {stockOption ? (
                  <ChevronUpIcon className="h-5 w-5 inline" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 inline" />
                )}
              </button>
              {stockOption && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <ChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/purchase-stock">Purchase Stock</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <ChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/return-stock">Return Stock</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <ChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/transfer-stock">
                        Transfer Stock to another Store
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <ChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/damage-stock">Record Damage stock</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 w- hover:bg-blue-800 w-full">
                      <ChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/stock-history">Stock History</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 w- hover:bg-blue-800 w-full">
                      <ChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/update-low-alert">Update Low Alert</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 w- hover:bg-blue-800 w-full">
                      <ChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/adjust-stock">Adjust Stock</Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full"
                onClick={() => setUserOption(!userOption)}
              >
                User Options
                {userOption ? (
                  <ChevronUpIcon className="h-5 w-5 inline" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 inline" />
                )}
              </button>
              {userOption && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/register">Add User</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/update-user">Update User</Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full"
                onClick={() => setStoreOption(!storeOption)}
              >
                Store Options
                {storeOption ? (
                  <ChevronUpIcon className="h-5 w-5 inline" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 inline" />
                )}
              </button>
              {storeOption && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/add-store">Add Store</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/update-store">Update Store</Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full"
                onClick={() => setSupplierOption(!supplierOption)}
              >
                Supplier Options
                {supplierOption ? (
                  <ChevronUpIcon className="h-5 w-5 inline" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 inline" />
                )}
              </button>
              {supplierOption && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/add-supplier">Add Supplier</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/update-supplier">Update Supplier</Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                      <TrashIcon className="h-5 w-5 inline mr-2" />
                      <Link to="/delete-supplier">Delete Supplier</Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                <UserGroupIcon className="h-5 w-5 inline mr-2" />
                <Link to="/users">Users</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                <SparklesIcon className="h-5 w-5 inline mr-2" />
                <Link to="/settings">Settings</Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="w-full p-4 bg-gray-300">
          <Navbar />
          <div className="container h-screen">
            <h1 className="text-3xl font-bold underline">Dashboard</h1>
            <div className="container mt-4 mx-auto p-6 text-3xl  bg-white text-red-700 rounded-lg shadow-md text-center">
              <p className="font-bold p-5">HI, {user.name}!</p>
              <p className="p-5">Welcome to Anox Enterprise POS System</p>
              <p className="p-5">What are you Doing Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
