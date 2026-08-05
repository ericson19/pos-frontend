export default function Input({ value, handleChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder ?? "enter product name or barcode here"}
      className="border border-gray-300 rounded my-2 px-2 w-1/2"
    />
  );
}
