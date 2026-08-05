import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import PurchaseInvoice from "../components/purchaseInvoice";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { success, warning, failed } from "../services/helper";
import { useState, useEffect } from "react";

function PurchaseGoods() {
  const [openSidebar, setOpenSidebar] = useState(false);

  //form states
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [amountPaid, setAmountPaid] = useState();
  const [paymentStatus, setPaymentStatus] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [storeId, setStoreId] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [purchase, setPurchase] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);

  //api data states
  const [suppliers, setSuppliers] = useState([]);
  const [payMethods, setPayMethods] = useState([]);
  const [stores, setStores] = useState([]);

  //error state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //API URL
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    console.log({
      productName,
      price,
      purchasePrice,
      stockQuantity,
      storeId,
      amountPaid,
      totalAmount,
      amountRemaining,
      paymentMethod,
      paymentStatus,
      supplierId,
      invoiceNumber,
    });
    try {
      const purchaseItem = {
        product: productName,
        unitPrice: parseFloat(price).toFixed(2),
        purchasePrice: parseFloat(purchasePrice).toFixed(2),
        quantity: parseInt(stockQuantity),
        storeId: parseInt(storeId),
        amountPaid: parseFloat(amountPaid).toFixed(2),
        totalAmount: totalAmount,
        amountRemaining: amountRemaining,
        paymentMethod: paymentMethod,
        paymentStatus: paymentStatus,
        supplierId: parseInt(supplierId),
        invoiceNumber: invoiceNumber,
      };
      const response = await axios.post(
        `${API_URL}/purchase/purchaseItem`,
        purchaseItem,
        {
          withCredentials: true,
        }
      );
      console.log("Product added successfully:", response.data);
      console.log("Purchase Response:", response.data.purchase);
      setPurchase(response.data.purchase);
      success(
        "Purchase Successful",
        "The purchase has been recorded successfully."
      );
      setShowReceipt(true);
      // Reset form fields
      setProductName("");
      setPrice("");
      setCategoryId("");
      setPurchasePrice("");
      setStockQuantity("");
      setBarcode("");
      setStoreId("");
      setDescription("");
      setLowStockAlert("");
      setError("");

      // alert("Product added successfully!");
    } catch (error) {
      console.error("Failed to add product:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        failed("Purchase Failed", error.response.data.message);
        setError(error.response.data.message);
        return;
      }
    }
  };

  useEffect(() => {
    document.title = "Purchase Item - POS System";
    const suppliers = async () => {
      try {
        const response = await axios.get(`${API_URL}/supplier/suppliers`, {
          withCredentials: true,
        });
        console.log(response.data);
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        }
      }
    };

    const getPaymethods = async () => {
      try {
        const response = await axios.get(`${API_URL}/purchase/paymentMethods`, {
          withCredentials: true,
        });
        setPayMethods(response.data.paymentMethods);
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
    suppliers();
    getPaymethods();
    getStores();
  }, []);
  const invoiceNumber = "INV" + Date.now();
  const totalAmount = parseFloat(purchasePrice) * parseInt(stockQuantity);
  const amountRemaining = totalAmount - amountPaid;

  return (
    <div className="flex justify-start">
      <Sidebar open={openSidebar} />
      <div className="w-full p-4 bg-gray-300">
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Product Purchase</h1>
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
                <label className="block mb-2">Unit Price</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2">Purchase Price</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter purchase price"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                />
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
                <label className="block mb-2">Select Supplier</label>
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="">Select supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Amount Paid</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter amount paid"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">Total Amount</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  placeholder="Enter total amount"
                  value={parseFloat(totalAmount).toFixed(2)}
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-2">Select Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="">Select payment method</option>
                  {payMethods.map((method, index) => (
                    <option key={index} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="">Select payment status</option>
                  <option value="debt">Debt</option>
                  <option value="Partial">Partial</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-1/2"
              >
                Add Product
              </button>
            </form>
          </div>
          {showReceipt && (
            <PurchaseInvoice invoice={purchase} showReceipt={setShowReceipt} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PurchaseGoods;
