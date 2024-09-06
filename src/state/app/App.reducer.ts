import {AppSettings} from "@legion-hq/constants/settings";
import {ActionType, type Action} from "./App.actions";
import {AppSettingPayload, type State} from "./App.types";

const init = (state: State, settings: AppSettings) => ({
  ...state,
  settings,
});

const updateSetting = (state: State, {name, value}: AppSettingPayload) => ({
  ...state,
  settings: {
    ...state.settings,
    [name]: value,
  },
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.INIT:
      return init(state, action.payload);
    case ActionType.UPDATE_SETTING:
      return updateSetting(state, action.payload);
    default:
      return state;
  }
};
