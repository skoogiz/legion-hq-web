import {Chip, Typography} from "@mui/material";
import {DirectionsRun as SpeedIcon} from "@mui/icons-material";
import {ChipProps} from "./CardChip.types";

interface Props extends ChipProps {
  speed: number;
}

export function SpeedChip({size, speed}: Props) {
  const label = speed < 4 && speed > -1 ? speed : "Error";
  return (
    <Chip
      size={size}
      label={<Typography>{label}</Typography>}
      icon={<SpeedIcon style={{color: "#e4427f"}} />}
      style={{marginRight: 4, marginBottom: 4}}
    />
  );
}
