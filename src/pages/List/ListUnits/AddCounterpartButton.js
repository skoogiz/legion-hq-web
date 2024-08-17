import React from "react";
import {IconButton, Icon, Avatar} from "@mui/material";
import urls from "@legion-hq/constants/urls";
import {useCards} from "@legion-hq/data-access/hooks/useCards";

function AddCounterpartButton({counterpartId, handleClick}) {
  const {cards} = useCards();
  const {cardName, imageName} = cards[counterpartId];
  const size = 32;
  return (
    <IconButton size="small" style={{marginBottom: 4}} onClick={handleClick}>
      <Icon style={{height: size, width: size}}>
        <Avatar
          alt={cardName}
          src={`${urls.cdn}/counterpartIcons/${imageName}`}
          style={{height: size, width: size}}
        />
      </Icon>
    </IconButton>
  );
}

export default AddCounterpartButton;
