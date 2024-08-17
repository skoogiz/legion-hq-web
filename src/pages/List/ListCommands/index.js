import React, {useContext} from "react";
import {Grid, Chip} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";
import ListContext from "@legion-hq/context/ListContext";
import {CardIcon} from "@legion-hq/components";
import {useCards} from "@legion-hq/data-access/hooks/useCards";

const chipSize = "medium";

function ListCommands() {
  const {currentList, setCardPaneFilter, handleCardZoom, handleRemoveCommand} =
    useContext(ListContext);
  const {cards} = useCards();
  const getNumPips = (cardId) => {
    const card = cards[cardId];
    if (card.cardSubtype === "1") return "•";
    else if (card.cardSubtype === "2") return "••";
    else if (card.cardSubtype === "3") return "•••";
  };
  const chipStyle = {marginRight: 4, marginBottom: 4};
  return (
    <Grid container id="list-commands" direction="row" justifyContent="center">
      {currentList.commandCards.length < 6 && (
        <Grid item>
          <Chip
            size={chipSize}
            label="Command"
            icon={<AddIcon />}
            style={chipStyle}
            onClick={() => setCardPaneFilter({action: "COMMAND"})}
          />
        </Grid>
      )}
      {currentList.commandCards.map((cardId, commandIndex) => (
        <Grid item key={cardId}>
          <Chip
            label={`${getNumPips(cardId)} ${cards[cardId].cardName}`}
            avatar={
              <CardIcon
                size="small"
                cardType="command"
                card={cards[cardId]}
                imageName={cards[cardId].imageName}
                handleClick={() => handleCardZoom(cardId)}
              />
            }
            style={chipStyle}
            onDelete={() => handleRemoveCommand(commandIndex)}
          />
        </Grid>
      ))}
      <Grid item>
        <Chip
          label="•••• Standing Orders"
          avatar={
            <CardIcon
              size="small"
              cardType="command"
              imageName="Standing Orders.jpeg"
              card={cards["aa"]}
              handleClick={() => handleCardZoom("aa")}
            />
          }
          style={chipStyle}
        />
      </Grid>
    </Grid>
  );
}

export default ListCommands;
