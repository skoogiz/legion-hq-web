import React from "react";
import {LegacyCardName, UnitAvatar, UnitPoints} from "@legion-hq/components";
import {UnitActions} from "./UnitActions";
import {UnitUpgrades} from "./UnitUpgrades";
import {Counterpart, LegionCard} from "@legion-hq/types";
import {useCardZoom} from "@legion-hq/hooks/list/useCardZoom";
import {ItemActions, ItemCardSection, ItemContent, ItemHeader} from "./CardComponents";
import {Divider} from "@mui/material";

type Props = {
  counterpart: Counterpart;
  counterpartId: string;
  counterpartCard: LegionCard;
  handleRemoveCounterpart: () => void;
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
  handleRemoveCounterpart,
  swapUpgradeHandlers,
  addUpgradeHandlers,
  deleteUpgradeHandlers,
  changeLoadoutHandlers,
  deleteLoadoutHandlers,
}: Props) {
  const {handleCardZoom} = useCardZoom();
  return (
    <ItemCardSection>
      <ItemContent>
        <ItemHeader>
          <UnitAvatar
            key="avatar"
            id={counterpartId}
            handleClick={() => handleCardZoom(counterpartId)}
          />
          <div style={{display: "flex", flexGrow: 1}}>
            <LegacyCardName key="name" id={counterpartId} />
          </div>
          <UnitPoints key="points" unit={counterpart} subcost />
        </ItemHeader>
        {counterpartCard.upgradeBar && counterpartCard.upgradeBar.length > 0 && (
          <>
            <Divider />
            <UnitUpgrades
              key="upgrades"
              upgradesEquipped={counterpart.upgradesEquipped}
              totalUpgradeBar={counterpartCard.upgradeBar}
              loadoutUpgrades={counterpart.loadoutUpgrades}
              swapUpgradeHandlers={swapUpgradeHandlers}
              addUpgradeHandlers={addUpgradeHandlers}
              deleteUpgradeHandlers={deleteUpgradeHandlers}
              changeLoadoutHandlers={changeLoadoutHandlers}
              deleteLoadoutHandlers={deleteLoadoutHandlers}
            />
          </>
        )}
      </ItemContent>
      <ItemActions>
        <UnitActions key="actions" decrementUnit={handleRemoveCounterpart} />
      </ItemActions>
    </ItemCardSection>
  );
}
