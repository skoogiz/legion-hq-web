import cards from "@legion-hq/data/2.5.3/cards.json";
import {LegionCard} from "@legion-hq/types";

export class CardService {
  private static INSTANCE: CardService;

  readonly cardIds: string[];
  readonly cards: Record<string, LegionCard>;

  private constructor(data: Record<string, LegionCard>) {
    this.cardIds = Object.keys(data);
    this.cards = data;
  }

  get cardIdsByType(): Record<string, string[]> {
    return this.cardIds.reduce<Record<string, string[]>>((acc, id) => {
      const type = this.cards[id].cardType;
      if (acc[type]) {
        return {
          ...acc,
          [type]: [...acc[type], id],
        };
      }
      return {...acc, [type]: [id]};
    }, {});
  }

  costSupplier = (
    cardIds: string[],
    useOriginalCosts = false,
  ): Record<string, number> => {
    return cardIds.reduce((acc, cardId) => {
      const card = this.cards[cardId];
      if (card && (card.prevCost || card.cost)) {
        return {
          ...acc,
          [cardId]: useOriginalCosts && card.prevCost ? card.prevCost : card.cost,
        };
      }
      console.warn(`No card or cost found for id="${cardId}"`);
      return acc;
    }, {});
  };

  static getInstance = () => {
    if (this.INSTANCE) return this.INSTANCE;
    this.INSTANCE = new CardService(cards as unknown as Record<string, LegionCard>);
    return this.INSTANCE;
  };
}
