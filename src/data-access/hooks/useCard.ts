import {LegionCard} from "@legion-hq/types";
import {useCards} from "./useCards";

type HookReturnValue = {
  card?: LegionCard;
};

export function useCard(cardId: string): HookReturnValue {
  const {cards} = useCards();
  return {card: cards[cardId]};
}
