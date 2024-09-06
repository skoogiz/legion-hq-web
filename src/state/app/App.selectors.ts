import {AppSettingType} from "@legion-hq/constants/settings";
import {type State} from "./App.types";

const getSettings = (state: State) => state.settings;

const getSetting = (state: State, name: AppSettingType) => getSettings(state)[name];

export const getThemeMode = (state: State) => getSetting(state, "themeMode");

export const getCardStyle = (state: State) => getSetting(state, "cardStyle");
