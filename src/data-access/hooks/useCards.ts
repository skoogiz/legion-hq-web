// import {LegionCard} from "@legion-hq/types";
import {CardService} from "../services/cardService";

// type HookReturnValue = {
//   cardIds: string[];
//   cards: Record<string, LegionCard>;
//   cardIdsByType: Record<string, string[]>;
// };

export function useCards() /*: HookReturnValue*/ {
  const service = CardService.getInstance();
  return service;
}
