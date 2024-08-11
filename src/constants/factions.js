import rebelsWhite from "@legion-hq/assets/factions/rebelsWhite.svg";
import rebelsBlack from "@legion-hq/assets/factions/rebelsBlack.svg";
import empireWhite from "@legion-hq/assets/factions/empireWhite.svg";
import empireBlack from "@legion-hq/assets/factions/empireBlack.svg";
import republicWhite from "@legion-hq/assets/factions/republicWhite.svg";
import republicBlack from "@legion-hq/assets/factions/republicBlack.svg";
import separatistsWhite from "@legion-hq/assets/factions/separatistsWhite.svg";
import separatistsBlack from "@legion-hq/assets/factions/separatistsBlack.svg";
import fringeWhite from "@legion-hq/assets/factions/fringeWhite.svg";
import fringeBlack from "@legion-hq/assets/factions/fringeBlack.svg";

const factions = {
  rebels: {
    name: "Rebels",
    singular: "Rebel",
    longName: "Rebel Alliance",
    primaryColor: "#a91515",
    secondaryColor: "#b74f2c",
    tertiaryColor: "#b71c1c",
    icon: {
      dark: rebelsWhite,
      light: rebelsBlack,
    },
  },
  empire: {
    name: "Empire",
    singular: "Empire",
    longName: "Galactic Empire",
    primaryColor: "#6b6b6b",
    secondaryColor: "#a5a5a5",
    tertiaryColor: "#555555",
    icon: {
      dark: empireWhite,
      light: empireBlack,
    },
  },
  republic: {
    name: "Republic",
    singular: "Republic",
    longName: "Grand Army of the Republic",
    primaryColor: "#c49d36",
    secondaryColor: "#970897",
    tertiaryColor: "#97084f",
    icon: {
      dark: republicWhite,
      light: republicBlack,
    },
  },
  separatists: {
    name: "Separatists",
    singular: "Separatist",
    longName: "Separatist Alliance",
    forceAffinity: "dark side",
    primaryColor: "#081a6e",
    secondaryColor: "#56609d",
    tertiaryColor: "#3f51b6",
    icon: {
      dark: separatistsWhite,
      light: separatistsBlack,
    },
  },
  fringe: {
    name: "Shadow Collective",
    singular: "Shadow Collective",
    longName: "Shadow Collective",
    forceAffinity: "dark side",
    primaryColor: "#7b272e",
    secondaryColor: "#030303",
    tertiaryColor: "#eeeeee",
    icon: {
      dark: fringeWhite,
      light: fringeBlack,
    },
  },
};

export default factions;
