import * as React from "react";
import {Chip, Menu, MenuItem} from "@mui/material";
import legionModes from "@legion-hq/constants/legionModes";
import {LegionMode} from "@legion-hq/types";
import {LargerTooltip} from "@legion-hq/components";
import {useAppContext} from "@legion-hq/context/app/useAppContext";

type Props = {
  currentMode: LegionMode;
  points: number;
  maxPoints: number;
  tooltip?: string;
  handleChangeMode: (mode: LegionMode) => void;
};

export function ModeButton({
  currentMode,
  points,
  maxPoints,
  tooltip = "Toggle between Skirmish (500), Standard (800), and Grand Army (1600) formats.",
  handleChangeMode,
}: Props) {
  const {
    settings: {includeCustomGameModes},
  } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();
  const handleOpenMenu = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(undefined);

  const showCustomGameModes = includeCustomGameModes === "yes";

  return (
    <React.Fragment>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {Object.values(legionModes).map(({id, name, longName, unofficial}) => (
          <MenuItem
            key={id}
            selected={currentMode === id}
            onClick={() => {
              handleChangeMode(id);
              handleCloseMenu();
            }}
            sx={unofficial && !showCustomGameModes ? {display: "none"} : {}}
          >
            {longName ?? name}
          </MenuItem>
        ))}
      </Menu>
      <LargerTooltip
        title={
          legionModes[currentMode].description || legionModes[currentMode].name || tooltip
        }
      >
        <Chip
          clickable
          variant={points > maxPoints ? "filled" : "outlined"}
          label={`${points}/${maxPoints}`}
          onClick={handleOpenMenu}
          style={points > maxPoints ? {backgroundColor: "#f44336"} : {}}
        />
      </LargerTooltip>
    </React.Fragment>
  );
}
