import React, {useContext} from "react";
import {Grid, Divider} from "@mui/material";
import DataContext from "@legion-hq/context/DataContext";
import ListContext from "@legion-hq/context/ListContext";
import {CardModal} from "@legion-hq/common/CardModal";
import themes from "@legion-hq/constants/themes";
import ListHeader from "./ListHeader";
import RankSelector from "./RankSelector";
import ListUnits from "./ListUnits";
import ListCommands from "./ListCommands";
import ListContingencies from "./ListContingencies";
import ListObjectives from "./ListObjectives";
import ListExtras from "./ListExtras";
import ListDisplay from "./ListDisplay";
import ListId from "./ListId";
import {CardSelector} from "./CardSelector";

function ListLayout() {
  const {userSettings} = useContext(DataContext);
  const {themeMode} = userSettings;
  const palette = themes.palettes[themeMode];
  const {
    isSmallScreen,
    leftPaneWidth,
    rightPaneWidth,
    isModalOpen,
    modalContent,
    handleCloseModal,
  } = useContext(ListContext);

  const isMobile = isSmallScreen;

  const paneStyles = {
    padding: "0 2px 2px",
    overflow: "auto",
    height: `calc(100vh - ${isMobile ? "125px" : "75px"})`,
  };

  const stickyStyles = {
    top: 0,
    zIndex: 2,
    position: "-webkit-sticky",
    position: "sticky",
    backgroundColor: palette ? palette.background.default : "",
  };

  const builderPane = leftPaneWidth > 0 && (
    <Grid item xs={leftPaneWidth} style={paneStyles}>
      <div id="list-content">
        <div style={stickyStyles}>
          <ListHeader />
          <div style={{marginTop: 8}} />
          <RankSelector />
        </div>
        <ListUnits />
        <Divider style={{marginBottom: 4}} />
        <ListCommands />
        <Divider style={{marginBottom: 4}} />
        <ListContingencies />
        <Divider style={{marginBottom: 4}} />
        <ListObjectives />
      </div>
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

export default ListLayout;
