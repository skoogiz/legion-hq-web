import React from "react";
import clsx from "clsx";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Collapse,
  IconButton,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import LegionCard from "@legion-hq/common/LegionCard";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {transform: "rotate(180deg)"},
  divider: {flexGrow: 1, margin: "0 8px"},
}));

function capitalizeFirstLetters(words) {
  const strings = words.split(" ").map((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  return strings.join(" ");
}

function CollapsedContent({label, cardIds, handleCardZoom}) {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  return (
    <div style={{display: "flex", flexFlow: "column nowrap"}}>
      <div style={{display: "flex", flexFlow: "row wrap", alignItems: "center"}}>
        <Typography>{capitalizeFirstLetters(label)}</Typography>
        <Divider className={classes.divider} />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: isExpanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <Collapse unmountOnExit timeout="auto" in={isExpanded}>
        <div style={{display: "flex", flexFlow: "row wrap"}}>
          {cardIds.map((cardId) => (
            <LegionCard
              key={cardId}
              id={cardId}
              isBasic={true}
              handleCardZoom={() => handleCardZoom(cardId)}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
}

function BasicCardChips({title, cardDict, handleCardZoom}) {
  const keys = Object.keys(cardDict);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{padding: 16}}>
        <div style={{display: "flex", flexFlow: "column", width: "100%"}}>
          {keys.map((key) => (
            <CollapsedContent
              key={key}
              label={key}
              cardIds={cardDict[key]}
              handleCardZoom={handleCardZoom}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default BasicCardChips;
