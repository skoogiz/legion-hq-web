/*

    ab: {
      cardType: "unit",
      defense: "white",
      surges: ["crit", "block"],
      speed: 2,
      wounds: 6,
      courage: 2,
      cardSubtype: "trooper",
      cardName: "Leia Organa",
      title: "Fearless and Inventive",
      isUnique: true,
      rank: "commander",
      cost: 75,
      prevCost: 80,
      faction: "rebels",
      imageName: "Leia Organa.jpeg",
      keywords: ["Take Cover", "Inspire", "Nimble", "Sharpshooter", "Pierce"],
      upgradeBar: ["command", "command", "gear"],
      history: [
        {
          date: "27 October 2021",
          description: "Cost reduced from 90 to 80 points.",
        },
        {
          date: "5 June 2023",
          description: "Cost reduced from 80 to 75 points.",
        },
      ],
      id: "ab",
    },

*/

import {DefenceDiceType, FactionType, SurgeType} from "./constants";
import {RankType} from "./units";
import {UpgradeType} from "./upgrades";

export type CardHistory = {
  date: string;
  description: string;
};

type RequirementCondition =
  | {cardName: string}
  | {force: boolean}
  | {rank: RankType}
  | {
      cardSubtype: string;
    }
  | {
      faction: FactionType;
    }
  | {
      imageName: string;
    }
  | {"dark side": boolean}
  | {"light side": boolean};

type RequirementOption =
  | RequirementCondition
  | ["AND" | "OR", RequirementOption, RequirementOption];

export type Requirements =
  | RequirementCondition
  | [RequirementCondition]
  | ["NOT", RequirementCondition]
  | ["NOT", [RequirementCondition]]
  | ["AND" | "OR", RequirementOption, RequirementOption];

interface CardBase {
  id: string;
  cardName: string;
  cardType: string;
  cardSubtype: string;
  imageName: string;
}

export interface LegionCard extends CardBase {
  title?: string;
  displayName: string;
  faction?: string;
  isUnique?: boolean;
  keywords: string[];
  rank: RankType;
  cost: number;
  courage: number;
  wounds?: number;
  resilience?: number;
  speed: number;
  defense: DefenceDiceType;
  surges: SurgeType[];
  upgradeBar: UpgradeType[];
  metaData?: {
    isCustomCard?: boolean;
  };
  history?: CardHistory[];
  commander?: string;

  flaw?: string;
  contingencies?: number;
  counterpartId?: string;
  prevCost?: number;
  flexResponse?: number;
  equip?: string[];
  entourage?: {
    name: string;
    type: RankType;
  };
  affiliations?: FactionType;
  specialIssue?: string;
  detachment?: string;
  requirements?: Requirements;
  additionalUpgradeSlots?: UpgradeType[];
  battleForce?: string;
}

export type LegionCardWithConditions = LegionCard &
  Record<UpgradeType, boolean | undefined> & {
    "light side"?: boolean;
    "dark side"?: boolean;
  };

export interface CommandCard extends CardBase {
  cardSubtype: "1" | "2" | "3" | "4";
  cardType: "command";
  commander: string;
  faction: string;
  keywords: string[];
  battleForce?: string;
}

export type BattleType = "objective" | "deployment" | "condition";
