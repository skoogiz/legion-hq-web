import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Grid,
  Typography,
  Container,
  Fade,
  Button,
  Collapse,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Announcement as NewsIcon,
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import LoginButton from './LoginButton';
import ListChip from './ListChip';
import FactionChip from './FactionChip';
import ListChipDropdown from './ListChipDropdown';
import DataContext from 'context/DataContext';
import ErrorFallback from 'common/ErrorFallback';
import factions from 'constants/factions';
import ftLogoLight from 'assets/ftLogoLight.png';
import ftLogoDark from 'assets/ftLogoDark.png';
import lhqLogoLight from 'assets/lhqLogoLight.png';
import lhqLogoDark from 'assets/lhqLogoDark.png';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    })
  },
  expandOpen: { transform: 'rotate(180deg)' },
}));

function Post({ title, date, body }) {
  return (
    <div style={{ maxWidth: 400 }}>
      <Typography variant="body1">
        {title}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {date}
      </Typography>
      <Typography variant="body2">
        {body}
      </Typography>
    </div>
  );
}

function Home() {
  const {
    newsPosts,
    auth,
    userId,
    userLists,
    userSettings,
    fetchUserLists,
    deleteUserList
  } = useContext(DataContext);
  const classes = useStyles();
  const listChips = {};
  const [isNewsOpen, setIsNewsOpen] = useState(true);
  Object.keys(factions).forEach(faction => listChips[faction] = []);
  if (userLists) {
    userLists.forEach(userList => {
      if (userList.faction in listChips) {
        listChips[userList.faction].push(userList);
      }
    });
  }
  useEffect(() => {
    if (userId) fetchUserLists(userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Fade in={true}>
        <Container>
          <Grid
            container
            spacing={1}
            direction="column"
            justify="center"
            alignItems="center"
            style={{ marginTop: 5 }}
          >
            <Grid item>
              <img
                alt="Fifth Trooper Logo"
                src={userSettings.themeColor === 'light' ? ftLogoLight : ftLogoDark}
                style={{ width: 150, height: 'auto' }}
              />
            </Grid>
            <Grid item>
              <img
                alt="Legion HQ Logo"
                src={userSettings.themeColor === 'light' ? lhqLogoLight : lhqLogoDark}
                style={{ width: 400, height: 'auto' }}
              />
            </Grid>
            <Grid item style={{ maxWidth: '75vw', textAlign: 'center' }}>
              <Typography variant="subtitle1">
                An unofficial list building tool and resource for Atomic Mass Games: Star Wars: Legion.
              </Typography>
            </Grid>
            <Grid item>
              <Button size="small" onClick={() => setIsNewsOpen(!isNewsOpen)}>
                <NewsIcon fontSize="small" style={{ marginRight: 4 }} />
                Latest news
                <ExpandMoreIcon
                  fontSize="small"
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: isNewsOpen,
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
              <div style={{ height: 10 }} />
            </Grid>
            {Object.keys(factions).map(faction => (
              <Grid
                key={faction}
                item
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item key="factionChip">
                  <FactionChip faction={faction} />
                </Grid>
                {listChips[faction].length > 4 ? (
                  <ListChipDropdown
                    faction={faction}
                    chips={
                      listChips[faction].map(userList => (
                        <Grid item key={userList.listId}>
                          <ListChip userList={userList} deleteUserList={deleteUserList} />
                        </Grid>
                      ))
                    }
                  />
                ) : (
                  listChips[faction].map(userList => (
                    <Grid item key={userList.listId}>
                      <ListChip userList={userList} deleteUserList={deleteUserList} />
                    </Grid>
                  ))
                )}
              </Grid>
            ))}
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <LoginButton auth={auth} />
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
            <Grid item>
              <div style={{ height: 10 }} />
            </Grid>
          </Grid>
        </Container>
      </Fade>
    </ErrorBoundary>
  );
};

export default Home;
