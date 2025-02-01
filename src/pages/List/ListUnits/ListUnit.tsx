import React from "react";
import {CardName, UnitAvatar, UnitPoints} from "@legion-hq/components";
import {UnitActions} from "./UnitActions";
import {UnitUpgrades} from "./UnitUpgrades";
import {UnitFlaw} from "./UnitFlaw";
import {LegionCard, ListUnit as ListUnitType} from "@legion-hq/types";
import {useCardZoom} from "@legion-hq/hooks/list/useCardZoom";
import {Divider} from "@mui/material";
import {
  ItemActions,
  ItemCard,
  ItemCardSection,
  ItemContent,
  ItemHeader,
} from "./CardComponents";

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
      <ItemCardSection>
        <ItemContent>
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
        </ItemContent>
        <ItemActions>
          <UnitActions
            key="actions"
            isKillPointMode={isKillPointMode}
            handleAddKillPoints={handleAddKillPoints}
            handleRemoveKillPoints={handleRemoveKillPoints}
            decrementUnit={handleDecrementUnit}
            incrementUnit={unit.hasUniques ? undefined : handleIncrementUnit}
            unitCount={unit.count}
          />
        </ItemActions>
      </ItemCardSection>

      {counterpartUnit && (
        <>
          <Divider sx={{opacity: 0.8, height: 2}} />
          {counterpartUnit}
        </>
      )}
    </ItemCard>
  );
}
