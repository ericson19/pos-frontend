import { useContext } from "react";
import { SettingContext } from "../context/settingContext.jsx";
export default function Footer() {
  const { settings } = useContext(SettingContext);
  return (
    <footer className=" flex justify-center flex-col md:flex-row gap-2  md:gap-10 p-4  bg-blue-800 text-white ">
      <div className="">
        &copy; {new Date().getFullYear()} {settings.siteName}. All rights
        reserved.
      </div>
      <p>Software Developed by Your Anox Technology</p>
    </footer>
  );
}
