const fs = require("fs");

const cards = require("../src/data/2.5.3/cards.json");

const {isEmpty} = require("lodash");

function noCustomCards(card) {
  return !card.metaData?.isCustomCard;
}

function isSkirmishCard(card) {
  return card.keywords && card.keywords.includes("Skirmish");
}

function getFullName(card) {
  switch (card.cardType) {
    case "unit":
    case "counterpart":
      return card.title ? `${card.cardName}: ${card.title}` : card.cardName;
    case "battle":
      return isSkirmishCard(card) ? `${card.cardName} (Skirmish)` : card.cardName;
    default:
      return card.cardName;
  }
}

function getRestrictions(card) {
  if (
    card.cardType === "command" &&
    (card.faction || card.battleForce || card.commander)
  ) {
    if (card.faction === "mercenaries" || card.commander === "Maul") {
      return [
        {
          affiliation: "Maul Loyalists",
        },
        card.commander ? {commander: card.commander} : undefined,
      ];
    }

    const restrictions = {
      faction: card.faction ? card.faction : undefined,
      battleForce: card.battleForce ? card.battleForce : undefined,
      commander: card.commander ? card.commander : undefined,
    };

    return Object.keys(restrictions).reduce((acc, key) => {
      if (restrictions[key]) {
        acc.push({[key]: restrictions[key]});
      }
      return acc;
    }, []);
  }
  if (card.cardType === "flaw" && card.commander) {
    return {
      commander: card.commander,
    };
  }
  return undefined;
}

function getTNI(card) {
  switch (card.cardType) {
    case "unit":
    case "counterpart":
      return `${card.cardType}|${getFullName(card)}|${card.faction}`;
    case "battle":
      return `${card.cardSubtype}|${getFullName(card)}`;
    case "command":
      return `${card.cardType}|${card.cardSubtype}|${getFullName(card)}`;
    default:
      return `${card.cardType}|${getFullName(card)}`;
  }
}

function generateIdentifiers(card) {
  return {
    name: getFullName(card),
    legionhqId: card.id,
    tni: getTNI(card),
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function trimThe(name) {
  return name.toLowerCase().startsWith("the ") ? name.slice(4) : name;
}

function mapMetaData(card) {
  let metaData = {
    prevCost: card.prevCost,
    prevCost: card.prevCost,

    displayName: card.displayName,
    mercernary:
      card.affiliations && card.affiliations.length > 0 ? card.affiliations : undefined,
    contingencies: card.contingencies,
    entourage: card.entourage,
    detachment: card.detachment
      ? generateIdentifiers(cards[card.detachment]).uname
      : undefined,
    counterpartId: card.counterpartId
      ? generateIdentifiers(cards[card.counterpartId]).uname
      : undefined,
    flaw: card.flaw ? cards[card.flaw]?.cardName : undefined,
    flexResponses: card.flexResponses,
    equip:
      card.equip && card.equip.length > 0
        ? card.equip.map((id) => cards[id].cardName)
        : undefined,
    specialIssue: card.specialIssue,
    additionalUpgradeSlots: card.additionalUpgradeSlots,
  };

  const meta = Object.keys(metaData).reduce((acc, key) => {
    if (metaData[key] !== undefined) {
      acc[key] = metaData[key];
    }
    return acc;
  }, {});

  return !isEmpty(meta) ? meta : undefined;
}

function mapAffiliation({subfaction}) {
  if (!subfaction) return undefined;
  switch (subfaction) {
    case "shadow collective":
      return "Maul Loyalists";
    case "bounty hunters":
      return "Rogues";
    case "pyke syndicate":
      return "The Pyke Syndicate";
    case "black sun":
      return "Black Sun";
    default:
      return subfaction.charAt(0).toUpperCase() + subfaction.slice(1);
  }
}

module.exports = {
  noCustomCards,
  isSkirmishCard,
  getFullName,
  getRestrictions,
  getTNI,
  generateIdentifiers,
  hashString,
  trimThe,
  mapMetaData,
  mapAffiliation,
};
