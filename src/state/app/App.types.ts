import type {AppSettings, AppSettingType} from "@legion-hq/constants/settings";

export type AppSettingPayload = {
  name: AppSettingType;
  value: string;
};

export type State = {
  settings: AppSettings;
};
