import React, { useState, useEffect, use } from "react";
import Select from "react-select";
import Sidebar from "../components/sidebar.jsx";
import Navbar from "../components/navbar.jsx";
import { success, failed } from "../services/helper.jsx";
import axios from "axios";

export default function ReturnStock() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [productId, setProductId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const reasonOptions = [
    { value: "damaged", label: "Damaged" },
    { value: "wrong_items", label: "Wrong Items" },
    { value: "not_needed", label: "Not Needed" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        invoiceNumber: invoiceNumber,
        quantityReturned: quantity,
        reason: reason,
        notes: notes,
      };
      const response = await axios.post(`${API_URL}/return/return`, formData, {
        withCredentials: true,
      });
      console.log("Return processed successfully:", response.data);
      success("Success", "Stock returned successfully");
    } catch (error) {
      console.error("Error returning stock:", error);
      if (error.response && error.response.data) {
        failed("Error", error.response.data.message);
        console.log("Error details:", error.response.data);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-start">
        <Sidebar open={openSidebar} />
        <div className="w-full p-4 bg-gray-300">
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div className="p-2">
            <h1 className="text-2xl font-bold mb-4">Return Stock Page</h1>

            <form onSubmit={handleSubmit} className="flex justify-center">
              <div className="bg-white p-6 rounded shadow-md w-full md:w-1/2">
                <div className="space-y-4">
                  <input
                    className="w-full bg-white rounded p-2 border border-gray-300 focus:border-blue-400 focus:outline-none"
                    type="text"
                    placeholder="Invoice Number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                  <Select
                    options={reasonOptions}
                    placeholder="Select Reason"
                    isSearchable={true}
                    onChange={(selected) => setReason(selected?.value)}
                    className="w-full"
                  />

                  <input
                    className="w-full bg-white rounded p-2 border border-gray-300 focus:border-blue-400 focus:outline-none"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  <textarea
                    className="w-full bg-white rounded p-2 border border-gray-300 focus:border-blue-400 focus:outline-none"
                    type="text"
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="block bg-blue-500 text-white px-4 py-2 rounded mt-2"
                >
                  return stock to supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
