import urls from "@legion-hq/constants/urls";
import {ListTemplate} from "@legion-hq/types";

function generateLink(list: ListTemplate) {
  const urlStrings = [];
  list.units.forEach((unit) => {
    let urlString = `${unit.count}${unit.unitId}`;
    unit.upgradesEquipped.forEach((upgradeId) => {
      urlString += upgradeId ? upgradeId : "0";
    });
    if (unit.loadoutUpgrades && unit.loadoutUpgrades.length > 0) {
      urlString += "_";
      unit.loadoutUpgrades.forEach((upgradeId) => {
        urlString += upgradeId ? `${upgradeId}` : "0";
      });
    }
    if (unit.counterpart) {
      const {counterpart} = unit;
      urlString += `+1${counterpart.counterpartId}`;
      counterpart.upgradesEquipped.forEach((upgradeId) => {
        urlString += upgradeId ? upgradeId : "0";
      });
      if (counterpart.loadoutUpgrades && counterpart.loadoutUpgrades.length > 0) {
        urlString += "_";
        counterpart.loadoutUpgrades.forEach((upgradeId) => {
          urlString += upgradeId ? upgradeId : "0";
        });
      }
    }
    urlStrings.push(urlString);
  });
  list.commandCards.forEach((commandId) => urlStrings.push(commandId));

  if (list.commandCards.length < 6) {
    for (let i = 0; i < 6 - list.commandCards.length; i++) {
      urlStrings.push("");
    }
  }
  if (list.contingencies)
    list.contingencies.forEach((commandId) => urlStrings.push(commandId));
  list.objectiveCards.forEach((objectiveId) => urlStrings.push(objectiveId));
  list.deploymentCards.forEach((deploymentId) => urlStrings.push(deploymentId));
  list.conditionCards.forEach((conditionId) => urlStrings.push(conditionId));
  if (list.battleForce) {
    let bf = "ebd";
    if (list.battleForce === "Echo Base Defenders") bf = "ebd";
    else if (list.battleForce === "Blizzard Force") bf = "bf";
    else if (list.battleForce === "501st Legion") bf = "5l";
    else if (list.battleForce === "Separatist Invasion") bf = "si";
    else if (list.battleForce === "Shadow Collective") bf = "sc";
    else if (list.battleForce === "Bright Tree Village") bf = "btv";
    else if (list.battleForce === "Tempest Force") bf = "tf";
    else if (list.battleForce === "Imperial Remnant") bf = "ir";

    return `${urls.listPath}/${list.faction}/${bf}:${urlStrings.join(",")}`;
  }
  return `${urls.listPath}/${list.faction}/${urlStrings.join(",")}`;
}

export default generateLink;
