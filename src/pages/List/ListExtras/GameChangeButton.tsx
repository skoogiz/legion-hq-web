import * as React from "react";
import {Chip, Menu, MenuItem} from "@mui/material";
import {useList} from "@legion-hq/hooks/list/useList";

/**
 * @deprecated
 */
export default function GameChangeButton() {
  const {currentList, handleSetGame} = useList();
  const [anchorEl, setAnchorEl] = React.useState();

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl();

  return (
    <React.Fragment>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            handleSetGame("legion");
            handleCloseMenu();
          }}
        >
          Legion
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetGame("Storm Tide: Special Forces Division");
            handleCloseMenu();
          }}
        >
          Storm Tide: Special Forces Division
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetGame("Storm Tide: Armored Division");
            handleCloseMenu();
          }}
        >
          Storm Tide: Armored Division
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetGame("Storm Tide: Infantry Division");
            handleCloseMenu();
          }}
        >
          Storm Tide: Infantry Division
        </MenuItem>
      </Menu>
      <Chip
        clickable
        variant="outlined"
        label={currentList.game === "legion" ? "Game: Legion" : currentList.game}
        onClick={handleOpenMenu}
        style={{marginRight: 4, marginBottom: 4}}
      />
    </React.Fragment>
  );
}
