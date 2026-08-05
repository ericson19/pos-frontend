import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/authContext.jsx";
import CartProvider from "./context/cartContext.jsx";
import SettingProvider from "./context/settingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </SettingProvider>
  </StrictMode>,
);
