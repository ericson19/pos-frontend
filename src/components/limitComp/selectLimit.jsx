export default function SelectLimit({ limit, setLimit, setPage }) {
  return (
    <select
      value={limit}
      onChange={(e) => {
        setLimit(Number(e.target.value));
        setPage(1);
      }}
      name=""
      id=""
      className=" text-xs ml-4 px-2 py-1 border border-gray-300 rounded focus:border-blue-500 outline-none"
    >
      <option value="">select Limit</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  );
}
