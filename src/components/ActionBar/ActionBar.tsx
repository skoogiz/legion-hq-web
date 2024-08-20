import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  // InputBase,
  // alpha,
  // styled,
} from "@mui/material";
import {Menu as MenuIcon /*, Search as SearchIcon*/} from "@mui/icons-material";
import DataContext from "@legion-hq/context/DataContext";
import ftLogoLight from "@legion-hq/assets/ftLogoLight.png";
import ftLogoDark from "@legion-hq/assets/ftLogoDark.png";
import lhqLogoLight from "@legion-hq/assets/lhqLogoLight.png";
import lhqLogoDark from "@legion-hq/assets/lhqLogoDark.png";
import {useSettings} from "@legion-hq/hooks/app/useSettings";

// export const SearchBar = styled("div")`
//   ${({theme}) => ({
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: "100%",
//     flexGrow: 1,
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(3),
//       width: "auto",
//     },
//   })};
// `;

// export const SearchIconWrapper = styled("div")`
//   ${({theme}) => ({
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   })};
// `;

const styles = {
  grow: {flexGrow: 1},
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
};

function DefaultBar() {
  const {setIsDrawerOpen} = React.useContext(DataContext);
  const theme = useTheme();
  const {themeMode} = useSettings();
  return (
    <Toolbar variant="dense">
      <IconButton
        color="inherit"
        edge="start"
        sx={{marginRight: theme.spacing(2)}}
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <img
        alt="Legion HQ Logo"
        src={themeMode === "light" ? lhqLogoLight : lhqLogoDark}
        style={{height: 35}}
      />
      <div style={styles.grow} />
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://thefifthtrooper.com/"
        style={{marginTop: 4}}
      >
        <img
          alt="Fifth Trooper Logo"
          src={themeMode === "light" ? ftLogoLight : ftLogoDark}
          style={{height: 35}}
        />
      </a>
      {/* {false && (
        <SearchBar>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <InputBase
            placeholder="Search..."
            sx={{
              root: styles.inputRoot,
              input: {
                padding: theme.spacing(1, 1, 1, 0),
                // vertical padding + font size from searchIcon
                paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
                transition: theme.transitions.create("width"),
                width: "100%",
              },
            }}
          />
        </SearchBar>
      )} */}
    </Toolbar>
  );
}

export function ActionBar() {
  return (
    <div style={styles.grow}>
      <AppBar position="fixed" color="secondary">
        <DefaultBar />
      </AppBar>
      <div style={{height: 55}} />
    </div>
  );
}
