import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {DragDropContainer} from "./DragDropContainer";
import {ListUnit} from "./ListUnit";
import {CounterpartUnit} from "./CounterpartUnit";
import {
  COUNTERPART,
  COUNTERPART_LOADOUT_UPGRADE,
  COUNTERPART_UPGRADE,
  LOADOUT_UPGRADE,
  UNIT_UPGRADE,
} from "@legion-hq/state/list";
import {noop} from "lodash";

export function ListUnits() {
  const {
    reorderUnits,
    isKillPointMode,
    setCardPaneFilter,
    handleUnequipUpgrade,
    handleIncrementUnit,
    handleDecrementUnit,
    handleRemoveCounterpart,
    handleAddKillPoints,
  } = useListBuilder();

  const {faction, units, uniques} = useCurrentList();

  const {cards} = useCards();

  const items = units.map((unit, unitIndex) => {
    const unitCard = cards[unit.unitId];
    const {counterpartId} = unitCard;
    const counterpartCard = counterpartId ? cards[counterpartId] : undefined;
    const {loadoutUpgrades} = unit;
    const hasLoadout = loadoutUpgrades ? loadoutUpgrades.length > 0 : false;
    let counterpartUnit;
    let addCounterpartHandler;
    let removeCounterpartHandler;
    const addUpgradeHandlers = new Array<() => void>();
    const swapUpgradeHandlers = new Array<() => void>();
    const deleteUpgradeHandlers = new Array<() => void>();
    const changeLoadoutHandlers = new Array<() => void>();
    const deleteLoadoutHandlers = new Array<() => void>();
    const totalUpgradeBar = [...unitCard.upgradeBar, ...unit.additionalUpgradeSlots];
    if (counterpartId === "tn" && faction === "empire") {
      addCounterpartHandler = undefined;
    } else if (
      counterpartId &&
      unit.unitId === "tj" &&
      uniques.includes("tp") &&
      !uniques.includes(counterpartId)
    ) {
      addCounterpartHandler = () =>
        setCardPaneFilter({
          action: COUNTERPART,
          unitIndex,
          counterpartId,
        });
    } else if (counterpartId && !uniques.includes(counterpartId)) {
      if (unit.unitId !== "tj") {
        addCounterpartHandler = () =>
          setCardPaneFilter({
            action: COUNTERPART,
            unitIndex,
            counterpartId,
          });
      }
    } else if (
      counterpartId &&
      counterpartCard &&
      uniques.includes(counterpartId) &&
      unit.counterpart
    ) {
      const cAddUpgradeHandlers = new Array<() => void>();
      const cSwapUpgradeHandlers = new Array<() => void>();
      const cDeleteUpgradeHandlers = new Array<() => void>();
      const cChangeLoadoutHandlers = new Array<() => void>();
      const cDeleteLoadoutHandlers = new Array<() => void>();
      const counterpart = unit.counterpart;
      const cLoadoutUpgrades = counterpart.loadoutUpgrades;
      removeCounterpartHandler = () => handleRemoveCounterpart(unitIndex);
      counterpart.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
        const upgradeType = counterpartCard.upgradeBar[upgradeIndex];
        if (upgradeId) {
          cSwapUpgradeHandlers.push(() =>
            setCardPaneFilter({
              action: COUNTERPART_UPGRADE,
              upgradeType,
              unitIndex,
              upgradeIndex,
              counterpartId,
              upgradesEquipped: counterpart.upgradesEquipped,
              additionalUpgradeSlots: [],
            }),
          );
          cAddUpgradeHandlers.push(noop);
          cDeleteUpgradeHandlers.push(() =>
            handleUnequipUpgrade(COUNTERPART_UPGRADE, unitIndex, upgradeIndex),
          );
          if (hasLoadout && Boolean(cLoadoutUpgrades[upgradeIndex])) {
            cChangeLoadoutHandlers.push(() =>
              setCardPaneFilter({
                action: COUNTERPART_LOADOUT_UPGRADE,
                upgradeType,
                unitIndex,
                upgradeIndex,
                counterpartId,
                upgradesEquipped: counterpart.upgradesEquipped,
                additionalUpgradeSlots: [],
              }),
            );
            cDeleteLoadoutHandlers.push(() =>
              handleUnequipUpgrade(COUNTERPART_LOADOUT_UPGRADE, unitIndex, upgradeIndex),
            );
          } else if (hasLoadout && !cLoadoutUpgrades[upgradeIndex]) {
            cChangeLoadoutHandlers.push(() =>
              setCardPaneFilter({
                action: COUNTERPART_LOADOUT_UPGRADE,
                upgradeType,
                unitIndex,
                upgradeIndex,
                counterpartId,
                upgradesEquipped: counterpart.upgradesEquipped,
                additionalUpgradeSlots: [],
              }),
            );
            cDeleteLoadoutHandlers.push(noop);
          }
        } else {
          cSwapUpgradeHandlers.push(noop);
          cAddUpgradeHandlers.push(() =>
            setCardPaneFilter({
              action: COUNTERPART_UPGRADE,
              upgradeType,
              unitIndex,
              upgradeIndex,
              counterpartId,
              upgradesEquipped: counterpart.upgradesEquipped,
              additionalUpgradeSlots: [],
            }),
          );
          cDeleteUpgradeHandlers.push(noop);
          if (hasLoadout) {
            cChangeLoadoutHandlers.push(noop);
            cDeleteLoadoutHandlers.push(noop);
          }
        }
      });
      counterpartUnit = (
        <CounterpartUnit
          counterpart={unit.counterpart}
          counterpartId={counterpartId}
          counterpartCard={counterpartCard}
          handleRemoveCounterpart={removeCounterpartHandler}
          swapUpgradeHandlers={cSwapUpgradeHandlers}
          addUpgradeHandlers={cAddUpgradeHandlers}
          deleteUpgradeHandlers={cDeleteUpgradeHandlers}
          changeLoadoutHandlers={cChangeLoadoutHandlers}
          deleteLoadoutHandlers={cDeleteLoadoutHandlers}
        />
      );
    }

    unit.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
      const upgradeType = totalUpgradeBar[upgradeIndex];
      if (upgradeId) {
        addUpgradeHandlers.push(noop);
        swapUpgradeHandlers.push(() =>
          setCardPaneFilter({
            action: UNIT_UPGRADE,
            upgradeType,
            unitIndex,
            upgradeIndex,
            hasUniques: unit.hasUniques,
            unitId: unitCard.id,
            upgradesEquipped: unit.upgradesEquipped,
            additionalUpgradeSlots: unit.additionalUpgradeSlots,
          }),
        );
        deleteUpgradeHandlers.push(() =>
          handleUnequipUpgrade(UNIT_UPGRADE, unitIndex, upgradeIndex),
        );
        if (hasLoadout && loadoutUpgrades[upgradeIndex]) {
          changeLoadoutHandlers.push(() =>
            setCardPaneFilter({
              action: LOADOUT_UPGRADE,
              upgradeType,
              unitIndex,
              upgradeIndex,
              unitId: unitCard.id,
              upgradesEquipped: unit.upgradesEquipped,
              additionalUpgradeSlots: unit.additionalUpgradeSlots,
            }),
          );
          deleteLoadoutHandlers.push(() =>
            handleUnequipUpgrade(LOADOUT_UPGRADE, unitIndex, upgradeIndex),
          );
        } else if (hasLoadout && !loadoutUpgrades[upgradeIndex]) {
          changeLoadoutHandlers.push(() =>
            setCardPaneFilter({
              action: LOADOUT_UPGRADE,
              upgradeType,
              unitIndex,
              upgradeIndex,
              unitId: unitCard.id,
              upgradesEquipped: unit.upgradesEquipped,
              additionalUpgradeSlots: unit.additionalUpgradeSlots,
            }),
          );
          deleteLoadoutHandlers.push(noop);
        }
      } else {
        swapUpgradeHandlers.push(noop);
        addUpgradeHandlers.push(() =>
          setCardPaneFilter({
            action: UNIT_UPGRADE,
            upgradeType,
            unitIndex,
            upgradeIndex,
            hasUniques: unit.hasUniques,
            unitId: unitCard.id,
            upgradesEquipped: unit.upgradesEquipped,
            additionalUpgradeSlots: unit.additionalUpgradeSlots,
          }),
        );
        deleteUpgradeHandlers.push(noop);
        if (hasLoadout) {
          changeLoadoutHandlers.push(noop);
          deleteLoadoutHandlers.push(noop);
        }
      }
    });
    return {
      id: unit.unitObjectString,
      component: (
        <ListUnit
          unit={unit}
          // uniques={uniques}
          unitCard={unitCard}
          // unitIndex={unitIndex}
          counterpartId={counterpartId}
          counterpartUnit={counterpartUnit}
          isKillPointMode={isKillPointMode}
          handleDecrementUnit={() => handleDecrementUnit(unitIndex)}
          handleIncrementUnit={() => handleIncrementUnit(unitIndex)}
          handleAddKillPoints={() => handleAddKillPoints(unit.totalUnitCost / unit.count)}
          handleRemoveKillPoints={() =>
            handleAddKillPoints((-1 * unit.totalUnitCost) / unit.count)
          }
          addCounterpartHandler={addCounterpartHandler}
          // removeCounterpartHandler={removeCounterpartHandler}
          swapUpgradeHandlers={swapUpgradeHandlers}
          addUpgradeHandlers={addUpgradeHandlers}
          deleteUpgradeHandlers={deleteUpgradeHandlers}
          changeLoadoutHandlers={changeLoadoutHandlers}
          deleteLoadoutHandlers={deleteLoadoutHandlers}
        />
      ),
    };
  });
  return (
    <div id="list-units" style={{display: "flex", flexFlow: "column"}}>
      <DragDropContainer items={items} reorderUnits={reorderUnits} />
    </div>
  );
}
