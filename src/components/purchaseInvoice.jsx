import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormatMoney } from "../services/helper";

export default function PurchaseInvoice({ invoice, showReceipt }) {
  const printRef = useRef();
  const formatMoney = useFormatMoney();
  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 overflow-auto">
      <div
        ref={printRef}
        className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 text-gray-800"
      >
        <span className="z-50">
          <XMarkIcon
            className="h-6 w-6 text-gray-700 cursor-pointer float-right mb-2"
            onClick={() => showReceipt(false)}
          />
        </span>
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Purchase Invoice
            </h1>
            <p className="text-sm text-gray-500">
              Invoice #{invoice.invoiceNumber}
            </p>
          </div>

          <div className="text-right text-sm">
            <p className="font-medium">Date</p>
            <p className="text-gray-600">
              {new Date(invoice.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Supplier & Buyer Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Supplier</p>
            <p>{invoice.Supplier?.name}</p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-gray-700">Purchased By</p>
            <p>{invoice.User?.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p className="font-semibold text-gray-700">Store</p>
            <p>{invoice.Store?.name}</p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-gray-700">Selling Price</p>
            <p>{formatMoney(invoice.unitPrice)}</p>
          </div>
        </div>

        {/* Product Table */}
        <div className="border rounded-md overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-3 py-2">Product</th>
                <th className="text-center px-3 py-2">Qty</th>
                <th className="text-right px-3 py-2">Unit Price</th>
                <th className="text-right px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-3 py-2">{invoice.Product?.name}</td>
                <td className="px-3 py-2 text-center">{invoice.quantity}</td>
                <td className="px-3 py-2 text-right">
                  {formatMoney(invoice.purchasePrice)}
                </td>
                <td className="px-3 py-2 text-right font-medium">
                  {formatMoney(invoice.totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm">
            <p className="font-semibold text-gray-700">Payment Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium
              ${
                invoice.paymentStatus === "completed"
                  ? "bg-green-100 text-green-700"
                  : invoice.paymentStatus === "partial"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {invoice.paymentStatus.toUpperCase()}
            </span>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold">
              {formatMoney(invoice.totalAmount)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
