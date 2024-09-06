import React from "react";
import {Img} from "react-image";
import {
  Chip,
  Typography,
  Badge,
  Menu,
  MenuItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import DataContext from "@legion-hq/context/DataContext";
import urls from "@legion-hq/constants/urls";
import factions from "@legion-hq/constants/factions";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {LegionCard, ListTemplate} from "@legion-hq/types";

function findFirstCommanderId(list: ListTemplate, cards: Record<string, LegionCard>) {
  for (let i = 0; i < list.units.length; i++) {
    const card = cards[list.units[i].unitId];
    if (card.rank === "commander") return card;
  }
  return undefined;
}

type Props = {
  userList: ListTemplate;
  deleteUserList: (id: string) => void;
};

export function ListChip({userList, deleteUserList}: Props) {
  const {goToPage} = React.useContext(DataContext);
  const {cards} = useCards();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>();
  const handleOpenDeleteMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseDeleteMenu = () => setAnchorEl(null);
  if (userList.faction in factions) {
    const factionTheme = createTheme({
      palette: {
        primary: {main: factions[userList.faction].primaryColor},
        secondary: {main: factions[userList.faction].secondaryColor},
      },
    });
    const card = findFirstCommanderId(userList, cards);
    return (
      <React.Fragment>
        <ThemeProvider theme={factionTheme}>
          <Badge max={10000} color="secondary" badgeContent={userList.pointTotal}>
            <Chip
              clickable
              color="primary"
              style={{margin: "0 5 5 0"}}
              avatar={
                card ? (
                  <Img
                    alt={card.cardName}
                    src={`${urls.cdn}/unitIcons/${card.imageName}`}
                    style={{
                      marginLeft: 0,
                      width: 44,
                      height: 32,
                      borderRadius: 20,
                    }}
                  />
                ) : undefined
              }
              label={
                <Typography variant="subtitle1">
                  {userList.title.length > 20 ? `${userList.title}...` : userList.title}
                </Typography>
              }
              onClick={() => goToPage(`/list/${userList.listId}`)}
              onDelete={handleOpenDeleteMenu}
            />
          </Badge>
        </ThemeProvider>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDeleteMenu}
        >
          <Typography variant="caption" style={{padding: "0 16px"}}>
            Delete {userList.title}?
          </Typography>
          <MenuItem
            onClick={() => {
              handleCloseDeleteMenu();
              if (userList.listId) deleteUserList(userList.listId);
            }}
          >
            Yes
          </MenuItem>
          <MenuItem onClick={handleCloseDeleteMenu}>No</MenuItem>
        </Menu>
      </React.Fragment>
    );
  } else return <div />;
}
