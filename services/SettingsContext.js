import { createContext, useContext, useEffect, useState } from "react";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

const SettingsContext = createContext(undefined, undefined);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState();

  const saveSetting = async (setting) => {
    try {
      const newSettings = {
        ...settings,
        setting,
      };
      await saveSettings(newSettings);
    } catch (e) {
      console.error(e);
    }
  };
  const saveSettings = async (settings) => {
    try {
      const jsonValue = JSON.stringify(settings);
      await ReactNativeAsyncStorage.setItem("settings", jsonValue);
      setSettings(settings);
      checkScreenOn(settings);
    } catch (e) {
      console.error(e);
    }
  };

  const loadSettings = async () => {
    try {
      const jsonValue = await ReactNativeAsyncStorage.getItem("settings");
      const retrieved = jsonValue != null ? JSON.parse(jsonValue) : {};
      setSettings(retrieved);
      checkScreenOn(settings);
      return retrieved;
    } catch (e) {
      // error reading value
    }
  };

  const checkScreenOn = (settings) => {
    settings?.["keepScreenOn"]
      ? activateKeepAwakeAsync()
      : deactivateKeepAwake();
  };

  const toggleSetting = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  useEffect(() => {
    loadSettings().then((res) => {
      setSettings(res);
    });
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        toggleSetting,
        saveSettings,
        saveSetting,
        loadSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
