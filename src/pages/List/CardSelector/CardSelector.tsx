import {Fade} from "@mui/material";
import {SelectorHeader} from "./SelectorHeader";
import {SelectorContent} from "./SelectorContent";
import {StackController} from "./StackController";
import {ToggleButton} from "./ToggleButton";
import {
  BATTLE,
  COMMAND,
  CONTINGENCY,
  COUNTERPART,
  COUNTERPART_LOADOUT_UPGRADE,
  COUNTERPART_UPGRADE,
  LOADOUT_UPGRADE,
  UNIT,
  UNIT_UPGRADE,
} from "@legion-hq/state/list";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {noop} from "lodash";
import {Title} from "./CardSelectorComponents";
import {BattleCardSelector} from "./BattleCardSelector";
import {CommandCardSelector} from "./CommandCardSelector";

export function CardSelector() {
  const {
    cardPaneFilter,
    isApplyToAll,
    stackSize,
    getEligibleUnitsToAdd,
    getEquippableUpgrades,
    getEquippableLoadoutUpgrades,
    handleAddUnit,
    handleEquipUpgrade,
    handleAddCounterpart,
    handleIncrementStackSize,
    handleDecrementStackSize,
    handleToggleIsApplyToAll,
  } = useListBuilder();

  const currentList = useCurrentList();

  let header;
  let content: JSX.Element | undefined;
  let clickHandler;
  let validIds: string[] = [];
  let invalidIds: string[] = [];
  const {action} = cardPaneFilter;
  if (action === UNIT) {
    validIds = getEligibleUnitsToAdd(currentList, cardPaneFilter.rank);
    clickHandler = (unitId: string) => handleAddUnit(unitId);
    header = (
      <StackController
        stackSize={stackSize}
        handleIncrementStackSize={handleIncrementStackSize}
        handleDecrementStackSize={handleDecrementStackSize}
      />
    );
  } else if (action === COUNTERPART) {
    validIds = [cardPaneFilter.counterpartId];
    clickHandler = (counterpartId: string) =>
      handleAddCounterpart(cardPaneFilter.unitIndex, counterpartId);
    header = <Title title="Add counterpart" />;
  } else if (action === UNIT_UPGRADE) {
    const upgradeIds = getEquippableUpgrades(
      currentList,
      cardPaneFilter.upgradeType,
      cardPaneFilter.unitId,
      cardPaneFilter.upgradesEquipped,
      cardPaneFilter.additionalUpgradeSlots,
    );
    validIds = upgradeIds.validIds;
    invalidIds = upgradeIds.invalidIds;
    clickHandler = (upgradeId: string) =>
      handleEquipUpgrade(
        UNIT_UPGRADE,
        cardPaneFilter.unitIndex,
        cardPaneFilter.upgradeIndex,
        upgradeId,
        isApplyToAll,
      );
    header = cardPaneFilter.hasUniques ? (
      <Title title="Add upgrade" />
    ) : (
      <ToggleButton
        label="Apply to All"
        value={isApplyToAll}
        handleChange={handleToggleIsApplyToAll}
      />
    );
  } else if (action === COUNTERPART_UPGRADE) {
    const upgradeIds = getEquippableUpgrades(
      currentList,
      cardPaneFilter.upgradeType,
      cardPaneFilter.counterpartId,
      cardPaneFilter.upgradesEquipped,
      cardPaneFilter.additionalUpgradeSlots,
    );
    validIds = upgradeIds.validIds;
    invalidIds = upgradeIds.invalidIds;
    clickHandler = (upgradeId: string) =>
      handleEquipUpgrade(
        COUNTERPART_UPGRADE,
        cardPaneFilter.unitIndex,
        cardPaneFilter.upgradeIndex,
        upgradeId,
      );
    header = <Title title="Add counterpart upgrade" />;
  } else if (action === LOADOUT_UPGRADE) {
    const upgradeIds = getEquippableLoadoutUpgrades(
      currentList,
      cardPaneFilter.upgradeType,
      cardPaneFilter.unitId,
      cardPaneFilter.upgradeIndex,
      cardPaneFilter.upgradesEquipped,
      cardPaneFilter.additionalUpgradeSlots,
    );
    validIds = upgradeIds.validIds;
    invalidIds = upgradeIds.invalidIds;
    clickHandler = (upgradeId: string) =>
      handleEquipUpgrade(
        LOADOUT_UPGRADE,
        cardPaneFilter.unitIndex,
        cardPaneFilter.upgradeIndex,
        upgradeId,
      );
    header = <Title title="Add loadout upgrade" />;
  } else if (action === COUNTERPART_LOADOUT_UPGRADE) {
    const {
      upgradeType,
      counterpartId,
      upgradeIndex,
      upgradesEquipped,
      additionalUpgradeSlots,
    } = cardPaneFilter;
    const upgradeIds = getEquippableLoadoutUpgrades(
      currentList,
      upgradeType,
      counterpartId,
      upgradeIndex,
      upgradesEquipped,
      additionalUpgradeSlots,
    );
    validIds = upgradeIds.validIds;
    invalidIds = upgradeIds.invalidIds;
    clickHandler = (upgradeId: string) =>
      handleEquipUpgrade(
        COUNTERPART_LOADOUT_UPGRADE,
        cardPaneFilter.unitIndex,
        cardPaneFilter.upgradeIndex,
        upgradeId,
      );
    header = <Title title="Add loadout upgrade" />;
  } else if (action === COMMAND) {
    content = <CommandCardSelector />;
  } else if (action === CONTINGENCY) {
    content = <CommandCardSelector contingency />;
  } else if (action === BATTLE) {
    content = <BattleCardSelector type={cardPaneFilter.type} />;
  } else {
    header = <Title title={`${action} is an invalid action.`} />;
  }
  return (
    <Fade unmountOnExit exit={false} in={cardPaneFilter.action !== "DISPLAY"}>
      <div style={{display: "contents"}}>
        {content ?? (
          <>
            <SelectorHeader>{header}</SelectorHeader>
            <SelectorContent
              action={action}
              validIds={validIds}
              invalidIds={invalidIds}
              handleClick={clickHandler ?? noop}
            />
          </>
        )}
      </div>
    </Fade>
  );
}
