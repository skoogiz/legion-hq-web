import {
  Counterpart,
  LegionCard,
  ListTemplate,
  ListUnit,
  UnitCount,
} from "@legion-hq/types";
import {List} from "@legion-hq/types/list.class";

export const createUnitCount = ({
  commander = 0,
  operative = 0,
  corps = 0,
  special = 0,
  support = 0,
  heavy = 0,
}: Partial<UnitCount> = {}): UnitCount => ({
  commander,
  operative,
  corps,
  special,
  support,
  heavy,
});

export const createListTemplate = ({
  listId,
  version = 1,
  title = "Untitled",
  game = "legion",
  mode = "standard mode",
  faction = "rebels",
  notes = "",
  pointTotal = 0,
  killPoints = 0,
  competitive = false,
  battleForce = "",
  killedUnits = [],
  units = [],
  commandCards = [],
  objectiveCards = [],
  conditionCards = [],
  deploymentCards = [],
  uniques = [],
  commanders = [],
  unitObjectStrings = [],
  unitCounts = createUnitCount(),
  contingencies = [],
}: Partial<ListTemplate> = {}): ListTemplate => ({
  listId,
  version,
  title,
  game,
  mode,
  faction,
  notes,
  pointTotal,
  killPoints,
  competitive,
  battleForce,
  killedUnits,
  units,
  commandCards,
  objectiveCards,
  conditionCards,
  deploymentCards,
  uniques,
  commanders,
  unitObjectStrings,
  unitCounts,
  contingencies,
});

export const createList = ({
  listId,
  version = 1,
  title = "Untitled",
  game = "legion",
  mode = "standard mode",
  faction = "rebels",
  notes = "",
  pointTotal = 0,
  killPoints = 0,
  competitive = false,
  battleForce = "",
  killedUnits = [],
  units = [],
  commandCards = [],
  objectiveCards = [],
  conditionCards = [],
  deploymentCards = [],
  uniques = [],
  commanders = [],
  unitObjectStrings = [],
  unitCounts = createUnitCount(),
}: Partial<ListTemplate> = {}): List =>
  new List({
    listId,
    version,
    title,
    game,
    mode,
    faction,
    notes,
    pointTotal,
    killPoints,
    competitive,
    battleForce,
    killedUnits,
    units,
    commandCards,
    objectiveCards,
    conditionCards,
    deploymentCards,
    uniques,
    commanders,
    unitObjectStrings,
    unitCounts,
  });

export const createListUnitByCard = ({
  unitId,
  unitCard: {isUnique, cost, upgradeBar, keywords, flaw},
  stackSize = 1,
}: {
  unitId: string;
  unitCard: LegionCard;
  stackSize?: number;
}): ListUnit => {
  const equipmentSlots = upgradeBar?.length ?? 0;

  return {
    unitId,
    count: isUnique ? 1 : stackSize,
    hasUniques: isUnique ?? false,
    totalUnitCost: cost * stackSize,
    unitObjectString: unitId,
    upgradesEquipped: equipmentSlots
      ? new Array<string | null>(equipmentSlots).fill(null)
      : [],
    loadoutUpgrades:
      equipmentSlots && keywords?.includes("Loadout")
        ? new Array<string | null>(equipmentSlots).fill(null)
        : [],
    additionalUpgradeSlots: [],
    flawId: flaw,
  };
};

export const createCounterpart = ({
  count = 1,
  counterpartId = "",
  totalUnitCost = 0,
  upgradesEquipped = [],
  loadoutUpgrades = [],
  additionalUpgradeSlots = [],
}: Partial<Counterpart> = {}): Counterpart => ({
  count,
  counterpartId,
  totalUnitCost,
  upgradesEquipped,
  loadoutUpgrades,
  additionalUpgradeSlots,
});
