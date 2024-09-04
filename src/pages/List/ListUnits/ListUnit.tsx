import React from "react";
import {CardName, UnitAvatar, UnitPoints} from "@legion-hq/components";
import {UnitActions} from "./UnitActions";
import {UnitUpgrades} from "./UnitUpgrades";
import {UnitFlaw} from "./UnitFlaw";
import {LegionCard, ListUnit as ListUnitType} from "@legion-hq/types";

const styles: Record<string, React.CSSProperties> = {
  unitRow: {
    display: "flex",
    flexFlow: "row nowrap",
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },
  unitColumn: {display: "flex", flexFlow: "column nowrap"},
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
  },
};

type Props = {
  unit: ListUnitType;
  unitCard: LegionCard;
  counterpartId?: string;
  counterpartUnit?: JSX.Element;
  isKillPointMode: boolean;
  handleCardZoom: () => void;
  handleDecrementUnit: () => void;
  handleIncrementUnit: () => void;
  handleAddKillPoints: () => void;
  handleRemoveKillPoints: () => void;
  addCounterpartHandler: () => void;
  removeCounterpartHandler: () => void;
  zoomUpgradeHandlers: () => void;
  swapUpgradeHandlers: () => void;
  addUpgradeHandlers: () => void;
  deleteUpgradeHandlers: () => void;
  changeLoadoutHandlers: () => void;
  deleteLoadoutHandlers: () => void;
};

export function ListUnit({
  unit,
  unitCard,
  counterpartId,
  counterpartUnit,
  isKillPointMode,
  handleCardZoom,
  handleDecrementUnit,
  handleIncrementUnit,
  handleAddKillPoints,
  handleRemoveKillPoints,
  addCounterpartHandler,
  removeCounterpartHandler,
  zoomUpgradeHandlers,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers,
}: Props) {
  const avatar = (
    <UnitAvatar
      key="avatar"
      id={unitCard.id}
      count={unit.count}
      handleClick={handleCardZoom}
    />
  );
  const name = <CardName key="name" id={unitCard.id} />;
  const points = <UnitPoints key="points" unit={unit} />;
  const actions = (
    <UnitActions
      key="actions"
      isKillPointMode={isKillPointMode}
      handleAddKillPoints={handleAddKillPoints}
      handleRemoveKillPoints={handleRemoveKillPoints}
      decrementUnit={handleDecrementUnit}
      incrementUnit={unit.hasUniques ? undefined : handleIncrementUnit}
    />
  );

  const upgrades = (
    <UnitUpgrades
      key="upgrades"
      counterpartId={counterpartId}
      upgradesEquipped={unit.upgradesEquipped}
      upgradeInteractions={unit.upgradeInteractions}
      totalUpgradeBar={[...unitCard.upgradeBar, ...unit.additionalUpgradeSlots]}
      loadoutUpgrades={unit.loadoutUpgrades}
      addCounterpartHandler={addCounterpartHandler}
      removeCounterpartHandler={removeCounterpartHandler}
      swapUpgradeHandlers={swapUpgradeHandlers}
      zoomUpgradeHandlers={zoomUpgradeHandlers}
      addUpgradeHandlers={addUpgradeHandlers}
      deleteUpgradeHandlers={deleteUpgradeHandlers}
      changeLoadoutHandlers={changeLoadoutHandlers}
      deleteLoadoutHandlers={deleteLoadoutHandlers}
    />
  );
  const flaws = unitCard.flaw ? (
    <UnitFlaw key="flaws" flawId={unitCard.flaw} />
  ) : undefined;
  const leftCell = [avatar];
  const middleCell = [name, upgrades, flaws];
  const rightCell = [points, actions];
  return (
    <div style={styles.unitColumn}>
      <div style={styles.unitRow}>
        <div style={styles.leftCell}>
          <div style={{marginTop: 2}} />
          {leftCell}
        </div>
        <div style={styles.middleCell}>{middleCell}</div>
        <div style={styles.rightCell}>{rightCell}</div>
      </div>
      {counterpartUnit}
    </div>
  );
}
