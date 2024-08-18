import React, {useState, useContext} from "react";
import {Chip, Menu, MenuItem} from "@mui/material";
import {PlaylistAdd as AddTemplateIcon} from "@mui/icons-material";
import DataContext from "@legion-hq/context/DataContext";
import ListContext from "@legion-hq/context/ListContext";

function TemplateButton() {
  const {userLists} = useContext(DataContext);
  const {currentList, handleMergeList} = useContext(ListContext);
  const [anchorEl, setAnchorEl] = useState();
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl();

  const validUserLists = [];
  userLists.forEach((userList) => {
    if (userList.faction.includes(currentList.faction)) {
      validUserLists.push(
        <MenuItem key={userList.listId} onClick={() => handleMergeList(userList)}>
          {userList.title}
        </MenuItem>,
      );
    }
  });
  return (
    <React.Fragment>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {validUserLists}
      </Menu>
      <Chip
        clickable
        disabled={validUserLists.length === 0}
        variant="outlined"
        icon={<AddTemplateIcon />}
        label="Add Template"
        onClick={handleOpenMenu}
        style={{marginRight: 4, marginBottom: 4}}
      />
    </React.Fragment>
  );
}

export default TemplateButton;
