const fs = require("fs");

const cards = require("../src/data/2.5.3/cards.json");

const helpers = require("./convert-helpers.cjs");

const {isEmpty} = require("lodash");

function mapSergeChart({surges}) {
  if (surges?.length > 0) {
    let attack = null;
    let defense = null;
    return surges.reduce(
      (acc, surge) => {
        switch (surge) {
          case "hit":
            return [surge, acc[1]];
          case "crit":
            return ["critical", acc[1]];
          case "block":
            return [acc[0], surge];
          default:
            return acc;
        }
      },
      [null, null],
    );
  }
  return undefined;
}

const units = Object.values(cards)
  .filter(helpers.noCustomCards)
  .filter((card) => card.cardType === "unit" || card.cardType === "counterpart")
  .map((card) => ({
    ...card,
    faction: card.faction === "fringe" ? "mercenaries" : card.faction,
    subfaction: helpers.mapAffiliation(card),
  }))
  .map((card) => {
    return {
      __typename: card.cardType,
      name: card.cardName,
      subtitle: card.title,
      unitType: card.cardSubtype,
      faction: card.faction,
      affiliation: card.subfaction,
      unitRank: card.rank,
      points: card.cost,
      numberOfMiniatures: 1,
      upgradeBar:
        card.upgradeBar && card.upgradeBar.length > 0 ? card.upgradeBar : undefined,
      keywords: card.keywords && card.keywords.length > 0 ? card.keywords : undefined,
      woundThreshold: card.wounds,
      resilience: card.resilience,
      courage: card.courage !== undefined && card.courage <= 0 ? "-" : card.courage,
      speed: card.speed,
      defense: card.defense,
      weapons: [],
      surgeChart: mapSergeChart(card),
      isUnique: card.isUnique || undefined,
      imageRef: card.imageName,
      identifiers: helpers.generateIdentifiers(card),
      meta: helpers.mapMetaData(card),
      history: card.history && card.history.length > 0 ? card.history : undefined,
    };
  });

fs.writeFile(
  "unit-cards.json",
  JSON.stringify(units),
  {
    encoding: "utf8",
    flag: "w",
    mode: 0o666,
  },
  (err) => {
    // Checking for errors
    if (err) throw err;

    // Success
    console.log(`Done writing file!`);
  },
);
