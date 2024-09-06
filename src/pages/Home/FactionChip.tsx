import * as React from "react";
import {Chip, Typography, ThemeProvider, createTheme} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";
import DataContext from "@legion-hq/context/DataContext";
import factions from "@legion-hq/constants/factions";
import {FactionType} from "@legion-hq/types";

type Props = {
  faction: FactionType;
};

export function FactionChip({faction}: Props) {
  const {goToPage} = React.useContext(DataContext);
  const factionTheme = createTheme({
    palette: {
      primary: {main: factions[faction].primaryColor},
      secondary: {main: factions[faction].secondaryColor},
    },
  });
  return (
    <ThemeProvider theme={factionTheme}>
      <Chip
        clickable
        color="primary"
        icon={<AddIcon fontSize="small" />}
        label={
          <Typography variant="subtitle1">{`${factions[faction].singular}`}</Typography>
        }
        onClick={() => goToPage(`/list/${faction}`)}
      />
    </ThemeProvider>
  );
}
