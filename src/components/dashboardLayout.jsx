import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="ml-30 md:ml-64 w-full min-h-screen bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
