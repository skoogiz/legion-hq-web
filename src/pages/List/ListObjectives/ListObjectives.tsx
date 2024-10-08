import {Chip, ThemeProvider, createTheme} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {BATTLE} from "@legion-hq/state/list";

const chipSize = "medium";

function ListObjectives() {
  const {setCardPaneFilter, handleRemoveBattle, handleCardZoom} = useListBuilder();

  const {objectiveCards, deploymentCards, conditionCards} = useCurrentList();

  const {cards} = useCards();
  const chipStyle = {marginRight: 4, marginBottom: 4};
  const objectiveTheme = createTheme({
    palette: {primary: {main: "#274c82"}},
  });
  const deploymentTheme = createTheme({
    palette: {primary: {main: "#38643A"}},
  });
  const conditionTheme = createTheme({
    palette: {primary: {main: "#963233"}},
  });
  const objectives = objectiveCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle("objective", i)}
    />
  ));
  const deployments = deploymentCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle("deployment", i)}
    />
  ));
  const conditions = conditionCards.map((id, i) => (
    <Chip
      color="primary"
      key={id}
      label={cards[id].cardName}
      style={chipStyle}
      onClick={() => handleCardZoom(id)}
      onDelete={() => handleRemoveBattle("condition", i)}
    />
  ));
  return (
    <div
      id="list-objectives"
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
      }}
    >
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
        <ThemeProvider theme={objectiveTheme}>
          {objectives.length < 4 && (
            <Chip
              clickable
              size={chipSize}
              color="primary"
              label="Objective"
              icon={<AddIcon />}
              style={{marginBottom: 4, marginRight: 4}}
              onClick={() =>
                setCardPaneFilter({
                  action: BATTLE,
                  type: "objective",
                })
              }
            />
          )}
          {objectives}
        </ThemeProvider>
      </div>
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
        <ThemeProvider theme={conditionTheme}>
          {deployments.length < 4 && (
            <Chip
              clickable
              size={chipSize}
              color="primary"
              label="Deployment"
              icon={<AddIcon />}
              style={{marginBottom: 4, marginRight: 4}}
              onClick={() =>
                setCardPaneFilter({
                  action: BATTLE,
                  type: "deployment",
                })
              }
            />
          )}
          {deployments}
        </ThemeProvider>
      </div>
      <div style={{display: "flex", flexFlow: "row wrap", justifyContent: "center"}}>
        <ThemeProvider theme={deploymentTheme}>
          {conditions.length < 4 && (
            <Chip
              clickable
              size={chipSize}
              color="primary"
              label="Condition"
              icon={<AddIcon />}
              style={{marginBottom: 4, marginRight: 4}}
              onClick={() =>
                setCardPaneFilter({
                  action: BATTLE,
                  type: "condition",
                })
              }
            />
          )}
          {conditions}
        </ThemeProvider>
      </div>
    </div>
  );
}

export default ListObjectives;
