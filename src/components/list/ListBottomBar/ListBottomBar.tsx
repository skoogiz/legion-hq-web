import {styled, Typography} from "@mui/material";
import {useList} from "@legion-hq/hooks/list/useList";
import {colorName} from "@legion-hq/theme/themeUtils";
import {FactionType} from "@legion-hq/types";
import {RankSummary} from "./RankSummary";
import {factions, legionModes} from "@legion-hq/constants";

const BottomBar = styled("div")<{faction: FactionType}>`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${({faction, theme}) => {
    const color = colorName(faction);
    return color ? theme.palette[color].main : "hotpink";
  }};
  padding: 1.2em 0;
  width: 100%;
  z-index: 2;
`;

const Container = styled("div")`
  padding: 0 16px;
  margin: 0 auto;
  width: 100%;

  display: flex;
  column-gap: 1rem;
  align-items: center;

  ${({theme}) => ({
    [theme.breakpoints.up("sm")]: {
      maxWidth: "528px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "840px",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1140px",
    },
    [theme.breakpoints.up("xl")]: {
      maxWidth: "1440px",
    },
  })};
`;

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

export function ListBottomBar() {
  const {currentList} = useList();

  const {faction} = currentList;

  return (
    <BottomBar faction={faction}>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "0.5em",
          }}
        >
          <img
            alt={faction}
            src={factions[faction].icon.dark}
            style={{height: "2em", width: "2em"}}
          />
          <Typography>{factions[faction].longName}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>{legionModes[currentList.mode].name}</Typography>
          <Typography>{`${currentList.pointTotal} / ${legionModes[currentList.mode].maxPoints}`}</Typography>
          {/* currentMode={currentList.mode}
          points={currentList.pointTotal}
          maxPoints={legionModes[currentList.mode].maxPoints} */}
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <RankSummary />
        </div>
        {/* <div>
          <Symbol rank="commander" src={ranks.commander.symbol} />
          <Symbol rank="operative" src={ranks.operative.symbol} />
          <Symbol rank="corps" src={ranks.corps.symbol} />
          <Symbol rank="special" src={ranks.special.symbol} />
          <Symbol rank="support" src={ranks.support.symbol} />
          <Symbol rank="heavy" src={ranks.heavy.symbol} />
        </div> */}
      </Container>
    </BottomBar>
  );
}
