import React from "react";
import {CardName, UnitAvatar, UnitPoints} from "@legion-hq/components";
import {UnitActions} from "./UnitActions";
import {UnitUpgrades} from "./UnitUpgrades";
import {UnitFlaw} from "./UnitFlaw";
import {LegionCard, ListUnit as ListUnitType} from "@legion-hq/types";
import {useCardZoom} from "@legion-hq/hooks/list/useCardZoom";
import {Divider, Paper, styled} from "@mui/material";

const styles: Record<string, React.CSSProperties> = {
  unitRow: {
    display: "flex",
    flexFlow: "row nowrap",
  },
  middleCell: {
    flex: 1,
    marginRight: 2,
    display: "flex",
    flexFlow: "column nowrap",
  },
  rightCell: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
  },
};

const ItemCard = styled(Paper)({
  display: "flex",
  flexDirection: "column",
});

const ItemHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  columnGap: theme.spacing(2),
  padding: theme.spacing(0.5),
}));

const ItemFooter = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
});

type Props = {
  unit: ListUnitType;
  unitCard: LegionCard;
  counterpartId?: string;
  counterpartUnit?: JSX.Element;
  isKillPointMode: boolean;
  handleDecrementUnit: () => void;
  handleIncrementUnit: () => void;
  handleAddKillPoints: () => void;
  handleRemoveKillPoints: () => void;
  addCounterpartHandler?: () => void;
  // removeCounterpartHandler: () => void;
  swapUpgradeHandlers: Array<() => void>;
  addUpgradeHandlers: Array<() => void>;
  deleteUpgradeHandlers: Array<() => void>;
  changeLoadoutHandlers: Array<() => void>;
  deleteLoadoutHandlers: Array<() => void>;
};

export function ListUnit({
  unit,
  unitCard,
  counterpartId,
  counterpartUnit,
  isKillPointMode,
  handleDecrementUnit,
  handleIncrementUnit,
  handleAddKillPoints,
  handleRemoveKillPoints,
  addCounterpartHandler,
  // removeCounterpartHandler,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers,
}: Props) {
  const {handleCardZoom} = useCardZoom();
  const {cardName, displayName, title, isUnique} = unitCard;

  return (
    <ItemCard>
      <ItemHeader>
        <UnitAvatar
          key="avatar"
          id={unitCard.id}
          count={unit.count}
          handleClick={() => handleCardZoom(unitCard.id)}
        />
        <div style={{display: "flex", flexGrow: 1}}>
          <CardName
            name={cardName}
            displayName={displayName}
            title={title}
            isUnique={isUnique}
          />
        </div>
        <UnitPoints unit={unit} size="large" />
      </ItemHeader>

      <Divider />

      <div style={styles.unitRow}>
        <div style={styles.middleCell}>
          {unitCard.flaw && <UnitFlaw key="flaws" flawId={unitCard.flaw} />}
          <UnitUpgrades
            key="upgrades"
            counterpartId={counterpartId}
            upgradesEquipped={unit.upgradesEquipped}
            upgradeInteractions={unit.upgradeInteractions}
            totalUpgradeBar={[...unitCard.upgradeBar, ...unit.additionalUpgradeSlots]}
            loadoutUpgrades={unit.loadoutUpgrades}
            addCounterpartHandler={addCounterpartHandler}
            // removeCounterpartHandler={removeCounterpartHandler}
            swapUpgradeHandlers={swapUpgradeHandlers}
            addUpgradeHandlers={addUpgradeHandlers}
            deleteUpgradeHandlers={deleteUpgradeHandlers}
            changeLoadoutHandlers={changeLoadoutHandlers}
            deleteLoadoutHandlers={deleteLoadoutHandlers}
          />
        </div>
      </div>

      {counterpartUnit && (
        <>
          <Divider />
          <div style={{border: "solid red 2px"}}>{counterpartUnit}</div>
        </>
      )}

      <Divider />

      <ItemFooter>
        <UnitActions
          key="actions"
          isKillPointMode={isKillPointMode}
          handleAddKillPoints={handleAddKillPoints}
          handleRemoveKillPoints={handleRemoveKillPoints}
          decrementUnit={handleDecrementUnit}
          incrementUnit={unit.hasUniques ? undefined : handleIncrementUnit}
          unitCount={unit.count}
        />
      </ItemFooter>
    </ItemCard>
  );
}
