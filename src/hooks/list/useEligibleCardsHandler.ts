import {useListBuilder} from "./useList";
import {BattleType, RankType} from "@legion-hq/types";

export function useEligibleCardsHandler() {
  const {
    currentList,
    getEligibleBattlesToAdd,
    getEligibleCommandsToAdd,
    getEligibleContingenciesToAdd,
    getEligibleUnitsToAdd,
    // getEquippableLoadoutUpgrades,
    // getEquippableUpgrades,
  } = useListBuilder();
  return {
    getEligibleBattles: (type: BattleType) => getEligibleBattlesToAdd(currentList, type),
    getEligibleCommands: () => getEligibleCommandsToAdd(currentList),
    getEligibleContingencies: () => getEligibleContingenciesToAdd(currentList),
    getEligibleUnits: (rank: RankType) => getEligibleUnitsToAdd(currentList, rank),
  };
}
