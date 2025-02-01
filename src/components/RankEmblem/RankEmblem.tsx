import ranks from "@legion-hq/constants/ranks";
import {colorName} from "@legion-hq/theme/themeUtils";
import {FactionType, RankType} from "@legion-hq/types";
import {styled, useTheme} from "@mui/material";

const name = "Rank";

const Symbol = styled("img")<{rank: RankType}>`
  fontsize: 56px;
  height: ${({rank}) => {
    switch (rank) {
      case "special":
        return "0.7em";
      case "corps":
        return "0.8em";
      case "support":
      case "operative":
        return "1em";
      case "heavy":
      default:
        return "0.9em";
    }
  }};
  filter: invert(1);
  opacity: 0.5;
`;

type Props = {
  rank: RankType;
  faction?: FactionType;
};

export function RankEmblem({rank, faction = "fringe"}: Props) {
  const {palette} = useTheme();
  const color = palette[colorName(faction) ?? "rebels"];
  return (
    <div
      className={name}
      style={{
        // position: "absolute",
        backgroundColor: color.dark,
        height: 48,
        width: 48,
        borderRadius: "999px",
        padding: 4,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        // zIndex: 1,
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
        <Symbol rank={rank} src={ranks[rank].symbol} alt={rank} />
      </div>
    </div>
  );
}
