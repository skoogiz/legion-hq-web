import * as React from "react";
import {Typography} from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export function PageTitle({children}: Props) {
  return (
    <Typography
      variant="h3"
      component="h1"
      sx={{textAlign: "left", alignSelf: "stretch"}}
    >
      {children}
    </Typography>
  );
}
