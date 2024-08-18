export type AppSettings = {
  themeMode: "dark" | "light" | "blue";
  cardStyle: "images" | "text";
  chipSize: "small" | "medium";
  builderOrientation: "right" | "left";
  cascadeUpgradeSelection: "yes" | "no";
};

export type AppSettingType = keyof AppSettings;

export type SettingOption = {
  key: Lowercase<string>;
  name: string;
};

type Setting = {
  key: AppSettingType;
  name: string;
  values: SettingOption[];
};

type Settings = {
  list: Setting[];
  fields: Record<string, unknown>;
};

const DEFAULT_SETTINGS: AppSettings = {
  themeMode: "dark",
  cardStyle: "images",
  chipSize: "medium",
  builderOrientation: "right",
  cascadeUpgradeSelection: "yes",
};

const settings: Settings = {
  fields: {
    cascadeUpgradeSelection: {
      name: "Cascade Upgrade Selecting",
      options: {
        yes: "Yes",
        no: "No",
      },
    },
  },
  list: [
    {
      key: "themeMode",
      name: "Theme",
      values: [
        {key: "dark", name: "Dark Side"},
        {key: "light", name: "Light Side"},
        {key: "blue", name: "Fifth Trooper"},
      ],
    },
    {
      key: "cardStyle",
      name: "Card Style",
      values: [
        {key: "images", name: "Images"},
        {key: "text", name: "Text"},
      ],
    },
    {
      key: "chipSize",
      name: "Chip Size",
      values: [
        {key: "small", name: "Small"},
        {key: "medium", name: "Large"},
      ],
    },
    {
      key: "cascadeUpgradeSelection",
      name: "Cascade Upgrade Selecting",
      values: [
        {key: "yes", name: "Yes"},
        {key: "no", name: "No"},
      ],
    },
  ],
};

export {DEFAULT_SETTINGS, settings};
