import * as React from "react";
import {Chip, Menu, MenuItem} from "@mui/material";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";

/**
 * @deprecated
 */
export default function GameChangeButton() {
  const {handleSetGame} = useListBuilder();

  const currentList = useCurrentList();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

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
