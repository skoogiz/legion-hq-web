export type AppSettings = {
  themeMode: "dark" | "light" | "blue";
  cardStyle: "images" | "text";
  chipSize: "small" | "medium";
  builderOrientation: "right" | "left";
  cascadeUpgradeSelection: "yes" | "no";
  includeCustomCards: "yes" | "no";
  includeCustomGameModes: "yes" | "no";
};

export type AppSettingType = keyof AppSettings;

export type SettingFieldGroup = "display" | "filter" | "general";
export type SettingFieldType = "select" | "radio" | "toggle";

export type SettingField = {
  name: AppSettingType;
  label: string;
  options: Record<string, string>;
  groupId?: SettingFieldGroup;
  inputType?: SettingFieldType;
  visible?: boolean;
};

const DEFAULT_SETTINGS: AppSettings = {
  themeMode: "dark",
  cardStyle: "images",
  chipSize: "medium",
  builderOrientation: "right",
  cascadeUpgradeSelection: "yes",
  includeCustomCards: "yes",
  includeCustomGameModes: "yes",
};

const fields: SettingField[] = [
  {
    name: "themeMode",
    label: "Theme",
    options: {
      dark: "Dark Side",
      light: "Light Side",
      blue: "Fifth Trooper",
    },
    groupId: "display",
  },
  {
    name: "cardStyle",
    label: "Cards as",
    options: {
      images: "Images",
      text: "Text",
    },
    groupId: "display",
  },
  {
    name: "chipSize",
    label: "Chip Size",
    options: {
      small: "Small",
      medium: "Large",
    },
    groupId: "display",
  },
  {
    name: "includeCustomCards",
    label: "Include custom cards",
    options: {
      yes: "Yes",
      no: "No",
    },
    groupId: "filter",
    inputType: "toggle",
  },
  {
    name: "builderOrientation",
    label: "Orientation",
    options: {
      right: "Right",
      left: "Left",
    },
    visible: false,
  },
  {
    name: "cascadeUpgradeSelection",
    label: "Cascade Upgrade Selecting",
    options: {
      yes: "Yes",
      no: "No",
    },
    inputType: "toggle",
  },
  {
    name: "includeCustomGameModes",
    label: "Include custom game modes",
    options: {
      yes: "Yes",
      no: "No",
    },
    groupId: "filter",
    inputType: "toggle",
  },
];

class SettingsConfig {
  readonly fieldMap: Record<SettingFieldGroup, SettingField[]>;

  constructor(fields: SettingField[]) {
    this.fieldMap = fields.reduce<Record<SettingFieldGroup, SettingField[]>>(
      (acc, field) => {
        const group = field.groupId ?? "general";
        return {
          ...acc,
          [group]: [...acc[group], field],
        };
      },
      {
        general: [],
        display: [],
        filter: [],
      },
    );
  }

  get fields(): SettingField[] {
    return Object.values(this.fieldMap).reduce((acc, list) => [...acc, ...list], []);
  }

  get fieldGroupNames(): SettingFieldGroup[] {
    return Object.keys(this.fieldMap) as SettingFieldGroup[];
  }

  fieldsByGroup = (groupName: SettingFieldGroup): SettingField[] => {
    return this.fieldMap[groupName] ?? [];
  };
}

const settingsConfig = new SettingsConfig(fields);

export {DEFAULT_SETTINGS, settingsConfig};
