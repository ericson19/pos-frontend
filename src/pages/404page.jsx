import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <Link
          to="/"
          className="text-white bg-red-600 hover:underline mt-4 p-4 rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
