import React from "react";
import clsx from "clsx";
import {Collapse, Typography, Divider, IconButton} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";
import {LegionCard} from "@legion-hq/components";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {transform: "rotate(180deg)"},
  rowContainerWrap: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  rowContainerNoWrap: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    padding: 4,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
  },
  item: {
    marginRight: 4,
    marginBottom: 4,
  },
  divider: {
    flexGrow: 1,
  },
}));

function CollapsedContent({children, isExpanded}) {
  return (
    <Collapse unmountOnExit timeout="auto" in={isExpanded}>
      {children}
    </Collapse>
  );
}

function SelectorContent({
  action,
  validIds = [],
  invalidIds = [],
  handleClick,
  handleCardZoom,
}) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  if (validIds.length === 0) {
    return (
      <div className={classes.columnContainer}>
        <Typography>No eligible cards found</Typography>
      </div>
    );
  } else if (!action.includes("UPGRADE")) {
    return (
      <div className={classes.rowContainerWrap}>
        {validIds.map((id) => (
          <LegionCard
            key={id}
            id={id}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={classes.columnContainer}>
      <div className={classes.rowContainerWrap} style={{alignItems: "center"}}>
        <Typography style={{marginRight: 8}}>Equippable upgrades</Typography>
        <Divider className={classes.divider} />
      </div>
      <div className={classes.rowContainerWrap}>
        {validIds.map((id) => (
          <LegionCard
            key={id}
            id={id}
            handleClick={() => handleClick(id)}
            handleCardZoom={() => handleCardZoom(id)}
          />
        ))}
      </div>
      {invalidIds.length > 0 && (
        <div className={classes.rowContainerNoWrap}>
          <Typography style={{marginRight: 8}}>Unequippable upgrades</Typography>
          <Divider className={classes.divider} />
          <IconButton
            size="small"
            className={clsx(classes.expand, {
              [classes.expandOpen]: isExpanded,
            })}
            style={{marginLeft: 8}}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      )}
      <CollapsedContent isExpanded={isExpanded}>
        <div className={classes.rowContainerWrap}>
          {invalidIds.map((id) => (
            <LegionCard
              key={id}
              id={id}
              isBasic={true}
              handleCardZoom={() => handleCardZoom(id)}
            />
          ))}
        </div>
      </CollapsedContent>
    </div>
  );
}

export default SelectorContent;
