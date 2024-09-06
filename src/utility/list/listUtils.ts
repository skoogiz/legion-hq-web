import {BattleForce, LegionMode, UnitRestrictions} from "@legion-hq/types";

export function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const getBattleForceUnitRestrictions = (
  battleForce: BattleForce,
  mode: LegionMode,
): UnitRestrictions => {
  const map = Object.entries(battleForce);
  for (let index = 0; index < map.length; index++) {
    const [key, value] = map[index];
    if (key === mode) {
      return value as UnitRestrictions;
    }
  }
  return battleForce["standard mode"];
};
