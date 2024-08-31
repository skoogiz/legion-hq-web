import {Container, styled} from "@mui/material";
import {useList} from "@legion-hq/hooks/list/useList";
import {colorName} from "@legion-hq/theme/themeUtils";
import {FactionType} from "@legion-hq/types";
import {RankSummary} from "./RankSummary";
import {factions, legionModes} from "@legion-hq/constants";
import {ValidationBadge} from "./ValidationBadge";
import {ActivationBadge} from "./ActivationBadge";
import {Text} from "./ListBottomComponents";

const Divider = styled("div")`
  width: 1px;
  height: 1.2em;
  margin: 0 0.6em;
  background-color: rgba(255, 255, 255, 0.5);
  opacity
`;

const BottomBar = styled("div")<{faction: FactionType}>`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${({faction, theme}) => {
    const color = colorName(faction);
    return color ? theme.palette[color].main : "hotpink";
  }};
  padding: 0.8em 0;
  width: 100%;
  z-index: 2;
`;

export function ListBottomBar() {
  const {currentList} = useList();

  const {faction, battleForce} = currentList;

  const {name, longName} = factions[faction];

  return (
    <BottomBar faction={faction}>
      <Container
        maxWidth="xl"
        sx={{
          padding: "0 16px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          columnGap: "1rem",
          alignItems: "center",
          fontSize: "14px;",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "0.8em",
          }}
        >
          <img
            alt={faction}
            src={factions[faction].icon.dark}
            style={{height: "2.2em", width: "2.2em"}}
          />
          {battleForce ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text sx={{fontSize: "0.85em", fontWeight: 500, opacity: 0.6}}>
                {faction === "fringe" ? "Mercenaries" : name}:
              </Text>
              <Text>{battleForce}</Text>
            </div>
          ) : (
            <Text>{longName}</Text>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: "0.6em",
          }}
        >
          {/* <Typography>{`${currentList.pointTotal}/${legionModes[currentList.mode].maxPoints}`}</Typography> */}
        </div>
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "0.2em",
            }}
          >
            <ValidationBadge />
            <Text>{legionModes[currentList.mode].name}</Text>
            <Divider />
            <Text>{currentList.pointTotal}</Text>
            <Text style={{opacity: "0.4"}}> / </Text>
            <Text
              sx={{opacity: "0.4"}}
            >{`${legionModes[currentList.mode].maxPoints}`}</Text>
          </div>
          <Divider />
          <ActivationBadge />
          <Divider />
          <RankSummary />
        </div>
      </Container>
    </BottomBar>
  );
}
