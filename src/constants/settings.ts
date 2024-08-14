export type SettingOption = {
  key: Lowercase<string>;
  name: string;
};

type SettingKey =
  | "themeColor"
  | "cardStyle"
  | "chipSize"
  | "builderOrientation"
  | "cascadeUpgradeSelection";

type Setting = {
  key: SettingKey;
  name: string;
  values: SettingOption[];
};

type Settings = {
  default: Record<SettingKey, Lowercase<string>>;
  list: Setting[];
};

const settings: Settings = {
  default: {
    themeColor: "dark",
    cardStyle: "images",
    chipSize: "medium",
    builderOrientation: "right",
    cascadeUpgradeSelection: "yes",
  },
  list: [
    {
      key: "themeColor",
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

export default settings;
