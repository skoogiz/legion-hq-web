export const BATTLE_CARD = "battle";
export const COMMAND_CARD = "command";
export const UNIT_CARD = "unit";
export const UPGRADE_CARD = "upgrade";
export const COUNTERPART_CARD = "counterpart";
export const FLAW_CARD = "flaw";

export type CardType =
  | typeof BATTLE_CARD
  | typeof COMMAND_CARD
  | typeof UNIT_CARD
  | typeof UPGRADE_CARD
  | typeof COUNTERPART_CARD
  | typeof FLAW_CARD;

export type LegacyBattleCardType = "condition" | "deployment" | "objective";

export type BattleCardType =
  | LegacyBattleCardType
  | "primary_objective"
  | "secondary_objective"
  | "map"
  | "advantage";

type CardText = string | string[];

interface Card {
  id: string;
  name: string;
  type: CardType;
  imageRef: string;
}

export interface LegacyBattleCard extends Card {
  type: typeof BATTLE_CARD;
  category: LegacyBattleCardType;
  keywords?: string[];
  displayName?: string; // TODO: Remove form Battle cards in legacy data should be named title.
}

export interface BattleMapCard extends Card {
  type: typeof BATTLE_CARD;
  category: "map";
  title?: string;
}

export interface BattleRulesCard extends Card {
  type: typeof BATTLE_CARD;
  category: "primary_objective" | "secondary_objective" | "advantage";
  title?: string;
  setup?: CardText;
  scoring?: CardText;
  scoringTable?: string[][];
  specialRules?: CardText;
  gameMode?: string;
}

export type BattleCard = LegacyBattleCard | BattleMapCard | BattleRulesCard;
