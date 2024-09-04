import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {LegionCard, ListTemplate, ListUnit} from "@legion-hq/types";

function generateUnitComponent(
  unit: ListUnit,
  cards: Record<string, LegionCard>,
  index: number,
) {
  const unitText = [];
  const unitCard = cards[unit.unitId];
  if (unit.count === 1) {
    if (unit.unitId === "pz") {
      // Kraken
      unitText.push(`${unitCard.cardName} - Kraken (${unit.totalUnitCost})`);
    } else if (unit.unitId === "qa") {
      // Kalani
      unitText.push(`${unitCard.cardName} - Kalani (${unit.totalUnitCost})`);
    } else {
      unitText.push(`${unitCard.cardName} (${unit.totalUnitCost})`);
    }
    unitText.push(<br />);
    unit.upgradesEquipped.forEach((upgradeId, index) => {
      if (upgradeId) {
        const upgradeCard = cards[upgradeId];
        if (unit.loadoutUpgrades && unit.loadoutUpgrades[index]) {
          const loadoutCard = cards[unit.loadoutUpgrades[index]];
          unitText.push(` - ${upgradeCard.cardName} (${upgradeCard.cost})`);
          unitText.push(`/${loadoutCard.cardName} (${loadoutCard.cost})`);
          unitText.push(<br />);
        } else {
          unitText.push(` - ${upgradeCard.cardName} (${upgradeCard.cost})`);
          unitText.push(<br />);
        }
      }
    });
  }
  return (
    <div key={`${unit.unitObjectString}_${index}`}>
      {unitText}
      <br />
    </div>
  );
}

export function HtmlListText({list}: {list: ListTemplate}) {
  const {cards} = useCards();
  return (
    <div>
      <b>{list.title ? list.title : "Untitled"}</b>
      <br />
      {list.units.map((unit, index) => {
        return generateUnitComponent(unit, cards, index);
      })}
    </div>
  );
}
