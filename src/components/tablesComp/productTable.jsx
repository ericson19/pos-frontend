export default function ProductTable({ products }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg divide-y divide-gray-200 text-sm">
        <thead className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Product Name
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Bar Code
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Price
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Description
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Quantity
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Category
            </th>
            <th className="py-3 px-6 text-left uppercase text-sm font-medium tracking-wider">
              Stock Alert
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-3 px-6">{product?.name}</td>
              <td className="py-3 px-6">{product?.barCode}</td>
              <td className="py-3 px-6">{product?.price}</td>
              <td className="py-3 px-6">{product?.description}</td>
              <td
                className={`py-3 px-6 ${product?.stock < product?.lowAlert ? "text-red-600 font-bold" : ""}`}
              >
                {product?.stock}
              </td>
              <td className="py-3 px-6">{product?.category?.name}</td>
              <td className="py-3 px-6">{product?.lowAlert}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
