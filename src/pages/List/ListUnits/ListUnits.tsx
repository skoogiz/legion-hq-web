import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import DragDropContainer from "./DragDropContainer";
import {ListUnit} from "./ListUnit";
import {CounterpartUnit} from "./CounterpartUnit";
import {
  COUNTERPART,
  COUNTERPART_LOADOUT_UPGRADE,
  COUNTERPART_UPGRADE,
  LOADOUT_UPGRADE,
  UNIT_UPGRADE,
} from "@legion-hq/state/list";

export function ListUnits() {
  const {
    reorderUnits,
    isKillPointMode,
    setCardPaneFilter,
    handleUnequipUpgrade,
    handleCardZoom,
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
    const counterpartCard = cards[counterpartId];
    const {loadoutUpgrades} = unit;
    const hasLoadout = loadoutUpgrades ? loadoutUpgrades.length > 0 : false;
    let counterpartUnit;
    let addCounterpartHandler;
    let removeCounterpartHandler;
    const addUpgradeHandlers = new Array<() => void>();
    const zoomUpgradeHandlers = new Array<() => void>();
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
    } else if (counterpartId && uniques.includes(counterpartId) && unit.counterpart) {
      const cAddUpgradeHandlers = new Array<() => void>();
      const cSwapUpgradeHandlers = new Array<() => void>();
      const cZoomUpgradeHandlers = new Array<() => void>();
      const cDeleteUpgradeHandlers = new Array<() => void>();
      const cChangeLoadoutHandlers = new Array<() => void>();
      const cDeleteLoadoutHandlers = new Array<() => void>();
      const counterpart = unit.counterpart;
      const cLoadoutUpgrades = counterpart.loadoutUpgrades;
      removeCounterpartHandler = () => handleRemoveCounterpart(unitIndex);
      counterpart.upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
        const upgradeType = counterpartCard.upgradeBar[upgradeIndex];
        if (upgradeId) {
          cZoomUpgradeHandlers.push(() => handleCardZoom(upgradeId));
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
          cAddUpgradeHandlers.push(undefined);
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
              handleUnequipUpgrade(
                "COUNTERPART_LOADOUT_UPGRADE",
                unitIndex,
                upgradeIndex,
              ),
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
            cDeleteLoadoutHandlers.push(undefined);
          }
        } else {
          cZoomUpgradeHandlers.push(undefined);
          cSwapUpgradeHandlers.push(undefined);
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
          cDeleteUpgradeHandlers.push(undefined);
          if (hasLoadout) {
            cChangeLoadoutHandlers.push(undefined);
            cDeleteLoadoutHandlers.push(undefined);
          }
        }
      });
      counterpartUnit = (
        <CounterpartUnit
          counterpart={unit.counterpart}
          counterpartId={counterpartId}
          counterpartCard={counterpartCard}
          handleCardZoom={() => handleCardZoom(counterpartId)}
          handleRemoveCounterpart={removeCounterpartHandler}
          zoomUpgradeHandlers={cZoomUpgradeHandlers}
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
        zoomUpgradeHandlers.push(() => handleCardZoom(upgradeId));
        addUpgradeHandlers.push(undefined);
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
          handleUnequipUpgrade("UNIT_UPGRADE", unitIndex, upgradeIndex),
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
          deleteLoadoutHandlers.push(undefined);
        }
      } else {
        zoomUpgradeHandlers.push(undefined);
        swapUpgradeHandlers.push(undefined);
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
        deleteUpgradeHandlers.push(undefined);
        if (hasLoadout) {
          changeLoadoutHandlers.push(undefined);
          deleteLoadoutHandlers.push(undefined);
        }
      }
    });
    return {
      id: unit.unitObjectString,
      component: (
        <ListUnit
          unit={unit}
          uniques={uniques}
          unitCard={unitCard}
          unitIndex={unitIndex}
          counterpartId={counterpartId}
          counterpartUnit={counterpartUnit}
          isKillPointMode={isKillPointMode}
          handleCardZoom={() => handleCardZoom(unit.unitId)}
          handleDecrementUnit={() => handleDecrementUnit(unitIndex)}
          handleIncrementUnit={() => handleIncrementUnit(unitIndex)}
          handleAddKillPoints={() => handleAddKillPoints(unit.totalUnitCost / unit.count)}
          handleRemoveKillPoints={() =>
            handleAddKillPoints((-1 * unit.totalUnitCost) / unit.count)
          }
          addCounterpartHandler={addCounterpartHandler}
          removeCounterpartHandler={removeCounterpartHandler}
          zoomUpgradeHandlers={zoomUpgradeHandlers}
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
