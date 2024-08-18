import React from "react";
import {Typography} from "@mui/material";

function UnitPoints({unit, variant = "body1"}) {
  let {totalUnitCost} = unit;
  return (
    <Typography variant={variant}>
      {unit.count > 1 && `(${totalUnitCost / unit.count}) `}
      {totalUnitCost}
    </Typography>
  );
}

export default UnitPoints;
