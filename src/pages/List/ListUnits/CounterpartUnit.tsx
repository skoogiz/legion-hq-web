import React from "react";
import {CardName, UnitAvatar, UnitPoints} from "@legion-hq/components";
import {UnitActions} from "./UnitActions";
import {UnitUpgrades} from "./UnitUpgrades";
import {Counterpart, LegionCard} from "@legion-hq/types";

const styles: Record<string, React.CSSProperties> = {
  unitRow: {
    marginLeft: 25,
    display: "flex",
    flexFlow: "row nowrap",
  },
  leftCell: {marginRight: 4},
  counterpart: {marginLeft: 20},
  middleCell: {
    flex: 1,
    marginRight: 2,
    display: "flex",
    flexFlow: "column nowrap",
    overflowX: "auto",
    overflowY: "hidden",
  },
  rightCell: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    borderLeft: "1px solid rgba(255,255,255,0.12)",
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },
};

type Props = {
  counterpart: Counterpart;
  counterpartId: string;
  counterpartCard: LegionCard;
  handleCardZoom: () => void;
  handleRemoveCounterpart: () => void;
  zoomUpgradeHandlers: Array<() => void>;
  swapUpgradeHandlers: Array<() => void>;
  addUpgradeHandlers: Array<() => void>;
  deleteUpgradeHandlers: Array<() => void>;
  changeLoadoutHandlers: Array<() => void>;
  deleteLoadoutHandlers: Array<() => void>;
};

export function CounterpartUnit({
  counterpart,
  counterpartId,
  counterpartCard,
  handleCardZoom,
  handleRemoveCounterpart,
  zoomUpgradeHandlers,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers,
}: Props) {
  const avatar = (
    <UnitAvatar key="avatar" id={counterpartId} handleClick={handleCardZoom} />
  );
  const name = <CardName key="name" id={counterpartId} />;
  const points = <UnitPoints key="points" unit={counterpart} />;
  const actions = <UnitActions key="actions" decrementUnit={handleRemoveCounterpart} />;
  const upgrades = (
    <UnitUpgrades
      key="upgrades"
      upgradesEquipped={counterpart.upgradesEquipped}
      totalUpgradeBar={counterpartCard.upgradeBar}
      loadoutUpgrades={counterpart.loadoutUpgrades}
      zoomUpgradeHandlers={zoomUpgradeHandlers}
      swapUpgradeHandlers={swapUpgradeHandlers}
      addUpgradeHandlers={addUpgradeHandlers}
      deleteUpgradeHandlers={deleteUpgradeHandlers}
      changeLoadoutHandlers={changeLoadoutHandlers}
      deleteLoadoutHandlers={deleteLoadoutHandlers}
    />
  );
  const leftCell = [avatar];
  const middleCell = [name, upgrades];
  const rightCell = [points, actions];
  return (
    <div style={styles.unitRow}>
      <div style={styles.leftCell}>{leftCell}</div>
      <div style={styles.middleCell}>{middleCell}</div>
      <div style={styles.rightCell}>{rightCell}</div>
    </div>
  );
}
