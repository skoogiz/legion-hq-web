import {Divider, Box, Container, Paper} from "@mui/material";

import {ListHeader} from "./ListHeader";
import {ListUnits} from "./ListUnits";
import ListCommands from "./ListCommands";
import {ListContingencies} from "./ListContingencies";
import ListObjectives from "./ListObjectives";
import {ListExtras} from "./ListExtras";
import {ListDisplay} from "./ListDisplay";
import {ListId} from "./ListId";
import {CardSelector} from "./CardSelector";
import {useListBuilder} from "@legion-hq/hooks/list/useList";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {ListToolbar} from "./ListHeader/ListToolbar";
import {KeywordSection} from "./KeywordSection";
import { RankEmblem } from "@legion-hq/components/RankEmblem";
import { RankType } from "@legion-hq/types";
import ranks from "@legion-hq/constants/ranks";

export function ListLayout() {
  // const theme = useTheme();
  // const {themeMode} = useSettings();
  // const palette = themes.palettes[themeMode];
  const {leftPaneWidth, rightPaneWidth} = useListBuilder();

  const headerElevation = 2;

  return (
    <>
      <Paper
        elevation={headerElevation}
        square
        sx={(theme) => ({
          backgroundColor: theme.palette.secondary.main,
        })}
      >
        <Container maxWidth="xl" disableGutters>
          <Box display="flex" flexDirection="column" rowGap={1} pt={2} pb={1}>
            <ListHeader />
          </Box>
        </Container>
      </Paper>

      <ListToolbar elevation={headerElevation} />

      <Container maxWidth={false} disableGutters sx={{flexGrow: 1}}>

        <Grid container /* direction="row" sx={{height: "100vh"}} */>
          {leftPaneWidth > 0 && (
            <Grid xs={leftPaneWidth} /* style={paneStyles} */>
              <Box display="flex" flexDirection="column" pt={2} rowGap={2}>
              <Box display="flex" columnGap={1} alignItems="center" justifyContent="center">
                {(Object.keys(ranks) as RankType[]).map((rank) => <RankEmblem rank={rank} /> )}
              </Box>
                <Box id="list-content" display="flex" flexDirection="column" rowGap={2}>
                  <ListUnits />
                  <Divider />
                  <ListCommands />
                  <Divider />
                  <ListContingencies />
                  <Divider />
                  <ListObjectives />
                </Box>
                <Divider style={{marginBottom: 4}} />
                <ListExtras />
                <ListId />
                <div style={{marginTop: 24}} />
                <KeywordSection />
              </Box>
            </Grid>
          )}
          {rightPaneWidth > 0 && (
            <Grid xs={rightPaneWidth} /* style={paneStyles}*/>
              <ListDisplay />
              <CardSelector />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
