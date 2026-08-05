import React, { useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext.jsx";
import { useFormatMoney } from "../../services/helper.jsx";
import { SettingContext } from "../../context/settingContext.jsx";
import logo from "../../assets/comLogo.png";
import Barcode from "react-barcode";

function PrintReciept({
  cartItems,
  customer,
  discount,
  taxRate,
  amountPaid,
  totalPurchase,
  paymethod,
  invoice,
  setShowReceipt,
}) {
  const { user } = useContext(AuthContext);
  const { settings } = useContext(SettingContext);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const printRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });
  const formatMoney = useFormatMoney();

  const { id } = useParams();

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 h-auto"
      onClick={() => setShowReceipt(false)} // click outside to close
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div
          ref={printRef}
          className="bg-white p-6 rounded-lg shadow-lg "
          // prevent modal close when clicking inside
        >
          <p className="text-center font-bold mb-4">{settings.siteName}</p>
          <img
            className=" mx-auto mb-4 max-w-20"
            src={`${API_URL}/${settings.logo}`}
            alt="Company Logo"
          />
          <p className="mb-2">Served by: {user ? user.name : "Guest"}</p>

          <div className="border-t border-b py-4 mb-4">
            <div className="flex justify-between">
              <span>Date:</span>
              <span>
                {new Date().toLocaleDateString()} on{" "}
                {new Date().toLocaleTimeString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Customer:</span>
              <span>{customer}</span>
            </div>

            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span>{paymethod}</span>
            </div>
          </div>

          <div>
            <table className="w-full mb-4 border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="text-left p-1">Item</th>
                  <th className="text-right p-1">Qty</th>
                  <th className="text-right p-1">U/P</th>
                  <th className="text-right p-1">Total</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-1">{item.name}</td>
                    <td className="text-right p-1">{item.quantity}</td>
                    <td className="text-right p-1">
                      {formatMoney(item.price)}
                    </td>
                    <td className="text-right p-1">
                      {formatMoney(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between mb-2">
              <span className="font-bold">Total Purchase:</span>
              <span className="font-bold">{formatMoney(totalPurchase)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>{formatMoney(discount)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>{formatMoney(taxRate)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Amount Paid:</span>
              <span>{formatMoney(amountPaid)}</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4 flex flex-col gap-2">
            <Barcode value={invoice} width={1.5} height={50} />
            <p className="text-center mt-2">Invoice: {invoice}</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handlePrint}
          >
            Print Receipt
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setShowReceipt(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default PrintReciept;
