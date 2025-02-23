const fs = require("fs");

const helpers = require("./convert-helpers.cjs");

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

function convertBattles(data) {
  return Object.values(data)
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
}

function convertCommands(data) {
  return Object.values(data)
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
}

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

function mapFactions(card) {
  return {
    ...card,
    faction: card.faction === "fringe" ? "mercenaries" : card.faction,
    subfaction: helpers.mapAffiliation(card),
  };
}

function mapUnit(card) {
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
}

function convertUnits(data) {
  return Object.values(data)
    .filter(helpers.noCustomCards)
    .filter((card) => card.cardType === "unit")
    .map(mapFactions)
    .map(mapUnit);
}

function convertCounterparts(data) {
  return Object.values(data)
    .filter(helpers.noCustomCards)
    .filter((card) => card.cardType === "counterpart")
    .map(mapFactions)
    .map(mapUnit);
}

module.exports = {
  convertFlaws,
  convertUpgrades,
  convertBattles,
  convertCommands,
  convertUnits,
  convertCounterparts,
};
