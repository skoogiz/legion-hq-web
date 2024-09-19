import * as React from "react";
import {Box} from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export function PageColumn({children}: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      rowGap={4}
      mt={3}
      mb={4}
    >
      {children}
    </Box>
  );
}
