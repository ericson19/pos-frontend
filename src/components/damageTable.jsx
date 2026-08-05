export default function DamageTable({ reports }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 text-sm">
        <thead className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Product Name
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Recorded By
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Quantity
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Reason
            </th>

            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Date Recorded
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((report, index) => (
            <tr
              key={report.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-3 px-6">{report?.Product?.name}</td>
              <td className="py-3 px-6">{report?.User?.name}</td>
              <td className="py-3 px-6">{report?.quantity}</td>
              <td className="py-3 px-6">{report?.reason}</td>
              <td className="py-3 px-6">
                {new Date(report?.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
