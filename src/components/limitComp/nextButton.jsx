export default function NextButton({ page, setPage, totalPages }) {
  return (
    <button
      onClick={() => setPage((prev) => prev + 1)}
      disabled={page === totalPages}
      className={`text-xs px-2 py-1 bg-gray-300 rounded ml-2 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      Next
    </button>
  );
}
