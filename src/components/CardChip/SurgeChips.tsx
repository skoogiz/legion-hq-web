import React from "react";
import {Img} from "react-image";
import {Chip} from "@mui/material";
import symbols from "@legion-hq/constants/symbols";
import {ChipProps} from "./CardChip.types";
import {SurgeType} from "@legion-hq/types";
import {useSettings} from "@legion-hq/hooks/app/useSettings";

function SurgeLabel({type}: {type: SurgeType}) {
  const {themeMode} = useSettings();
  const themeType = themeMode === "light" ? "dark" : "light";
  return (
    <Img
      alt={`${type} surge`}
      src={symbols.surge[type][themeType]}
      style={{width: 50, marginTop: 5}}
    />
  );
}

interface Props extends ChipProps {
  surges: SurgeType[];
}

export function SurgeChips({size, surges}: Props) {
  if (!surges)
    return (
      <Chip
        size={size}
        label="Error (surges)"
        style={{marginRight: 4, marginBottom: 4}}
      />
    );
  const chips = surges.map((surge) => (
    <Chip
      key={surge}
      size={size}
      label={<SurgeLabel type={surge} />}
      style={{marginRight: 4, marginBottom: 4}}
    />
  ));
  return <React.Fragment>{chips}</React.Fragment>;
}
