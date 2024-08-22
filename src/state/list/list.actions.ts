import {RankType, UpgradeType} from "@legion-hq/types";

// export const DISPLAY = "DISPLAY";
// export const UNIT = "UNIT";
// export const COUNTERPART = "COUNTERPART";
// export const UNIT_UPGRADE = "UNIT_UPGRADE";
// export const COUNTERPART_UPGRADE = "COUNTERPART_UPGRADE";
// export const LOADOUT_UPGRADE = "LOADOUT_UPGRADE";
// export const COUNTERPART_LOADOUT_UPGRADE = "COUNTERPART_LOADOUT_UPGRADE";
// export const COMMAND = "COMMAND";
// export const CONTINGENCY = "CONTINGENCY";
// export const BATTLE = "BATTLE";

export enum ListActionType {
  DISPLAY = "DISPLAY",
  UNIT = "UNIT",
  COUNTERPART = "COUNTERPART",
  UNIT_UPGRADE = "UNIT_UPGRADE",
  COUNTERPART_UPGRADE = "COUNTERPART_UPGRADE",
  LOADOUT_UPGRADE = "LOADOUT_UPGRADE",
  COUNTERPART_LOADOUT_UPGRADE = "COUNTERPART_LOADOUT_UPGRADE",
  COMMAND = "COMMAND",
  CONTINGENCY = "CONTINGENCY",
  BATTLE = "BATTLE",
}

export const {
  BATTLE,
  COMMAND,
  CONTINGENCY,
  COUNTERPART,
  COUNTERPART_LOADOUT_UPGRADE,
  COUNTERPART_UPGRADE,
  DISPLAY,
  LOADOUT_UPGRADE,
  UNIT,
  UNIT_UPGRADE,
} = ListActionType;

export type ListAction =
  | {
      action: ListActionType.DISPLAY;
    }
  | {
      action: ListActionType.UNIT;
      rank: RankType;
    }
  | {
      action: ListActionType.COUNTERPART;
      counterpartId: string;
      unitIndex: number;
    }
  | {
      action: ListActionType.UNIT_UPGRADE;
      upgradeType: UpgradeType;
      unitId: string;
      upgradesEquipped: unknown;
      additionalUpgradeSlots: unknown;
      unitIndex: number;
      upgradeIndex: number;
      hasUniques: boolean;
    }
  | {
      action: ListActionType.COUNTERPART_UPGRADE;
    }
  | {
      action: ListActionType.LOADOUT_UPGRADE;
    }
  | {
      action: ListActionType.COUNTERPART_LOADOUT_UPGRADE;
    }
  | {
      action: ListActionType.COMMAND;
    }
  | {
      action: ListActionType.CONTINGENCY;
    }
  | {
      action: ListActionType.BATTLE;
    };
