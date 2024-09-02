import ranks from "@legion-hq/constants/ranks";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {UnitCount, type RankType} from "@legion-hq/types";
import {styled} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import {Text} from "./ListBottomComponents";

const Symbol = styled("img")<{rank: RankType}>`
  font-size: inherit;
  height: ${({rank}) => {
    switch (rank) {
      case "special":
        return "0.7em";
      case "corps":
      case "support":
      case "heavy":
        return "0.8em";
      default:
        return "0.9em";
    }
  }};
  filter: invert(1);
  opacity: 0.4;
`;

type Props = {
  unitCounts: UnitCount;
};

export function RankSummary({unitCounts}: Props) {
  const {rankLimits} = useListBuilder();
  return (
    <div style={{display: "flex", alignItems: "center", columnGap: "0.6em"}}>
      {Object.keys(ranks).map((key) => {
        const rank = key as RankType;
        return (
          <div
            key={rank}
            style={{display: "flex", alignItems: "baseline", columnGap: "0.2em"}}
          >
            <Symbol rank={rank} src={ranks[rank].symbol} alt={rank} />
            <Text
              sx={{
                color:
                  unitCounts[rank] > rankLimits[rank][1] ||
                  unitCounts[rank] < rankLimits[rank][0]
                    ? deepOrange[300]
                    : undefined,
              }}
            >
              {unitCounts[rank]}
            </Text>
          </div>
        );
      })}
    </div>
  );
}
