import {AppSettings, AppSettingType} from "@legion-hq/constants/settings";
import * as React from "react";
import {AppSettingPayload} from "./App.types";

export enum ActionType {
  INIT = "@app/INIT",
  UPDATE_SETTING = "@app/UPDATE_SETTING",
}

export type Action =
  | {
      type: ActionType.INIT;
      payload: AppSettings;
    }
  | {
      type: ActionType.UPDATE_SETTING;
      payload: AppSettingPayload;
    };

export const getActions = (dispatch: React.Dispatch<Action>) => ({
  init: (settings: AppSettings) =>
    dispatch({
      type: ActionType.INIT,
      payload: settings,
    }),
  updateSetting: (name: AppSettingType, value: string) =>
    dispatch({
      type: ActionType.UPDATE_SETTING,
      payload: {name, value},
    }),
});
