import * as React from "react";
import {useLocalStorageValue} from "@react-hookz/web";
import {reducer} from "@legion-hq/state/app/App.reducer";
import {getActions} from "@legion-hq/state/app/App.actions";
import {
  AppSettings,
  AppSettingType,
  DEFAULT_SETTINGS,
} from "@legion-hq/constants/settings";

type AppContextValue = {
  settings: AppSettings;
  settingActions: {
    setSettingsValue: (name: AppSettingType, value: string) => void;
  };
};

export const AppContext = React.createContext<AppContextValue | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export function AppContextProvider({children}: Props) {
  const [settings, storeSettings] = useLocalStorageValue<AppSettings>(
    "app-settings",
    DEFAULT_SETTINGS,
  );

  const [state, dispatch] = React.useReducer(reducer, {
    settings: {...DEFAULT_SETTINGS, ...settings},
  });

  const {updateSetting} = getActions(dispatch);

  const setSettingsValue = (name: AppSettingType, value: string) => {
    storeSettings({...state.settings, [name]: value});
    updateSetting(name, value);
  };

  React.useEffect(
    () => () => {
      if (state.settings) storeSettings(state.settings);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const value = React.useMemo(
    () => ({
      settings: state.settings,
    }),
    [state.settings],
  );

  return (
    <AppContext.Provider value={{...value, settingActions: {setSettingsValue}}}>
      {children}
    </AppContext.Provider>
  );
}
