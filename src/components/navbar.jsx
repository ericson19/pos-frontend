import comLogo from "../assets/comLogo.png";
import NameDisplay from "../components/nameDisplay";
import { AuthContext } from "../context/authContext.jsx";
import { SettingContext } from "../context/settingContext.jsx";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useContext } from "react";

export default function Navbar({ openSidebar, setOpenSidebar }) {
  const [user, setUser] = useState({});
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const { settings } = useContext(SettingContext);

  return (
    <div className=" w-full flex justify-between px-4 bg-amber-50">
      <img
        src={`${API_URL}/${settings.logo}?v=${settings.updatedAt}`}
        alt="Company Logo"
        className="h-10 max-w-[140px] my-2 object-contain"
      />
      <p className="text-sm md:text-lg font-semibold mt-4">
        {settings.siteName}
      </p>
      <div className="flex items-center gap-4">
        <NameDisplay />
        <button
          className={`transition-transform duration-300 ease-in-out h-8 w-8 text-gray-700 ${
            openSidebar ? "rotate-45" : "rotate-0"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setOpenSidebar(!openSidebar);
          }}
        >
          {openSidebar ? (
            <XMarkIcon
              className={`transition-transform duration-300 ease-in-out h-8 w-8 text-gray-700 ${
                openSidebar ? "rotate-45" : "rotate-0"
              }`}
            />
          ) : (
            <Bars3Icon
              className={`transition-transform duration-300 ease-in-out h-8 w-8 text-gray-700 ${
                openSidebar ? "rotate-45" : "rotate-0"
              }`}
            />
          )}
        </button>
      </div>
    </div>
  );
}
