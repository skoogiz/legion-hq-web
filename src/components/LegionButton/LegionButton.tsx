import {factions} from "@legion-hq/constants";
import {colorName} from "@legion-hq/theme/themeUtils";
import {FactionType} from "@legion-hq/types";
import {alpha, css, PaletteColor, styled, useTheme} from "@mui/material";

const name = "LegionButton";

const slanting = (posetive = false) => css`
  position: absolute;
  z-index: -1;
  content: "";
  right: -10%;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: inherit;
  -webkit-transform: skewX(${posetive ? "" : "-"}30deg);
  -moz-transform: skewX(${posetive ? "" : "-"}30deg);
  -ms-transform: skewX(${posetive ? "" : "-"}30deg);
  transform: skewX(${posetive ? "" : "-"}30deg);
`;

const TopSlant = styled("div")`
  position: relative;
  height: 6px;
  width: 60%;
  z-index: -1;

  &:after {
    ${slanting(true)}
  }
`;

const Label = styled("div")`
  position: relative;
  padding: 4px 8px 4px 36px;
  text-align: left;
  white-space: nowrap;

  &:after {
    ${slanting()}
  }
`;

const BottomSlant = styled("div")`
  position: relative;
  height: 6px;
  width: 80%;
  z-index: -1;

  &:after {
    ${slanting()}
  }
`;

const Button = styled("button")<{paletteColor: PaletteColor; fullWidth: boolean}>`
  background: none;
  color: ${alpha("#FFF", 0.9)};
  border: none;
  padding: 0;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  height: 56px;

  position: relative;
  display: flex;
  align-items: center;
  padding-right: 28px;

  ${({fullWidth}) =>
    fullWidth &&
    css`
      width: 100%;
    `};

  .${name}-label {
    background-color: ${({paletteColor}) => paletteColor.main};
  }

  &:hover {
    color: #fff;
  }

  &:hover .${name}-label {
    color: ${alpha("#FFF", 1)});
    filter: brightness(80%);
  }
`;

type Props = Omit<React.ComponentProps<"button">, "children"> & {
  faction?: FactionType;
  fullWidth?: boolean;
};

export function LegionButton({faction = "rebels", fullWidth = false, ...props}: Props) {
  const {palette} = useTheme();
  const color = palette[colorName(faction) ?? "rebels"];
  return (
    <Button paletteColor={color} fullWidth={fullWidth} {...props}>
      <div
        className={name}
        style={{
          position: "absolute",
          backgroundColor: color.dark,
          height: 56,
          width: 56,
          borderRadius: "999px",
          padding: 4,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div
          className={name}
          style={{
            boxSizing: "border-box",
            borderRadius: "999px",
            border: `2px solid ${color.light}`,
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            alt={faction}
            src={factions[faction].icon.dark}
            style={{height: "1em", width: "1em", fontSize: 30, opacity: 0.5}}
          />
        </div>
      </div>
      <div style={{flexGrow: 1, marginLeft: 28}}>
        <TopSlant
          className={name}
          style={{
            backgroundColor: color.light,
          }}
        />
        <Label
          className={`${name}-label`}
          //   style={{
          //     backgroundColor: color.main,
          //   }}
        >
          {factions[faction].name}
        </Label>
        <BottomSlant
          className={name}
          style={{
            backgroundColor: color.light,
          }}
        />
      </div>
    </Button>
  );
}

// "#e860b4"

// "#f9bfe3"

// "#b93988"
