import { createContext, useState, useEffect } from "react";
import { saveFavicon } from "../services/helper";
import axios from "axios";

export const SettingContext = createContext();

const SettingProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_APP_API_URL;
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/settings/fetch-settings`, {
          withCredentials: true,
        });
        setSettings(response.data.settings);
        saveFavicon(
          `${API_URL}/${response.data.settings.siteFavicon}?v=${Date.now()}`,
        );
        console.log("Settings fetched in context:", response.data.settings);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <SettingContext value={{ settings, setSettings, loading }}>
      {children}
    </SettingContext>
  );
};
export default SettingProvider;
