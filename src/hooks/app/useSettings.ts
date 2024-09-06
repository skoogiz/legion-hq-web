import {settingsConfig} from "@legion-hq/constants/settings";
import {useAppContext} from "@legion-hq/context/app/useAppContext";

export function useSettings() {
  const {settings, settingActions} = useAppContext();
  return {...settings, ...settingActions, config: settingsConfig};
}
