import commander from "@legion-hq/assets/rankTypes/commander.png";
import operative from "@legion-hq/assets/rankTypes/operative.png";
import corps from "@legion-hq/assets/rankTypes/corps.png";
import special from "@legion-hq/assets/rankTypes/special.png";
import support from "@legion-hq/assets/rankTypes/support.png";
import heavy from "@legion-hq/assets/rankTypes/heavy.png";

const ranks = {
  commander: {
    name: "Commander",
    title: "Add a Commander unit.",
    icon: commander,
  },
  operative: {
    name: "Operative",
    title: "Add a Operative unit.",
    icon: operative,
  },
  corps: {
    name: "Corps",
    title: "Add a Corps unit.",
    icon: corps,
  },
  special: {
    name: "Special Forces",
    title: "Add a Special Forces unit.",
    icon: special,
  },
  support: {
    name: "Support",
    title: "Add a Support unit.",
    icon: support,
  },
  heavy: {
    name: "Heavy",
    title: "Add a Heavy unit.",
    icon: heavy,
  },
};

export default ranks;
