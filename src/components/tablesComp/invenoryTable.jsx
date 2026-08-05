export default function InventoryTable({
  product,
  outProducts,
  summaryInventory,
  showTable,
}) {
  return (
    <div>
      {summaryInventory.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 text-sm">
            <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Product Name
                </th>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Total in
                </th>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Total Out
                </th>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Net
                </th>

                {/* <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              stock Alert
            </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summaryInventory.map((product, index) => {
                const net =
                  Number(product.totalQuantityIn) -
                  Number(product.totalQuantityOut);
                return (
                  <tr
                    key={product.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-6">{product?.Product?.name}</td>
                    <td className="py-3 px-6">{product?.totalQuantityIn}</td>
                    <td className="py-3 px-6">{product?.totalQuantityOut}</td>
                    <td
                      className={`py-3 px-6 ${
                        net < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {net}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {showTable && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 text-sm">
            <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Product Name
                </th>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Done By
                </th>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Action
                </th>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  qty Took In
                </th>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
                  Flow Type
                </th>
                {/* <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              stock Alert
            </th> */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {product.map((product, index) => (
                <tr
                  key={product.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-6">{product?.Product?.name}</td>
                  <td className="py-3 px-6">{product.User?.name}</td>
                  <td className="py-3 px-6">{product?.movementType}</td>
                  <td className="py-3 px-6">{product.totalInflow}</td>
                  <td className="py-3 px-6">
                    {new Date(product?.latestInflowDate).toLocaleString()}
                  </td>
                  <td className="py-3 px-6">{product.flowType}</td>
                  {/* <td className="py-3 px-6">{product.lowAlert}</td> */}
                </tr>
              ))}
              {outProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-3 px-6">{product?.Product?.name}</td>
                  <td className="py-3 px-6">{product.User?.name}</td>
                  <td className="py-3 px-6">{product?.movementType}</td>
                  <td className="py-3 px-6">{product.totalOutflow}</td>
                  <td className="py-3 px-6">
                    {new Date(product?.latestOutflowDate).toLocaleString()}
                  </td>
                  <td className="py-3 px-6">{product.flowType}</td>
                  {/* <td className="py-3 px-6">{product.lowAlert}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
