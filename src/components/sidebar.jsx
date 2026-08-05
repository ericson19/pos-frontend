import { Link } from "react-router-dom";
import { useState, useContext } from "react";
// import NavBarPerm from "./navbarPermission.jsx";
import { AuthContext } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

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

function Sidebar({ open }) {
  const [productOption, setProductOption] = useState(false);
  const [customerOption, setCustomerOption] = useState(false);
  const [categoryOption, setCategoryOption] = useState(false);
  const [report, setReport] = useState(false);
  const [userOption, setUserOption] = useState(false);
  const [storeOption, setStoreOption] = useState(false);
  const [supplierOption, setSupplierOption] = useState(false);
  const [stockOption, setStockOption] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  //check user permissions here if needed
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission);
  };
  const isAdmin = user?.role === "admin";
  return (
    <div
      className={`sidebar absolute top-0 left-0 z-50 transition-transform duration-300 ease-in-out bg-blue-950 text-amber-50 p-4 w-64 h-auto rounded-r-2xl text-xs ${
        open ? "translate-x-0 md:relative" : "-translate-x-full md:fixed"
      }`}
    >
      <h4 className="mb-10 font-bold text-2xl underline">Sidebar</h4>
      <ul className="space-y-6">
        <li>
          <div
            className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
              hasPermission("sales")
                ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
            }`}
          >
            <ShoppingCartIcon className="h-5 w-5 inline mr-2" />
            <Link to={hasPermission("sales") ? "/pos" : "#"}>P.O.S</Link>
          </div>
        </li>

        <li>
          <button
            className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full"
            onClick={() => setProductOption(!productOption)}
          >
            Products Options
            <ChevronDownIcon
              className={`h-5 w-5 inline transition-transform duration-700 ${productOption ? "transform rotate-180" : ""}`}
            />
          </button>
          {productOption && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("add")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("add") ? "/add-product" : "#"}>
                    Add Product
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2  hover:bg-blue-800 w-full">
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link to="/products">Product</Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("edit")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("edit") ? "/update-product" : "#"}>
                    {" "}
                    Update Product
                  </Link>
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
            onClick={() => setCustomerOption(!customerOption)}
          >
            Customer Options
            <ChevronDownIcon
              className={`h-5 w-5 inline transition-transform duration-700 ${customerOption ? "transform rotate-180" : ""}`}
            />
          </button>
          {customerOption && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("add")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("add") ? "/add-customers" : "#"}>
                    Add Customer
                  </Link>
                </div>
              </li>

              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("edit")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("edit") ? "/update-customer" : "#"}>
                    Update Customer
                  </Link>
                </div>
              </li>

              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("add")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("add") ? "/view-customers" : "#"}>
                    View Customers
                  </Link>
                </div>
              </li>

              <li>
                <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2 hover:bg-blue-800 w-full">
                  <TrashIcon className="h-5 w-5 inline mr-2" />
                  <Link to="/delete-customer">Delete Customer</Link>
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
            <ChevronDownIcon
              className={`h-5 w-5 inline transition-transform duration-700 ${categoryOption ? "transform rotate-180" : ""}`}
            />
          </button>
          {categoryOption && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("add")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("add") ? "/add-category" : "#"}>
                    Add Category
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("add")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("add") ? "/delete-category" : "#"}>
                    Delete Category
                  </Link>
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
            <ChevronDownIcon
              className={`h-5 w-5 inline transition-transform duration-700 ${report ? "transform rotate-180" : ""}`}
            />
          </button>
          {report && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("report")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={hasPermission("report") ? "/report/sales-report" : "#"}
                  >
                    Sales Report
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("report")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={
                      hasPermission("report") ? "/report/inventory-report" : "#"
                    }
                  >
                    Inventory Report
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("report")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={
                      hasPermission("report") ? "/report/purchase-report" : "#"
                    }
                  >
                    Purchase Report
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("report")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={
                      hasPermission("report") ? "/report/returned-report" : "#"
                    }
                  >
                    Returned Report
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("report")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={
                      hasPermission("report") ? "/report/damages-report" : "#"
                    }
                  >
                    Damages Report
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("report")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={
                      hasPermission("report") ? "/report/low-stock-alert" : "#"
                    }
                  >
                    Low Stock Report
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("report")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("report") ? "/report/audit" : "#"}>
                    Audit
                  </Link>
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
            <ChevronDownIcon
              className={`h-5 w-5 inline transition-transform duration-700 ${stockOption ? "transform rotate-180" : ""}`}
            />
          </button>
          {stockOption && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("purchase")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ShoppingBagIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={
                      hasPermission("purchase") ? "/stock/purchase-goods" : "#"
                    }
                  >
                    Purchase Stocks
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("purchase")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={hasPermission("purchase") ? "/stock/return-stock" : "#"}
                  >
                    Return Stock
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("purchase")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={
                      hasPermission("purchase") ? "/stock/transfer-stock" : "#"
                    }
                  >
                    Transfer Stock to another Store
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("purchase")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={hasPermission("purchase") ? "/stock/damage-stock" : "#"}
                  >
                    Record Damage stock
                  </Link>
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
            <ChevronDownIcon
              className={`h-5 w-5 inline transition-transform duration-700 ${userOption ? "transform rotate-180" : ""}`}
            />
          </button>
          {userOption && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("manage")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("manage") ? "/register" : "#"}>
                    Add User
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("manage")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("manage") ? "/update-user" : "#"}>
                    Update User
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("manage")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("manage") ? "/delete-user" : "#"}>
                    Delete User
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("manage")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={hasPermission("manage") ? "/update-permission" : "#"}
                  >
                    Update User permission
                  </Link>
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
            <ChevronDownIcon
              className={`h-5 w-5 inline transition-transform duration-700 ${storeOption ? "transform rotate-180" : ""}`}
            />
          </button>
          {storeOption && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("manage")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("manage") ? "/add-store" : "#"}>
                    Add Store
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("manage")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("manage") ? "/update-store" : "#"}>
                    Update Store
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("manage")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("manage") ? "/delete-store" : "#"}>
                    Delete Store
                  </Link>
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
            <ChevronDownIcon
              className={`h-5 w-5 inline transition-transform duration-700 ${supplierOption ? "transform rotate-180" : ""}`}
            />
          </button>
          {supplierOption && (
            <ul className="ml-4 mt-2 space-y-2">
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("suppliers")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PlusCircleIcon className="h-5 w-5 inline mr-2" />
                  <Link to={hasPermission("suppliers") ? "/add-supplier" : "#"}>
                    Add Supplier
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("suppliers")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={hasPermission("suppliers") ? "/update-supplier" : "#"}
                  >
                    Update Supplier
                  </Link>
                </div>
              </li>
              <li>
                <div
                  className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
                    hasPermission("suppliers")
                      ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                      : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <TrashIcon className="h-5 w-5 inline mr-2" />
                  <Link
                    to={hasPermission("suppliers") ? "/delete-supplier" : "#"}
                  >
                    Delete Supplier
                  </Link>
                </div>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div
            className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
              hasPermission("manage")
                ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
            }`}
          >
            <UserGroupIcon className="h-5 w-5 inline mr-2" />
            <Link to={hasPermission("manage") ? "/users" : "#"}>Users</Link>
          </div>
        </li>
        <li>
          <div
            className={`flex items-center gap-4 rounded-3xl px-3 py-2 w-full ${
              isAdmin
                ? "bg-blue-900 hover:bg-blue-800 text-amber-50"
                : "bg-blue-900 text-gray-400 opacity-50 cursor-not-allowed"
            }`}
          >
            <SparklesIcon className="h-5 w-5 inline mr-2" />
            <Link to={isAdmin ? "/settings" : "#"}>Settings</Link>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-4 rounded-3xl bg-blue-900 px-3 py-2  hover:bg-blue-800 w-full">
            <PresentationChartBarIcon className="h-5 w-5 inline mr-2" />
            <button onClick={handleLogout}>logout</button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
