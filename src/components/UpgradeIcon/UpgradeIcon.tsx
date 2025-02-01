import {UpgradeType} from "@legion-hq/types";
import upgradeTypes from "@legion-hq/constants/upgradeTypes";
import {useTheme} from "@mui/material";

type IconSize = "small" | "medium" | "large" | "inherit";

type Props = {
  type: UpgradeType;
  size?: IconSize;
};

const getFontSize = (size?: IconSize) => {
  switch (size) {
    case "small":
      return "20px";
    case "large":
      return "40px";
    case "inherit":
      return "inherit";
    default:
      return "32px";
  }
};

export function UpgradeIcon({type, size}: Props) {
  const isDarkTheme = useTheme().palette.mode === "dark";
  return (
    <picture>
      <source srcSet={upgradeTypes[type].webp} type="image/webp" />
      <source srcSet={upgradeTypes[type].icon} type="image/png" />
      <img
        src={upgradeTypes[type].icon}
        alt={type}
        style={{
          fontSize: getFontSize(size),
          height: "1em",
          width: "1em",
          filter: isDarkTheme ? "invert(1)" : undefined,
        }}
      />
    </picture>
  );
}
