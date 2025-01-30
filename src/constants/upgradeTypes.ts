import heavyWeapon from "@legion-hq/assets/upgradeTypes/heavy weapon.png";
import personnel from "@legion-hq/assets/upgradeTypes/personnel.png";
import force from "@legion-hq/assets/upgradeTypes/force.png";
import command from "@legion-hq/assets/upgradeTypes/command.png";
import hardpoint from "@legion-hq/assets/upgradeTypes/hardpoint.png";
import gear from "@legion-hq/assets/upgradeTypes/gear.png";
import grenades from "@legion-hq/assets/upgradeTypes/grenades.png";
import comms from "@legion-hq/assets/upgradeTypes/comms.png";
import pilot from "@legion-hq/assets/upgradeTypes/pilot.png";
import training from "@legion-hq/assets/upgradeTypes/training.png";
import generator from "@legion-hq/assets/upgradeTypes/generator.png";
import armament from "@legion-hq/assets/upgradeTypes/armament.png";
import crew from "@legion-hq/assets/upgradeTypes/crew.png";
import ordnance from "@legion-hq/assets/upgradeTypes/ordnance.png";
import programming from "@legion-hq/assets/upgradeTypes/protocol.png";
import heavyWeapon_webp from "@legion-hq/assets/upgradeTypes/heavy weapon.webp";
import personnel_webp from "@legion-hq/assets/upgradeTypes/personnel.webp";
import force_webp from "@legion-hq/assets/upgradeTypes/force.webp";
import command_webp from "@legion-hq/assets/upgradeTypes/command.webp";
import hardpoint_webp from "@legion-hq/assets/upgradeTypes/hardpoint.webp";
import gear_webp from "@legion-hq/assets/upgradeTypes/gear.webp";
import grenades_webp from "@legion-hq/assets/upgradeTypes/grenades.webp";
import comms_webp from "@legion-hq/assets/upgradeTypes/comms.webp";
import pilot_webp from "@legion-hq/assets/upgradeTypes/pilot.webp";
import training_webp from "@legion-hq/assets/upgradeTypes/training.webp";
import generator_webp from "@legion-hq/assets/upgradeTypes/generator.webp";
import armament_webp from "@legion-hq/assets/upgradeTypes/armament.webp";
import crew_webp from "@legion-hq/assets/upgradeTypes/crew.webp";
import ordnance_webp from "@legion-hq/assets/upgradeTypes/ordnance.webp";
import programming_webp from "@legion-hq/assets/upgradeTypes/protocol.webp";
import type {UpgradeType} from "@legion-hq/types";

const upgradeTypes: Record<UpgradeType, {name: string; icon: string; webp: string}> = {
  "heavy weapon": {
    name: "Heavy Weapon",
    icon: heavyWeapon,
    webp: heavyWeapon_webp,
  },
  personnel: {
    name: "Personnel",
    icon: personnel,
    webp: personnel_webp,
  },
  force: {
    name: "Force",
    icon: force,
    webp: force_webp,
  },
  command: {
    name: "Command",
    icon: command,
    webp: command_webp,
  },
  hardpoint: {
    name: "Hardpoint",
    icon: hardpoint,
    webp: hardpoint_webp,
  },
  gear: {
    name: "Gear",
    icon: gear,
    webp: gear_webp,
  },
  grenades: {
    name: "Grenades",
    icon: grenades,
    webp: grenades_webp,
  },
  comms: {
    name: "Comms",
    icon: comms,
    webp: comms_webp,
  },
  pilot: {
    name: "Pilot",
    icon: pilot,
    webp: pilot_webp,
  },
  training: {
    name: "Training",
    icon: training,
    webp: training_webp,
  },
  generator: {
    name: "Generator",
    icon: generator,
    webp: generator_webp,
  },
  armament: {
    name: "Armament",
    icon: armament,
    webp: armament_webp,
  },
  crew: {
    name: "Crew",
    icon: crew,
    webp: crew_webp,
  },
  ordnance: {
    name: "Ordnance",
    icon: ordnance,
    webp: ordnance_webp,
  },
  programming: {
    name: "Programming",
    icon: programming,
    webp: programming_webp,
  },
};

export default upgradeTypes;
