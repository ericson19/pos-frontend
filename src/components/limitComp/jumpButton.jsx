export default function JumpButton({ page, jump, totalPages, setPage }) {
  return (
    <button
      onClick={() => setPage((prev) => prev + jump)}
      disabled={page + jump >= totalPages ? true : false}
      className="ml-2 px-2 border border-gray-300"
    >
      {page + jump >= totalPages ? totalPages : page + jump}
    </button>
  );
}
