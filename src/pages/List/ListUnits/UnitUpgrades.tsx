import React from "react";
import AddCounterpartButton from "./AddCounterpartButton";
import AddUpgradeButton from "./AddUpgradeButton";
import {UpgradeChip} from "./UpgradeChip";

type Props = {
  counterpartId: string;
  upgradesEquipped: Array<string | null>;
  upgradeInteractions?: Record<string, number>;
  totalUpgradeBar;
  loadoutUpgrades;
  // handleCardZoom: () => void;
  // handleRemoveCounterpart: () => void;

  addCounterpartHandler: () => void;

  zoomUpgradeHandlers: () => void;
  swapUpgradeHandlers: () => void;
  addUpgradeHandlers: () => void;
  deleteUpgradeHandlers: () => void;
  changeLoadoutHandlers: () => void;
  deleteLoadoutHandlers: () => void;
};

export function UnitUpgrades({
  counterpartId,
  upgradesEquipped,
  upgradeInteractions,
  totalUpgradeBar,
  loadoutUpgrades,
  addCounterpartHandler,
  zoomUpgradeHandlers,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers,
}: Props) {
  const addCounterpartButtons = [];
  const addUpgradesButtons = [];
  const upgradeChips = [];
  const hasLoadout = loadoutUpgrades ? loadoutUpgrades.length > 0 : false;
  if (addCounterpartHandler) {
    addCounterpartButtons.push(
      <AddCounterpartButton
        key={counterpartId}
        counterpartId={counterpartId}
        handleClick={addCounterpartHandler}
      />,
    );
  }
  upgradesEquipped.forEach((upgradeId, upgradeIndex) => {
    if (upgradeId) {
      upgradeChips.push(
        <UpgradeChip
          key={upgradeId}
          upgradeId={upgradeId}
          upgradeInteractions={upgradeInteractions}
          loadoutId={hasLoadout ? loadoutUpgrades[upgradeIndex] : undefined}
          handleClick={zoomUpgradeHandlers[upgradeIndex]}
          handleSwap={swapUpgradeHandlers[upgradeIndex]}
          handleDelete={deleteUpgradeHandlers[upgradeIndex]}
          handleChangeLoadout={changeLoadoutHandlers[upgradeIndex]}
          handleDeleteLoadout={deleteLoadoutHandlers[upgradeIndex]}
        />,
      );
    } else {
      addUpgradesButtons.push(
        <AddUpgradeButton
          key={`${totalUpgradeBar[upgradeIndex]}_${upgradeIndex}`}
          type={totalUpgradeBar[upgradeIndex]}
          handleClick={addUpgradeHandlers[upgradeIndex]}
        />,
      );
    }
  });
  return (
    <div style={{flex: "display", flexFlow: "row wrap", alignItems: "center"}}>
      {addCounterpartButtons}
      {addUpgradesButtons}
      {upgradeChips}
    </div>
  );
}
