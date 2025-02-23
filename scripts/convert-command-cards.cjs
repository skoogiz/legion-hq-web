const fs = require("fs");

const helpers = require("./convert-helpers.cjs");

const cards = require("../src/data/2.5.3/cards.json");

const commands = Object.values(cards)
  .filter(helpers.noCustomCards)
  .filter((card) => card.cardType === "command")
  .map((card) => ({
    ...card,
    faction: card.faction === "fringe" ? "mercenaries" : card.faction,
  }))
  .map((card) => {
    if (card.metaData) console.log(card.metaData);
    return {
      __typename: card.cardType,
      name: card.cardName,
      pips: +card.cardSubtype,
      keywords: card.keywords && card.keywords.length > 0 ? card.keywords : undefined,
      imageRef: card.imageName,
      identifiers: helpers.generateIdentifiers(card),
      restrictions: helpers.getRestrictions(card),
    };
  });

fs.writeFile(
  "command-cards.json",
  JSON.stringify(commands),
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
