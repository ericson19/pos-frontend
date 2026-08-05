import { useFormatMoney } from "../../services/helper";

export default function SalesTable({ sales, handleItems }) {
  const formatMoney = useFormatMoney();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 text-sm">
        <thead className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Seller Name
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Invoice Number
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Total Amount
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Amount Paid
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Customers Name
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Date of Sale
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Payment Status
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              View Items
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale, index) => (
            <tr
              key={sale.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-3 px-6">{sale?.sellerName}</td>
              <td className="py-3 px-6">{sale?.invoice}</td>
              <td className="py-3 px-6">{formatMoney(sale?.totalAmount)}</td>
              <td className="py-3 px-6">{formatMoney(sale?.amountPaid)}</td>
              <td className="py-3 px-6">{sale?.customer?.name}</td>
              <td className="py-3 px-6">
                {new Date(sale.saleDate).toLocaleString()}
              </td>
              <td className="py-3 px-6">{sale?.paymentStatus}</td>
              <td className="py-3 px-6">
                <button
                  className="border border-gray-300 rounded px-4 py-2"
                  onClick={() => handleItems(sale.invoice)}
                >
                  View Items
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
