import * as React from "react";
import {Chip, Menu, MenuItem} from "@mui/material";
import legionModes from "@legion-hq/constants/legionModes";
import {LegionMode} from "@legion-hq/types";
import {useAppContext} from "@legion-hq/context/app/useAppContext";
import {ArrowDropDown} from "@mui/icons-material";

type Props = {
  currentMode: LegionMode;
  handleChangeMode: (mode: LegionMode) => void;
};

export function ModeButton({currentMode, handleChangeMode}: Props) {
  const {
    settings: {includeCustomGameModes},
  } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();
  const handleOpenMenu = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(undefined);

  const showCustomGameModes = includeCustomGameModes === "yes";

  const mode = React.useMemo(() => legionModes[currentMode], [currentMode]);

  return (
    <>
      <Chip
        clickable
        variant="filled"
        label={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>{mode.name}</span>
            <ArrowDropDown />
          </div>
        }
        onClick={handleOpenMenu}
        color="accent"
        size="small"
        sx={{
          fontWeight: 500,
          textTransform: "uppercase",
          borderRadius: "6px",
          ".MuiChip-label": {pr: "4px"},
        }}
      />
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
    </>
  );
}
