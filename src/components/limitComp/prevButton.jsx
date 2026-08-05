function PrevButton({ setPage, page }) {
  return (
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className={`text-xs px-2 py-1 bg-gray-300 rounded mr-2 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      Previous
    </button>
  );
}
export default PrevButton;
