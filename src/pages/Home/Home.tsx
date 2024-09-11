import * as React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {Grid, Typography, Container, Fade, Box} from "@mui/material";
import {LoginButton} from "./LoginButton";
import {ListChip} from "./ListChip";
import {FactionChip} from "./FactionChip";
import {ListChipDropdown} from "./ListChipDropdown";
import {ErrorFallback} from "@legion-hq/components";
import DataContext from "@legion-hq/context/DataContext";
import * as Factions from "@legion-hq/constants/factions";
import {ListTemplate} from "@legion-hq/types";
import {LatestNews} from "./LatestNews";

function Home() {
  const {
    // auth,
    userId,
    userLists,
    fetchUserLists,
    deleteUserList,
    isLoginDisabled,
  } = React.useContext(DataContext);
  const listChips: Record<string, Array<ListTemplate>> = {};
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
            display="flex"
            flexDirection="column"
            alignItems="center"
            rowGap={4}
            mt={3}
            mb={4}
          >
            <Box
              sx={(theme) => ({
                [theme.breakpoints.up("sm")]: {
                  my: 2,
                },
                [theme.breakpoints.up("md")]: {
                  mt: 4,
                },
              })}
            >
              <Typography
                variant="h3"
                component="h1"
                align="center"
                color="textSecondary"
                pb={1}
                fontWeight={700}
              >
                Legion HQ
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                color="textSecondary"
              >
                {"An unofficial list building tool and resource for "}
                <strong>Star Wars: Legion</strong>.
              </Typography>
            </Box>
            <Box maxWidth="sm">
              <Grid
                container
                rowGap={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
                mb={1}
              >
                {Factions.getFactionTypes().map((faction) => (
                  <Grid item key={faction} sx={{alignSelf: "stretch"}}>
                    <FactionChip faction={faction} />
                    <Grid
                      key={faction}
                      container
                      spacing={1}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {listChips[faction].length > 4 ? (
                        <ListChipDropdown faction={faction}>
                          {listChips[faction].map((userList) => (
                            <Grid item key={userList.listId}>
                              <ListChip
                                userList={userList}
                                deleteUserList={deleteUserList}
                              />
                            </Grid>
                          ))}
                        </ListChipDropdown>
                      ) : (
                        listChips[faction].map((userList) => (
                          <Grid item key={userList.listId}>
                            <ListChip
                              userList={userList}
                              deleteUserList={deleteUserList}
                            />
                          </Grid>
                        ))
                      )}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Box>
            {!isLoginDisabled && <LoginButton />}
            <LatestNews />
          </Box>
        </Container>
      </Fade>
    </ErrorBoundary>
  );
}

export default Home;
