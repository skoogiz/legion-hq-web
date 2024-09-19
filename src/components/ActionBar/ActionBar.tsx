import * as React from "react";
import {AppBar, Toolbar, IconButton, Container} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import DataContext from "@legion-hq/context/DataContext";
import lhqLogoLight from "@legion-hq/assets/lhqLogoLight.png";
import lhqLogoDark from "@legion-hq/assets/lhqLogoDark.png";
import {useSettings} from "@legion-hq/hooks/app/useSettings";
import {Link} from "react-router-dom";

export function ActionBar() {
  // const {pathname} = useLocation();
  const {setIsDrawerOpen} = React.useContext(DataContext);
  const {themeMode} = useSettings();
  return (
    <>
      <AppBar
        component="div"
        position="relative"
        color="secondary"
        // color={pathname === "/" ? "transparent" : "secondary"}
        // sx={pathname === "/" ? {boxShadow: "none", transition: "none"} : {}}
      >
        <Toolbar variant="dense">
          <Container
            maxWidth="xl"
            disableGutters
            sx={{
              margin: "0 auto",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link
              to={"/"}
              style={{
                height: "2em",
              }}
            >
              <img
                alt="Legion HQ Logo"
                src={themeMode === "light" ? lhqLogoLight : lhqLogoDark}
                style={{height: "inherit"}}
              />
            </Link>
            <div style={{flexGrow: 1}} />
            <IconButton color="inherit" edge="end" onClick={() => setIsDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
