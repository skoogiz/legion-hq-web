import {CardService} from "@legion-hq/data-access/services";
import {LegionCard, ListTemplate, ListUnit, UpgradeType} from "@legion-hq/types";

const {cards} = CardService.getInstance();

function checkUpgradeName(upgrade: LegionCard, values: string | string[]) {
  if (Array.isArray(values)) {
    let isConditionMet = false;
    values.forEach((value) => {
      if (upgrade.cardName.includes(value)) isConditionMet = true;
    });
    return isConditionMet;
  } else {
    return upgrade.cardName.includes(values);
  }
}

function checkUpgradeType(upgrade: LegionCard, value: UpgradeType) {
  return upgrade.cardSubtype === value;
}

type Params = {
  list: ListTemplate;
  unit: ListUnit;
};

export type Interactions = {
  entourages: Record<
    string,
    {isConditionMet: (params: Params) => boolean; boundaryDelta: number}
  >;
  upgradePoints: Record<
    string,
    {isConditionMet: (params: Params) => boolean; pointDelta: number}
  >;
  eligibility: Record<
    string,
    {
      conditionFunction: (upgrade: LegionCard) => boolean;
      resultFunction: (upgrade: LegionCard) => boolean;
    }
  >;
};

const interactions: Interactions = {
  entourages: {
    bc: {
      // IRGs + Emperor Palpatine
      isConditionMet: ({list}: Params) => list.uniques.includes("as"),
      boundaryDelta: 1,
    },
    bd: {
      // IDTs + Director Krennic
      isConditionMet: ({list}: Params) => list.uniques.includes("av"),
      boundaryDelta: 1,
    },
  },
  upgradePoints: {
    lk: {
      // JT-12 Jetpack + Captain Rex
      isConditionMet: ({unit}: Params) => unit.unitId === "fy",
      pointDelta: -5,
    },
    lu: {
      // Jyn's Blaster + Jyn Erso
      isConditionMet: ({list}: Params) => list.uniques.includes("ae"),
      pointDelta: -5,
    },
    li: {
      // Situational Awareness + support unit
      isConditionMet: ({unit}: Params) => cards[unit.unitId].rank === "support",
      pointDelta: 4,
    },
  },
  eligibility: {
    gx: {
      // B1 Battle droids + Electrobinoculars
      conditionFunction: (upgrade: LegionCard) => checkUpgradeType(upgrade, "gear"),
      resultFunction: (upgrade: LegionCard) =>
        checkUpgradeName(upgrade, ["Electrobinoculars", "Portable Scanner"]),
    },
  },
};

export default interactions;
