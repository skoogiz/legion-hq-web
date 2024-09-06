import * as React from "react";
import {BattleType, ListTemplate, RankType, UpgradeType} from "@legion-hq/types";
import {CounterpartPayload} from "./list.types";

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
  ADD_COUNTERPART = "@list/ADD_COUNTERPART",
  REMOVE_COUNTERPART = "@list/REMOVE_COUNTERPART",
  UNIT_UPGRADE = "UNIT_UPGRADE",
  COUNTERPART_UPGRADE = "COUNTERPART_UPGRADE",
  LOADOUT_UPGRADE = "LOADOUT_UPGRADE",
  COUNTERPART_LOADOUT_UPGRADE = "COUNTERPART_LOADOUT_UPGRADE",
  COMMAND = "COMMAND",
  CONTINGENCY = "CONTINGENCY",
  BATTLE = "BATTLE",
  UPDATE_LIST = "@list/UPDATE_LIST",
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
      action: ListActionType.ADD_COUNTERPART;
      payload: CounterpartPayload;
    }
  | {
      action: ListActionType.REMOVE_COUNTERPART;
      payload: CounterpartPayload;
    }
  | {
      action: ListActionType.UPDATE_LIST;
      payload: {
        list: ListTemplate;
      };
    }
  | {
      action: ListActionType.UNIT_UPGRADE;
      upgradeType: UpgradeType;
      unitId: string;
      upgradesEquipped: Array<string | null>;
      additionalUpgradeSlots: Array<UpgradeType>;
      unitIndex: number;
      upgradeIndex: number;
      hasUniques: boolean;
    }
  | {
      action: ListActionType.COUNTERPART_UPGRADE;
      upgradeType: UpgradeType;
      unitIndex: number;
      upgradeIndex: number;
      counterpartId: string;
      upgradesEquipped: Array<string | null>;
      additionalUpgradeSlots: Array<UpgradeType>;
    }
  | {
      action: ListActionType.LOADOUT_UPGRADE;
      upgradeType: UpgradeType;
      unitIndex: number;
      upgradeIndex: number;
      unitId: string;
      upgradesEquipped: Array<string | null>;
      additionalUpgradeSlots: Array<UpgradeType>;
    }
  | {
      action: ListActionType.COUNTERPART_LOADOUT_UPGRADE;
      upgradeType: UpgradeType;
      unitIndex: number;
      upgradeIndex: number;
      counterpartId: string;
      upgradesEquipped: Array<string | null>;
      additionalUpgradeSlots: Array<UpgradeType>;
    }
  | {
      action: ListActionType.COMMAND;
    }
  | {
      action: ListActionType.CONTINGENCY;
    }
  | {
      action: ListActionType.BATTLE;
      type: BattleType;
    };

export const getActions = (dispatch: React.Dispatch<ListAction>) => ({
  addCounterpart: (unitIndex: number, counterpartId: string) =>
    dispatch({
      action: ListActionType.ADD_COUNTERPART,
      payload: {unitIndex, counterpartId},
    }),
  removeCounterpart: (unitIndex: number, counterpartId: string) =>
    dispatch({
      action: ListActionType.REMOVE_COUNTERPART,
      payload: {unitIndex, counterpartId},
    }),
  updateList: (list: ListTemplate) => {
    dispatch({
      action: ListActionType.UPDATE_LIST,
      payload: {
        list,
      },
    });
  },
});

export type ListActions = ReturnType<typeof getActions>;
