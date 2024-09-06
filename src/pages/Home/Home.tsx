import * as React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {Grid, Typography, Container, Fade, Button, Collapse, Box} from "@mui/material";
import {
  Announcement as NewsIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {LoginButton} from "./LoginButton";
import {ListChip} from "./ListChip";
import {FactionChip} from "./FactionChip";
import {ListChipDropdown} from "./ListChipDropdown";
import {ErrorFallback} from "@legion-hq/components";
import DataContext from "@legion-hq/context/DataContext";
import * as Factions from "@legion-hq/constants/factions";
import ftLogoLight from "@legion-hq/assets/ftLogoLight.png";
import ftLogoDark from "@legion-hq/assets/ftLogoDark.png";
import lhqLogoLight from "@legion-hq/assets/lhqLogoLight.png";
import lhqLogoDark from "@legion-hq/assets/lhqLogoDark.png";
import {useNews} from "@legion-hq/data-access/hooks/useNews";
import {useSettings} from "@legion-hq/hooks/app/useSettings";
import {ListTemplate} from "@legion-hq/types";

function Post({title, date, body}: {title: string; date: string; body: string}) {
  return (
    <div style={{maxWidth: 400}}>
      <Typography variant="body1">{title}</Typography>
      <Typography variant="caption" color="textSecondary">
        {date}
      </Typography>
      <Typography variant="body2">{body}</Typography>
    </div>
  );
}

function Home() {
  const {
    // auth,
    userId,
    userLists,
    fetchUserLists,
    deleteUserList,
    isLoginDisabled,
  } = React.useContext(DataContext);
  const {themeMode} = useSettings();
  const {newsPosts} = useNews();
  const listChips: Record<string, Array<ListTemplate>> = {};
  const [isNewsOpen, setIsNewsOpen] = React.useState(true);
  Factions.getFactionTypes().forEach((faction) => (listChips[faction] = []));
  if (userLists) {
    userLists.forEach((userList) => {
      if (userList.faction in listChips) {
        listChips[userList.faction].push(userList);
      }
    });
  }
  React.useEffect(() => {
    if (userId) fetchUserLists(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Fade in={true}>
        <Container maxWidth="lg">
          <Box
            sx={{
              padding: "2em 0",
            }}
          >
            <Grid
              container
              spacing={1}
              direction="column"
              justifyContent="center"
              alignItems="center"
              rowGap={1}
            >
              <Grid item>
                <img
                  alt="Fifth Trooper Logo"
                  src={themeMode === "light" ? ftLogoLight : ftLogoDark}
                  style={{width: 150, height: "auto"}}
                />
              </Grid>
              <Grid item>
                <img
                  alt="Legion HQ Logo"
                  src={themeMode === "light" ? lhqLogoLight : lhqLogoDark}
                  style={{width: 400, height: "auto"}}
                />
              </Grid>
              <Grid item style={{maxWidth: "75vw", textAlign: "center"}}>
                <Typography variant="subtitle1">
                  An unofficial list building tool and resource for Atomic Mass Games:
                  Star Wars: Legion.
                </Typography>
              </Grid>
              <Grid item>
                <Button size="small" onClick={() => setIsNewsOpen(!isNewsOpen)}>
                  <NewsIcon fontSize="small" style={{marginRight: 4}} />
                  Latest news
                  <ExpandMoreIcon
                    fontSize="small"
                    sx={(theme) => ({
                      transform: isNewsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      marginLeft: "auto",
                      transition: theme.transitions.create("transform", {
                        duration: theme.transitions.duration.shortest,
                      }),
                    })}
                  />
                </Button>
              </Grid>
              <Grid item>
                {newsPosts.length > 0 && (
                  <Collapse in={isNewsOpen}>
                    <Post
                      title={newsPosts[0].title}
                      date={newsPosts[0].date}
                      body={newsPosts[0].body}
                    />
                  </Collapse>
                )}
              </Grid>
              <Grid item>
                <div style={{height: 10}} />
              </Grid>
              {Factions.getFactionTypes().map((faction) => (
                <Grid
                  key={faction}
                  item
                  container
                  spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item key="factionChip">
                    <FactionChip faction={faction} />
                  </Grid>
                  {listChips[faction].length > 4 ? (
                    <ListChipDropdown faction={faction}>
                      {listChips[faction].map((userList) => (
                        <Grid item key={userList.listId}>
                          <ListChip userList={userList} deleteUserList={deleteUserList} />
                        </Grid>
                      ))}
                    </ListChipDropdown>
                  ) : (
                    listChips[faction].map((userList) => (
                      <Grid item key={userList.listId}>
                        <ListChip userList={userList} deleteUserList={deleteUserList} />
                      </Grid>
                    ))
                  )}
                </Grid>
              ))}
              <Grid item>
                <div style={{height: 10}} />
              </Grid>
              <Grid item>{!isLoginDisabled && <LoginButton />}</Grid>
              <Grid item>
                <div style={{height: 10}} />
              </Grid>
              <Grid item>
                <div style={{height: 10}} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Fade>
    </ErrorBoundary>
  );
}

export default Home;
