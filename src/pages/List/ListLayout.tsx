import {Grid, Divider, styled} from "@mui/material";
// import {useSettings} from "@legion-hq/hooks/app/useSettings";
// import themes from "@legion-hq/constants/themes";
import {CardModal} from "@legion-hq/components";
import ListHeader from "./ListHeader";
import {RankSelector} from "./RankSelector";
import ListUnits from "./ListUnits";
import ListCommands from "./ListCommands";
import ListContingencies from "./ListContingencies";
import ListObjectives from "./ListObjectives";
import {ListExtras} from "./ListExtras";
import ListDisplay from "./ListDisplay";
import {ListId} from "./ListId";
import {CardSelector} from "./CardSelector";
import {useList} from "@legion-hq/hooks/list/useList";

const ListContent = styled("div")<{isMobile: boolean}>`
  padding: 0 2px 2px;
  overflow: auto;
  height: calc(100vh - ${({isMobile}) => (isMobile ? "125px" : "75px")});
`;

const StickyPanel = styled("div")`
  top: 0;
  z-index: 2;
  position: -webkit-sticky;
  position: sticky;
`;

export function ListLayout() {
  // const {themeMode} = useSettings();
  // const palette = themes.palettes[themeMode];
  const {
    isSmallScreen,
    leftPaneWidth,
    rightPaneWidth,
    isModalOpen,
    modalContent,
    handleCloseModal,
  } = useList();

  const isMobile = isSmallScreen;

  const paneStyles = {
    padding: "0 2px 2px",
    overflow: "auto",
    height: `calc(100vh - ${isMobile ? "125px" : "75px"})`,
  };

  const builderPane = leftPaneWidth > 0 && (
    <Grid item xs={leftPaneWidth} style={paneStyles}>
      <ListContent isMobile={isMobile}>
        <StickyPanel>
          <ListHeader />
          <div style={{marginTop: 8}} />
          <RankSelector />
        </StickyPanel>
        <ListUnits />
        <Divider style={{marginBottom: 4}} />
        <ListCommands />
        <Divider style={{marginBottom: 4}} />
        <ListContingencies />
        <Divider style={{marginBottom: 4}} />
        <ListObjectives />
      </ListContent>
      <Divider style={{marginBottom: 4}} />
      <ListExtras />
      <ListId />
      <div style={{marginTop: 24}} />
    </Grid>
  );

  const cardPane = rightPaneWidth > 0 && (
    <Grid item xs={rightPaneWidth} style={paneStyles}>
      <ListDisplay />
      <CardSelector />
    </Grid>
  );

  const modal = (
    <CardModal id={modalContent} isOpen={isModalOpen} handleClose={handleCloseModal} />
  );
  return (
    <Grid container direction="row">
      {modal}
      {builderPane}
      {cardPane}
    </Grid>
  );
}
