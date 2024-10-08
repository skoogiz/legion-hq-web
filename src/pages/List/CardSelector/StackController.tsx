import * as React from "react";
import {Typography, IconButton} from "@mui/material";
import {Add as AddIcon, Remove as MinusIcon} from "@mui/icons-material";

type Props = {
  stackSize: number;
  handleIncrementStackSize: () => void;
  handleDecrementStackSize: () => void;
};

export function StackController({
  stackSize,
  handleIncrementStackSize,
  handleDecrementStackSize,
}: Props) {
  const rowContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  };
  const rowItemStyle = {marginRight: 4};
  return (
    <div style={rowContainerStyle}>
      <Typography style={rowItemStyle}>Quantity:</Typography>
      <IconButton
        disabled={stackSize === 1}
        style={rowItemStyle}
        onClick={handleDecrementStackSize}
      >
        <MinusIcon />
      </IconButton>
      <Typography variant="h6" style={rowItemStyle}>
        {stackSize}
      </Typography>
      <IconButton
        disabled={stackSize === 12}
        style={rowItemStyle}
        onClick={handleIncrementStackSize}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
}
