import {useAppContext} from "@legion-hq/context/app/useAppContext";

export function useSettings() {
  const {settings, settingActions} = useAppContext();
  return {...settings, ...settingActions};
}
