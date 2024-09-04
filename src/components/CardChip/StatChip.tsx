import {Img} from "react-image";
import {Chip, Typography} from "@mui/material";
import symbols from "@legion-hq/constants/symbols";
import {ChipProps, StatType} from "./CardChip.types";

interface Props extends ChipProps {
  type: StatType;
  value: number;
}

export function StatChip({size, type, value}: Props) {
  return (
    <Chip
      size={size}
      icon={<Img alt={type} src={symbols[type]} style={{height: "1em", width: "1em"}} />}
      label={<Typography>{value > 0 ? value : "-"}</Typography>}
      style={{marginRight: 4, marginBottom: 4}}
    />
  );
}
