import React from "react";
import {Img} from "react-image";

import {Chip} from "@mui/material";
import symbols from "@legion-hq/constants/symbols";

function DefenseChip({size, color}) {
  if (!color)
    return <Chip size={size} label="Error" style={{marginRight: 4, marginBottom: 4}} />;
  const label = (
    <Img
      alt={`${color} defense`}
      src={symbols.defense[color]}
      style={{height: 18, width: "auto", marginTop: 5}}
    />
  );
  return <Chip size={size} label={label} style={{marginRight: 4, marginBottom: 4}} />;
}

export default DefenseChip;
