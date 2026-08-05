import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./pages/addProduct";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Sales from "./pages/sales";
import Settings from "./pages/settings";
import Supplier from "./pages/supplier";
import ProtectedRoute from "./components/protectedRoute.jsx";
import UpdatePermission from "./pages/updatePermission.jsx";
import DeleteUser from "./pages/deleteUser.jsx";
import UpdateUser from "./pages/updateUser.jsx";
import Product from "./pages/product";
import Reports from "./pages/reports";
import Store from "./pages/store.jsx";
import PurchaseGoods from "./pages/purchaseGoods";
import Pos from "./pages/pos";
import Stock from "./pages/stock";
import Returns from "./pages/returns";
import Categories from "./pages/categories";
import EditProduct from "./pages/editProduct";
import Register from "./pages/register";
import InventoryReport from "./pages/inventoryReport.jsx";
import PurchaseReport from "./pages/purchaseReport.jsx";
import TransferStock from "./pages/trasnfer-stock.jsx";
import Audit from "./pages/audit.jsx";
import Users from "./pages/users";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Otp from "./pages/otpPage.jsx";
import DashboardLayout from "./components/dashboardLayout";
import ForgotPassword from "./pages/forgotPassword.jsx";
import ResetPassword from "./pages/resetPassword/resetPassword.jsx";
import DamageGoods from "./pages/damageGoods.jsx";
import DamagesReport from "./pages/damagesReport.jsx";
import LowAlert from "./pages/lowAlert.jsx";
import ReturnedReport from "./pages/returnedReport.jsx";
import DeleteProduct from "./pages/deleteProduct.jsx";
import DeleteCategory from "./pages/deleteCategory.jsx";
import DeleteStore from "./pages/deleteStore.jsx";
import DeleteSupplier from "./pages/deleteSupplier.jsx";
import UpdateCustomer from "./pages/updateCustomer.jsx";
import DeleteCustomer from "./pages/deteleCustomer.jsx";
import Customers from "./pages/customers.jsx";
import ViewCustomers from "./pages/viewCustomers.jsx";
import { useState } from "react";
import NotFound from "./pages/404page.jsx";

import AddSuppliers from "./pages/addSuppliers.jsx";

import UpdateSupplier from "./pages/updateSupplier.jsx";

function App() {
  return (
    //define all the routes here
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/users" element={<Users />} />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/report/sales-report" element={<Sales />} />
        <Route path="/report/damages-report" element={<DamagesReport />} />
        <Route path="/report/low-stock-alert" element={<LowAlert />} />
        <Route path="/report/returned-report" element={<ReturnedReport />} />
        <Route path="/report/inventory-report" element={<InventoryReport />} />
        <Route path="/report/purchase-report" element={<PurchaseReport />} />
        <Route path="/report/audit" element={<Audit />} />

        <Route path="/stock/purchase-goods" element={<PurchaseGoods />} />
        <Route path="/stock/damage-stock" element={<DamageGoods />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/stock/return-stock" element={<Returns />} />
        <Route path="/stock/transfer-stock" element={<TransferStock />} />

        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/update-permission" element={<UpdatePermission />} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/reports" element={<Reports />} />
        {/* <Route path="/print-reciept" element={<PrintReciept />} /> */}
        <Route path="/delete-store" element={<DeleteStore />} />
        <Route path="/delete-supplier" element={<DeleteSupplier />} />
        <Route path="/pos" element={<Pos />} />
        <Route path="/add-customers" element={<Customers />} />
        <Route path="/update-customer" element={<UpdateCustomer />} />
        <Route path="/add-category" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/update-product" element={<EditProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-store" element={<Store />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/delete-category" element={<DeleteCategory />} />
        <Route path="/delete-customer" element={<DeleteCustomer />} />
        <Route path="/view-customers" element={<ViewCustomers />} />
        <Route path="/update-supplier" element={<UpdateSupplier />} />
        <Route path="/add-supplier" element={<AddSuppliers />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
