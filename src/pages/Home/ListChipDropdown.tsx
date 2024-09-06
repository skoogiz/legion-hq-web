import React from "react";
import {Popover, Chip, Typography, ThemeProvider, createTheme} from "@mui/material";
import factions from "@legion-hq/constants/factions";
import {FactionType} from "@legion-hq/types";

type Props = {
  faction: FactionType;
  children: JSX.Element[];
};

export function ListChipDropdown({faction, children}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

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
        style={{margin: "0 5 5 0"}}
        label={
          <Typography variant="subtitle1">{`${React.Children.count(children)} lists`}</Typography>
        }
        onClick={handleClick}
      />
      <Popover
        id={`${faction} list menu`}
        sx={(theme) => ({
          ".MuiPopover-paper": {
            padding: theme.spacing(1),
            background: "#1F2125",
          },
        })}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {React.Children.map(children, (chip, i) => (
          <div key={`${faction}_list_${i}`} style={{margin: 6}}>
            {chip}
          </div>
        ))}
      </Popover>
    </ThemeProvider>
  );
}
