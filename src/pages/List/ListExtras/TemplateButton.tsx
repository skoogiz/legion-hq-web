import * as React from "react";
import {Chip, Menu, MenuItem} from "@mui/material";
import {PlaylistAdd as AddTemplateIcon} from "@mui/icons-material";
import DataContext from "@legion-hq/context/DataContext";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {useListBuilder} from "@legion-hq/hooks/list/useList";

export function TemplateButton() {
  const {userLists} = React.useContext(DataContext);
  const {handleMergeList} = useListBuilder();
  const {faction} = useCurrentList();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const validUserLists = userLists.filter((userList) =>
    userList.faction.includes(faction),
  );

  return (
    <React.Fragment>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {validUserLists.map((userList) => (
          <MenuItem key={userList.listId} onClick={() => handleMergeList(userList)}>
            {userList.title}
          </MenuItem>
        ))}
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
