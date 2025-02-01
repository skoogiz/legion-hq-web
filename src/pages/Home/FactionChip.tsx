import * as React from "react";
import DataContext from "@legion-hq/context/DataContext";
import {FactionType} from "@legion-hq/types";
import {LegionButton} from "@legion-hq/components";

type Props = {
  faction: FactionType;
};

export function FactionChip({faction}: Props) {
  const {goToPage} = React.useContext(DataContext);
  return (
    <LegionButton
      faction={faction}
      onClick={() => goToPage(`/list/${faction}`)}
      fullWidth
    />
  );
}
