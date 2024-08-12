import React, {useContext} from "react";
import {Chip, Typography, ThemeProvider, createTheme} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";
import DataContext from "@legion-hq/context/DataContext";
import factions from "@legion-hq/constants/factions";

function FactionChip({faction}) {
  const {goToPage} = useContext(DataContext);
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

export default FactionChip;
