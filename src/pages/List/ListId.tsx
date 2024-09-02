import * as React from "react";
import {Typography} from "@mui/material";
import DataContext from "@legion-hq/context/DataContext";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";

export function ListId() {
  const {userId} = React.useContext(DataContext);
  const currentList = useCurrentList();
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
