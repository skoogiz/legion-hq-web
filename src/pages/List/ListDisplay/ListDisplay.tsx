import {Fade, Typography, Divider, styled} from "@mui/material";
import {factions} from "@legion-hq/constants";
import CardImage from "./CardImage";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {DISPLAY} from "@legion-hq/state/list";
import {FactionType, ListUnit} from "@legion-hq/types";
import {useListBuilder} from "@legion-hq/hooks/list/useList";

const Counter = styled("div")<{faction: FactionType}>`
  height: 150;
  width: 15;
  margin-right: 4;
  border: 1px solid ${({faction}) => factions[faction].primaryColor};
  border-radius: 2.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function RowDisplay({
  unit,
  faction,
  handleCardZoom,
}: {
  unit: ListUnit;
  faction: FactionType;
  handleCardZoom: (cardId: string) => void;
}) {
  const {counterpart, flawId} = unit;
  return (
    <div style={{display: "flex", flexFlow: "column nowrap"}}>
      <div style={{display: "flex", flexFlow: "row wrap"}}>
        {unit.count > 1 && (
          <Counter faction={faction}>
            <Typography variant={unit.count > 9 ? "caption" : "button"}>
              {unit.count}
            </Typography>
          </Counter>
        )}
        <CardImage id={unit.unitId} handleClick={() => handleCardZoom(unit.unitId)} />
        {unit.upgradesEquipped.map((upgradeId, i) => {
          if (upgradeId) {
            if (unit.loadoutUpgrades && unit.loadoutUpgrades[i]) {
              const loadoutUpgradeId = unit.loadoutUpgrades[i];
              return (
                <div key={upgradeId} style={{display: "flex", flexFlow: "row nowrap"}}>
                  <CardImage
                    id={upgradeId}
                    handleClick={() => handleCardZoom(upgradeId)}
                  />
                  <CardImage
                    id={loadoutUpgradeId}
                    isLoadout={true}
                    handleClick={() => handleCardZoom(loadoutUpgradeId)}
                  />
                </div>
              );
            } else {
              return (
                <CardImage
                  key={upgradeId}
                  id={upgradeId}
                  handleClick={() => handleCardZoom(upgradeId)}
                />
              );
            }
          } else return null;
        })}
        {flawId && <CardImage id={flawId} handleClick={() => handleCardZoom(flawId)} />}
      </div>
      {counterpart && (
        <div style={{display: "flex", flexFlow: "row wrap"}}>
          <CardImage
            id={counterpart.counterpartId}
            handleClick={() => handleCardZoom(counterpart.counterpartId)}
          />
          {counterpart.upgradesEquipped.map((upgradeId, i) => {
            if (upgradeId) {
              if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades[i]) {
                const loadoutUpgradeId = counterpart.loadoutUpgrades[i];
                return (
                  <div key={upgradeId} style={{display: "flex", flexFlow: "row nowrap"}}>
                    <CardImage
                      id={upgradeId}
                      handleClick={() => handleCardZoom(upgradeId)}
                    />
                    <CardImage
                      id={loadoutUpgradeId}
                      isLoadout={true}
                      handleClick={() => handleCardZoom(loadoutUpgradeId)}
                    />
                  </div>
                );
              } else {
                return (
                  <CardImage
                    key={upgradeId}
                    id={upgradeId}
                    handleClick={() => handleCardZoom(upgradeId)}
                  />
                );
              }
            } else return null;
          })}
        </div>
      )}
    </div>
  );
}

function CommandRow({
  commandIds,
  handleCardZoom,
}: {
  commandIds: string[];
  handleCardZoom: (cardId: string) => void;
}) {
  return (
    <div style={{display: "flex", flexFlow: "row wrap"}}>
      {commandIds.map((id) => (
        <div key={id}>
          <CardImage key={id} id={id} handleClick={() => handleCardZoom(id)} />
        </div>
      ))}
    </div>
  );
}

export function ListDisplay() {
  const {cardPaneFilter, handleCardZoom} = useListBuilder();
  const {faction, units, commandCards} = useCurrentList();
  return (
    <Fade unmountOnExit exit={false} in={cardPaneFilter.action === DISPLAY}>
      <div style={{display: "flex", flexFlow: "column nowrap", alignItems: "stretch"}}>
        {units.map((unit) => (
          <div key={unit.unitObjectString}>
            <RowDisplay unit={unit} faction={faction} handleCardZoom={handleCardZoom} />
            <Divider style={{marginBottom: 4}} />
          </div>
        ))}
        <CommandRow commandIds={commandCards} handleCardZoom={handleCardZoom} />
      </div>
    </Fade>
  );
}
