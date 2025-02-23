const fs = require("fs");

const cards = require("../src/data/2.5.3/cards.json");

const helpers = require("./convert-helpers.cjs");

const {isEmpty, before, after} = require("lodash");

let count = {};

let stats = {
  before: {},
  after: {},
};

function printAllRestrictions(restrictions, statistics = {}) {
  restrictions.forEach((restriction) => {
    if (Array.isArray(restriction)) {
      printAllRestrictions(restriction, statistics);
    } else if (restriction !== "NOT" && restriction !== "OR" && restriction !== "AND") {
      const k = Object.keys(restriction)[0];
      statistics[k] = statistics[k] ? statistics[k] + 1 : 1;
    }
  });
}

const uniqueCardNames = new Set();

function mapRestrictions(list) {
  return list.map((restriction) => {
    if (Array.isArray(restriction)) {
      return mapRestrictions(restriction);
    } else if (typeof restriction === "object") {
      {
        const key = Object.keys(restriction)[0];
        switch (key) {
          case "rank":
            return {unitRank: restriction[key]};
          case "light side":
          case "dark side":
            return {forceAlignment: key};
          case "cardName": {
            return {name: restriction[key]};
          }
          case "title": {
            return {subtitle: restriction[key]};
          }
          case "force": {
            return {upgrade: "force"};
          }
          case "cardSubtype": {
            return {unitType: restriction[key]};
          }
          case "subfaction": {
            return {affiliation: helpers.mapAffiliation({subfaction: restriction[key]})};
          }
          default:
            return restriction;
        }
      }
    }
    return restriction;
  });
}

function getRestrictions(card) {
  const n = `${card.requirements.length}`;
  count[n] = count[n] ? count[n] + 1 : 1;
  if (card.requirements?.length > 0) {
    printAllRestrictions(card.requirements, stats.before);
    const restrictions = mapRestrictions(card.requirements);
    printAllRestrictions(restrictions, stats.after);
    return restrictions;
  }
  return undefined;
}

function convertFlaws(data) {
  return Object.values(data)
    .filter(helpers.noCustomCards)
    .filter((card) => card.cardType === "flaw")
    .map((card) => {
      return {
        __typename: card.cardType,
        name: card.cardName,
        keywords: card.keywords && card.keywords.length > 0 ? card.keywords : undefined,
        identifiers: helpers.generateIdentifiers(card),
        imageRef: card.imageName,
        restrictions: helpers.getRestrictions(card),
      };
    });
}

function convertUpgrades(data) {
  return Object.values(data)
    .filter(helpers.noCustomCards)
    .filter((card) => card.cardType === "upgrade")
    .map((card) => ({
      ...card,
      faction: card.faction === "fringe" ? "mercenaries" : card.faction,
      subfaction: helpers.mapAffiliation(card),
    }))
    .map((card) => {
      // if (card.faction) console.log(card.cardName + " > " + card.faction);
      return {
        __typename: card.cardType,
        name: card.cardName,
        // subtitle: card.title,
        upgradeType: card.cardSubtype,
        points: card.cost,
        keywords: card.keywords && card.keywords.length > 0 ? card.keywords : undefined,
        isUnique: card.isUnique || undefined,
        imageRef: card.imageName,
        identifiers: helpers.generateIdentifiers(card),
        restrictions: getRestrictions(card),
        meta: card.faction
          ? {...(helpers.mapMetaData(card) ?? {}), faction: card.faction}
          : helpers.mapMetaData(card),
        history: card.history && card.history.length > 0 ? card.history : undefined,
      };
    });
}

module.exports = {convertFlaws, convertUpgrades};

// console.log("Restriction count:", count);

// console.log("Restriction stats:", stats);

// console.log("Unique card names:", uniqueCardNames);

// fs.writeFile(
//   "upgrade-cards.json",
//   JSON.stringify([...convertFlaws, ...convertUpgrades(cards)]),
//   {
//     encoding: "utf8",
//     flag: "w",
//     mode: 0o666,
//   },
//   (err) => {
//     // Checking for errors
//     if (err) throw err;

//     // Success
//     console.log(`Done writing file!`);
//   },
// );

// console.log("Restriction stats:", stats);
