import React from "react";
import {Box} from "@mui/material";
import {TitleField} from "./TitleField";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";

export function ListHeader() {
  const {handleChangeTitle} = useListBuilder();
  const {title} = useCurrentList();

  return (
    <Box
      id="list-header"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <div style={{alignSelf: "stretch"}}>
        <TitleField
          // activations={numActivations}
          title={title}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            handleChangeTitle(e.target.value);
          }}
        />
      </div>
    </Box>
  );
}
