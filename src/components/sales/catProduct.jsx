import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useFormatMoney } from "../../services/helper";

export default function CatProduct({
  catproduct,
  products,
  onAdd,
  onRemove,
  onChangeQty,
}) {
  const formatMoney = useFormatMoney();
  return (
    <>
      {catproduct?.map((prod) => {
        const qty = products.find((p) => p.id === prod.id)?.quantity || 0;
        return (
          <div
            key={prod.id}
            className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between"
          >
            {/* Product Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition">
                {prod.name}
              </h4>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {prod.description}
              </p>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                {formatMoney(prod.price)}
              </span>
              <span
                className={
                  prod.stock >= prod.lowAlert
                    ? "text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium"
                    : "text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-medium"
                }
              >
                {prod.stock}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl p-2">
              <button
                onClick={() => onRemove(prod.id)}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 active:scale-95 transition"
              >
                <MinusIcon className="h-2 w-2 md:h-4 md:w-4" />
              </button>

              <input
                type="number"
                value={qty}
                min={0}
                className="w-14 text-center bg-white border border-gray-300 rounded-lg font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onChange={(e) => onChangeQty(prod.id, e.target.value)}
              />

              <button
                onClick={() => onAdd(prod)}
                className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 active:scale-95 transition"
              >
                <PlusIcon className="h-2 w-2 md:h-4 md:w-4 " />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
