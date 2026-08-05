import Select from "react-select";

export default function DeleteComp({
  Options,
  setSelectedId,
  handleDelete,
  action,
}) {
  return (
    <div className="w-full max-w-md">
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        Select {action} to delete
      </label>
      <Select
        isSearchable={true}
        options={Options}
        onChange={(selected) => setSelectedId(selected.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm
               focus:border-blue-500 focus:outline-none"
        placeholder={`Select ${action} To Delete`}
      />
      <button
        onClick={handleDelete}
        className="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete {action}
      </button>
    </div>
  );
}
