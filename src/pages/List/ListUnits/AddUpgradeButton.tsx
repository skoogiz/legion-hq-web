import React from "react";
import {IconButton, Icon, Avatar} from "@mui/material";
import upgradeTypes from "@legion-hq/constants/upgradeTypes";

function AddUpgradeButton({type, handleClick}) {
  const size = 32;
  return (
    <IconButton size="small" style={{marginBottom: 4}} onClick={handleClick}>
      <Icon style={{height: size, width: size}}>
        <Avatar
          alt={type}
          src={upgradeTypes[type].icon}
          style={{height: size, width: size}}
        />
      </Icon>
    </IconButton>
  );
}

export default AddUpgradeButton;
