import {AppBar, Container, styled, Toolbar, Tooltip} from "@mui/material";
import {getFactionColor} from "@legion-hq/theme/themeUtils";
import {RankSummary} from "./RankSummary";
import {factions, legionModes} from "@legion-hq/constants";
import {ValidationBadge} from "./ValidationBadge";
import {ActivationBadge} from "./ActivationBadge";
import {Text} from "./ListBottomComponents";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {useListBuilder} from "@legion-hq/hooks/list/useList";

const Divider = styled("div")`
  width: 1px;
  height: 1.2em;
  margin: 0 0.6em;
  background-color: rgba(255, 255, 255, 0.5);
  opacity
`;

const Offset = styled("div")(({theme}) => theme.mixins.toolbar);

export function ListBottomBar() {
  const {validationIssues} = useListBuilder();
  const {faction, battleForce, mode, pointTotal, unitCounts, activations} =
    useCurrentList();

  const {name, longName} = factions[faction];

  return (
    <>
      <Offset />
      <AppBar
        component="div"
        position="fixed"
        sx={(theme) => ({
          top: "auto",
          bottom: 0,
          backgroundColor: getFactionColor({theme, faction}),
          // maxHeight: 56,
        })}
      >
        <Toolbar>
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
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
                <Tooltip
                  title={
                    <ul>
                      {validationIssues.map(({level, text}, index) => (
                        <li key={`${level}_${index}`}>{`(${level}) ${text}`}</li>
                      ))}
                    </ul>
                  }
                >
                  <div>
                    <ValidationBadge />
                  </div>
                </Tooltip>
                <Text>{legionModes[mode].name}</Text>
                <Divider />
                <Text>{pointTotal}</Text>
                <Text style={{opacity: "0.4"}}> / </Text>
                <Text sx={{opacity: "0.4"}}>{`${legionModes[mode].maxPoints}`}</Text>
              </div>
              <Divider />
              <ActivationBadge activations={activations} />
              <Divider />
              <RankSummary unitCounts={unitCounts} />
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
