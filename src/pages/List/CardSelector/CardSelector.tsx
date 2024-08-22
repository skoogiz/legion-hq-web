import * as React from "react";
import {Fade, Typography} from "@mui/material";
import ListContext from "@legion-hq/context/ListContext";
import {LegionCard} from "@legion-hq/components";
import SelectorHeader from "./SelectorHeader";
import SelectorContent from "./SelectorContent";
import StackController from "./StackController";
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

function Title({title}: {title: string}) {
  return <Typography variant="body2">{title}</Typography>;
}

export function CardSelector() {
  const {
    currentList,
    cardPaneFilter,
    setCardPaneFilter,
    isApplyToAll,
    stackSize,
    getEligibleUnitsToAdd,
    getEquippableUpgrades,
    getEquippableLoadoutUpgrades,
    getEligibleCommandsToAdd,
    getEligibleContingenciesToAdd,
    getEligibleBattlesToAdd,
    handleAddUnit,
    handleAddCommand,
    handleAddContingency,
    handleRemoveCommand,
    handleRemoveContingency,
    handleAddBattle,
    handleRemoveBattle,
    handleCardZoom,
    handleEquipUpgrade,
    handleAddCounterpart,
    handleIncrementStackSize,
    handleDecrementStackSize,
    handleToggleIsApplyToAll,
  } = React.useContext(ListContext);
  let header;
  let clickHandler;
  let validIds = [];
  let invalidIds = [];
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
    clickHandler = (upgradeId) =>
      handleEquipUpgrade(
        "UNIT_UPGRADE",
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
    clickHandler = (upgradeId) =>
      handleEquipUpgrade(
        "COUNTERPART_UPGRADE",
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
    clickHandler = (upgradeId) =>
      handleEquipUpgrade(
        "LOADOUT_UPGRADE",
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
    clickHandler = (upgradeId) =>
      handleEquipUpgrade(
        "COUNTERPART_LOADOUT_UPGRADE",
        cardPaneFilter.unitIndex,
        cardPaneFilter.upgradeIndex,
        upgradeId,
      );
    header = <Title title="Add loadout upgrade" />;
  } else if (action === COMMAND) {
    const commandIds = getEligibleCommandsToAdd(currentList);
    validIds = commandIds.validIds;
    invalidIds = commandIds.invalidIds;
    clickHandler = (commandId) => handleAddCommand(commandId);
    if (currentList.commandCards.length === 0) {
      header = <Title title="Add command cards" />;
    } else {
      const currentCommands = currentList.commandCards.map((commandId, i) => (
        <LegionCard
          isBasic
          id={commandId}
          key={commandId}
          handleCardZoom={() => handleCardZoom(commandId)}
          handleDelete={() => handleRemoveCommand(i)}
        />
      ));
      header = (
        <div style={{display: "flex", alignItems: "center", flexFlow: "row wrap"}}>
          <Title title="Commands:" style={{marginRight: 4}} />
          {currentCommands}
        </div>
      );
    }
  } else if (action === CONTINGENCY) {
    const commandIds = getEligibleContingenciesToAdd(currentList);
    validIds = commandIds.validIds;
    invalidIds = commandIds.invalidIds;
    clickHandler = (commandId) => handleAddContingency(commandId);
    if (currentList.contingencies || currentList.contingencies.length === 0) {
      header = <Title title="Add contingency cards" />;
    } else {
      const currentContingencies = currentList.contingencies.map((commandId, i) => (
        <LegionCard
          isBasic
          id={commandId}
          key={commandId}
          handleCardZoom={() => handleCardZoom(commandId)}
          handleDelete={() => handleRemoveContingency(i)}
        />
      ));
      header = (
        <div style={{display: "flex", alignItems: "center", flexFlow: "row wrap"}}>
          <Title title="Commands:" style={{marginRight: 4}} />
          {currentContingencies}
        </div>
      );
    }
  } else if (action === BATTLE) {
    const battleIds = getEligibleBattlesToAdd(currentList, cardPaneFilter.type);
    validIds = battleIds.validIds;
    invalidIds = battleIds.invalidIds;
    clickHandler = (battleId) => handleAddBattle(cardPaneFilter.type, battleId);
    const currentBattles = currentList[`${cardPaneFilter.type}Cards`].map((id, i) => {
      return (
        <LegionCard
          isBasic={true}
          id={id}
          key={id}
          handleCardZoom={() => handleCardZoom(id)}
          handleDelete={() => handleRemoveBattle(cardPaneFilter.type, i)}
        />
      );
    });
    header = (
      <div style={{display: "flex", alignItems: "center", flexFlow: "row wrap"}}>
        {currentBattles}
      </div>
    );
  } else {
    header = <Title title={`${action} is an invalid action.`} />;
  }
  return (
    <Fade unmountOnExit exit={false} in={cardPaneFilter.action !== "DISPLAY"}>
      <div style={{display: "contents"}}>
        <SelectorHeader
          headerContent={header}
          cardPaneFilter={cardPaneFilter}
          setCardPaneFilter={setCardPaneFilter}
        />
        <SelectorContent
          action={action}
          validIds={validIds}
          invalidIds={invalidIds}
          handleClick={clickHandler}
          handleCardZoom={handleCardZoom}
        />
      </div>
    </Fade>
  );
}
