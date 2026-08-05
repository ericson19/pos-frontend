import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useContext } from "react";
import { SettingContext } from "../context/settingContext.jsx";

const MySwal = withReactContent(Swal);

const success = (title, text) => {
  MySwal.fire({
    position: "top-end",
    icon: "success",
    title: <p className="text-green-600">{title}</p>,
    html: <p className="text-green-600">{text}</p>,
    showConfirmButton: true,
    timer: 2000,
  });
};

const failed = (title, text) => {
  MySwal.fire({
    position: "top-end",
    icon: "error",
    title: <p className="text-red-600">{title}</p>,
    html: <p className="text-red-600">{text}</p>,
    showConfirmButton: true,
    timer: 2000,
  });
};

const info = (title, text) => {
  MySwal.fire({
    position: "top-end",
    icon: "info",
    title: <p className="text-blue-600">{title}</p>,
    html: <p className="text-blue-600">{text}</p>,
    showConfirmButton: true,
  });
};

const warning = (title, text, path, navigate) => {
  MySwal.fire({
    position: "top-end",
    icon: "warning",
    title: <p className="text-yellow-600">{title}</p>,
    html: <p className="text-yellow-600">{text}</p>,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then((result) => {
    if (result.isConfirmed) {
      MySwal.fire("Saved!", "", "success").then(() => {
        navigate(path);
      });
    } else if (result.isDenied) {
      MySwal.fire("Changes are not saved", "", "info");
    }
  });
};
const warning2 = (title, text) => {
  return MySwal.fire({
    position: "top-end",
    icon: "warning",
    title: <p className="text-yellow-600">{title}</p>,
    html: <p className="text-yellow-600">{text}</p>,

    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Cancel`,
  });
};
// const current = {
//   NGN: "NG",
//   USD: "US",
//   EUR: "EU",
// };

// Custom hook to format money based on settings
const useFormatMoney = () => {
  const { settings, loading } = useContext(SettingContext);

  const formatMoney = (amount) => {
    if (!settings?.currency) {
      return Number(amount).toLocaleString();
    }
    let currency = settings?.currency;
    let current;
    if (currency === "NGN") {
      current = "NG";
    } else if (currency === "USD") {
      current = "US";
    } else if (currency === "EUR") {
      current = "EU";
    }
    return Number(amount).toLocaleString(`en-${current}`, {
      style: "currency",
      currency: currency,
    });
  };
  return formatMoney;
};

// Function to dynamically set the favicon
const saveFavicon = (url) => {
  const link = document.querySelector("link[rel~='icon']");
  link.type = "image/x-icon";
  link.rel = "icon";
  link.href = url;
  document.head.appendChild(link);
};

export {
  success,
  failed,
  info,
  warning,
  warning2,
  useFormatMoney,
  saveFavicon,
};
