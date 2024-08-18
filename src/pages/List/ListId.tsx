import * as React from "react";
import {Typography} from "@mui/material";
import DataContext from "@legion-hq/context/DataContext";
import ListContext from "@legion-hq/context/ListContext";

function ListId() {
  const {userId} = React.useContext(DataContext);
  const {currentList} = React.useContext(ListContext);
  if (!currentList) return null;
  return (
    <div style={{display: "flex", flexFlow: "column nowrap", alignItems: " center"}}>
      {userId && (
        <Typography variant="caption" color="textSecondary">
          User ID: {userId}
        </Typography>
      )}
      {currentList.listId && (
        <Typography variant="caption" color="textSecondary">
          List ID: {currentList.listId}
        </Typography>
      )}
    </div>
  );
}

export default ListId;
