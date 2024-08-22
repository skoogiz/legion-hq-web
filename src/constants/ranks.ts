import commander from "@legion-hq/assets/rankTypes/commander.png";
import operative from "@legion-hq/assets/rankTypes/operative.png";
import corps from "@legion-hq/assets/rankTypes/corps.png";
import special from "@legion-hq/assets/rankTypes/special.png";
import support from "@legion-hq/assets/rankTypes/support.png";
import heavy from "@legion-hq/assets/rankTypes/heavy.png";
import commanderSymbol from "@legion-hq/assets/rankTypes/commander2.png";
import operativeSymbol from "@legion-hq/assets/rankTypes/operative2.png";
import corpsSymbol from "@legion-hq/assets/rankTypes/corps2.png";
import specialSymbol from "@legion-hq/assets/rankTypes/special2.png";
import supportSymbol from "@legion-hq/assets/rankTypes/support2.png";
import heavySymbol from "@legion-hq/assets/rankTypes/heavy2.png";
import type {Rank, RankType} from "@legion-hq/types";

const ranks: Record<RankType, Rank> = {
  commander: {
    name: "Commander",
    title: "Add a Commander unit.",
    icon: commander,
    symbol: commanderSymbol,
  },
  operative: {
    name: "Operative",
    title: "Add a Operative unit.",
    icon: operative,
    symbol: operativeSymbol,
  },
  corps: {
    name: "Corps",
    title: "Add a Corps unit.",
    icon: corps,
    symbol: corpsSymbol,
  },
  special: {
    name: "Special Forces",
    title: "Add a Special Forces unit.",
    icon: special,
    symbol: specialSymbol,
  },
  support: {
    name: "Support",
    title: "Add a Support unit.",
    icon: support,
    symbol: supportSymbol,
  },
  heavy: {
    name: "Heavy",
    title: "Add a Heavy unit.",
    icon: heavy,
    symbol: heavySymbol,
  },
};

export default ranks;
