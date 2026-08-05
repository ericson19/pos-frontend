import { useFormatMoney } from "../../services/helper";

export default function ItemModal({ onClose, sales }) {
  const formatMoney = useFormatMoney();
  //   if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50  flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl">
        <div className="p-6  overflow-y-auto max-h-[80vh]">
          <p className="text-sm md:text-lg font-semibold mb-4">
            Items for Invoice: {sales.invoice}
          </p>
          Customer Name: {sales?.customer?.name} - {sales?.customer?.phone}
          <div className="overflow-x-auto mb-4 text-sm">
            <table className=" min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 text-sm overflow-x-auto">
              <thead className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                <tr>
                  <th className="py-1 px-2 text-left uppercase text-xs">
                    Product Name
                  </th>
                  <th className="py-1 px-2 text-left uppercase text-xs font-medium tracking-wider">
                    Quantity
                  </th>
                  <th className="py-1 px-2 text-left uppercase text-xs font-medium tracking-wider">
                    Price
                  </th>
                  <th className="py-1 px-2 text-left uppercase text-xs font-medium tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sales.SaleItems.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-1 px-2">{item.productName}</td>
                    <td className="py-1 px-2">{item.quantity}</td>
                    <td className="py-1 px-2">{formatMoney(item.unitPrice)}</td>
                    <td className="py-1 px-2">
                      {formatMoney(item.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row space-x-4 justify-around items-start  text-right font-semibold text-xs">
            <p>Total Amount: {formatMoney(sales.totalAmount)}</p>
            <p>Total Paid: {formatMoney(sales.amountPaid)}</p>
            <p>Balance: {formatMoney(sales.amountRemaining)}</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
