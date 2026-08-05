export default function AuditTable({ sales }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 text-sm">
        <thead className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Product Name
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Done by
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Action
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Quantity
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Previous qty
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              flowType
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sales.map((sale, index) => (
            <tr
              key={sale.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-3 px-6">{sale?.Product?.name}</td>
              <td className="py-3 px-6">{sale?.User?.name}</td>
              <td className="py-3 px-6">{sale?.movementType}</td>
              <td className="py-3 px-6">{sale?.quantity}</td>
              <td className="py-3 px-6">{sale?.oldStock}</td>
              <td className="py-3 px-6">{sale?.flowType}</td>
              <td className="py-3 px-6">
                {new Date(sale.inflowDate).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
