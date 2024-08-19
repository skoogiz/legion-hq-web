export type AppSettings = {
  themeMode: "dark" | "light" | "blue";
  cardStyle: "images" | "text";
  chipSize: "small" | "medium";
  builderOrientation: "right" | "left";
  cascadeUpgradeSelection: "yes" | "no";
};

export type AppSettingType = keyof AppSettings;

export type SettingField = {
  name: AppSettingType;
  displayName: string;
  options: Record<string, string>;
};

type SettingsConfig = {
  fields: SettingField[];
};

const DEFAULT_SETTINGS: AppSettings = {
  themeMode: "dark",
  cardStyle: "images",
  chipSize: "medium",
  builderOrientation: "right",
  cascadeUpgradeSelection: "yes",
};

const settingsConfig: SettingsConfig = {
  fields: [
    {
      name: "themeMode",
      displayName: "Theme",
      options: {
        dark: "Dark Side",
        light: "Light Side",
        blue: "Fifth Trooper",
      },
    },
    {
      name: "cardStyle",
      displayName: "Card Style",
      options: {
        images: "Images",
        text: "Text",
      },
    },
    {
      name: "chipSize",
      displayName: "Chip Size",
      options: {
        small: "Small",
        medium: "Large",
      },
    },
    {
      name: "builderOrientation",
      displayName: "Orientation",
      options: {
        right: "Right",
        left: "Left",
      },
    },
    {
      name: "cascadeUpgradeSelection",
      displayName: "Cascade Upgrade Selecting",
      options: {
        yes: "Yes",
        no: "No",
      },
    },
  ],
};

export {DEFAULT_SETTINGS, settingsConfig};
