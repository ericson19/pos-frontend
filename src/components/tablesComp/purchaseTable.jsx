import { useFormatMoney } from "../../services/helper";

export default function ProductTable({ purchases, showReceipt }) {
  const formatMoney = useFormatMoney();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 text-sm">
        <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Supplier Name
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Product Name
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Price per Unit
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Quantity Purchased
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Total Price
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Selling Price per Unit
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Purchased By
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Payment Status
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Store
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Invoice Number
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Purchase Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {purchases.map((purchase, index) => (
            <tr
              key={purchase.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-3 px-6">{purchase?.Supplier?.name}</td>
              <td className="py-3 px-6">{purchase?.Product?.name}</td>
              <td className="py-3 px-6">
                {formatMoney(purchase?.purchasePrice)}
              </td>
              <td className="py-3 px-6">{purchase?.quantity}</td>
              <td className="py-3 px-6">
                {formatMoney(purchase?.totalAmount)}
              </td>
              <td className="py-3 px-6">{formatMoney(purchase?.unitPrice)}</td>
              <td className="py-3 px-6">{purchase?.User?.name}</td>
              <td className="py-3 px-6">{purchase?.paymentStatus}</td>
              <td className="py-3 px-6">{purchase?.Store?.name}</td>
              <td className="py-3 px-6">{purchase?.invoiceNumber}</td>
              <td className="py-3 px-6">
                {new Date(purchase?.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
