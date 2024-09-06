import {Grid, Chip} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";
import {CardIcon} from "@legion-hq/components";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {CONTINGENCY} from "@legion-hq/state/list";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {useListBuilder} from "@legion-hq/hooks/list/useList";

const chipSize = "medium";

export function ListContingencies() {
  const {setCardPaneFilter, handleCardZoom, handleRemoveContingency} = useListBuilder();
  const {units, contingencies = []} = useCurrentList();
  const {cards} = useCards();
  const getNumPips = (cardId: string) => {
    const card = cards[cardId];
    if (card.cardSubtype === "1") return "•";
    else if (card.cardSubtype === "2") return "••";
    else if (card.cardSubtype === "3") return "•••";
  };
  let numContingencies = 0;
  units.forEach((unit) => {
    const unitCard = cards[unit.unitId];
    if (unitCard.contingencies && unitCard.contingencies > 0)
      numContingencies += unitCard.contingencies;
  });
  if (numContingencies === 0) return null;
  const chipStyle = {marginRight: 4, marginBottom: 4};
  return (
    <Grid container id="list-contingencies" direction="row" justifyContent="center">
      <Grid item>
        {contingencies.length < numContingencies && (
          <Chip
            size={chipSize}
            label="Contingency"
            icon={<AddIcon />}
            style={chipStyle}
            onClick={() => setCardPaneFilter({action: CONTINGENCY})}
          />
        )}
      </Grid>
      {contingencies.map((cardId, contingencyIndex) => (
        <Grid item key={cardId}>
          <Chip
            label={`${getNumPips(cardId)} ${cards[cardId].cardName}`}
            avatar={
              <CardIcon
                size="small"
                cardType="command"
                // card={cards[cardId]}
                imageName={cards[cardId].imageName}
                handleClick={() => handleCardZoom(cardId)}
              />
            }
            style={chipStyle}
            onDelete={() => handleRemoveContingency(contingencyIndex)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
