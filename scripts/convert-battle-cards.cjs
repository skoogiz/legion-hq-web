const fs = require("fs");

const helpers = require("./convert-helpers.cjs");

const cards = require("../src/data/2.5.3/cards.json");

const {isEmpty} = require("lodash");

const battleCards = Object.values(cards)
  .filter(helpers.noCustomCards)
  .filter((card) => card.cardType === "battle")
  .map((card) => {
    const keywords = (card.keywords ?? []).filter((keyword) => keyword !== "Skirmish");
    return {
      __typename: card.cardType,
      name: card.title ?? card.cardName,
      category: card.cardSubtype,
      keywords: keywords.length > 0 ? keywords : undefined,
      imageRef: card.imageName,
      identifiers: helpers.generateIdentifiers(card),
      legalities: {
        standard: !helpers.isSkirmishCard(card) ? true : undefined,
        skirmish: helpers.isSkirmishCard(card) ? true : undefined,
      },
    };
  });

fs.writeFile(
  "battle-cards.json",
  JSON.stringify(battleCards),
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
