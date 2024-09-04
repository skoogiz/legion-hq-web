import {UpgradeType} from "@legion-hq/types";
import {AddCounterpartButton} from "./AddCounterpartButton";
import {AddUpgradeButton} from "./AddUpgradeButton";
import {UpgradeChip} from "./UpgradeChip";

type Props = {
  counterpartId?: string;
  upgradesEquipped: Array<string | null>;
  upgradeInteractions?: Record<string, number>;
  totalUpgradeBar: UpgradeType[];
  loadoutUpgrades: Array<string | null>;
  addCounterpartHandler?: () => void;
  zoomUpgradeHandlers: Array<() => void>;
  swapUpgradeHandlers: Array<() => void>;
  addUpgradeHandlers: Array<() => void>;
  deleteUpgradeHandlers: Array<() => void>;
  changeLoadoutHandlers: Array<() => void>;
  deleteLoadoutHandlers: Array<() => void>;
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
  const addCounterpartButtons: JSX.Element[] = [];
  const addUpgradesButtons: JSX.Element[] = [];
  const upgradeChips: JSX.Element[] = [];
  const hasLoadout = loadoutUpgrades ? loadoutUpgrades.length > 0 : false;
  if (counterpartId && addCounterpartHandler) {
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
          loadoutId={
            hasLoadout ? (loadoutUpgrades[upgradeIndex] ?? undefined) : undefined
          }
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
