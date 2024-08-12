import * as React from "react";
import {Chip, Menu, MenuItem} from "@mui/material";
import LargerTooltip from "@legion-hq/common/LargerTooltip";
import legionModes from "@legion-hq/constants/legionModes";
import {LegionMode} from "@legion-hq/types";

type Props = {
  currentMode: LegionMode;
  points: number;
  maxPoints: number;
  tooltip?: string;
  handleChangeMode: (mode: string) => void;
};

export function ModeButton({
  currentMode,
  points,
  maxPoints,
  tooltip = "Toggle between Skirmish (500), Standard (800), and Grand Army (1600) formats.",
  handleChangeMode,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();
  const handleOpenMenu = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(undefined);
  return (
    <React.Fragment>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem
          selected={currentMode === "500-point mode"}
          onClick={() => {
            handleChangeMode("500-point mode");
            handleCloseMenu();
          }}
        >
          Skirmish (500 pts)
        </MenuItem>
        <MenuItem
          selected={currentMode === "standard mode"}
          onClick={() => {
            handleChangeMode("standard mode");
            handleCloseMenu();
          }}
        >
          Standard (800 pts)
        </MenuItem>
        <MenuItem
          selected={currentMode === "grand army mode"}
          onClick={() => {
            handleChangeMode("grand army mode");
            handleCloseMenu();
          }}
        >
          Grand Army (1600 pts)
        </MenuItem>
        <MenuItem
          selected={currentMode === "storm tide: infantry"}
          onClick={() => {
            handleChangeMode("storm tide: infantry");
            handleCloseMenu();
          }}
        >
          Storm Tide: Infantry Division
        </MenuItem>
        <MenuItem
          selected={currentMode === "storm tide: armored"}
          onClick={() => {
            handleChangeMode("storm tide: armored");
            handleCloseMenu();
          }}
        >
          Storm Tide: Armored Division
        </MenuItem>
        <MenuItem
          selected={currentMode === "storm tide: special forces"}
          onClick={() => {
            handleChangeMode("storm tide: special forces");
            handleCloseMenu();
          }}
        >
          Storm Tide: Special Forces Division
        </MenuItem>
      </Menu>
      <LargerTooltip title={legionModes[currentMode].name}>
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
