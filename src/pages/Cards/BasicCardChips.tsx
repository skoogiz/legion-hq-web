import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  Collapse,
  IconButton,
} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {LegionCard} from "@legion-hq/components";

const styles = {
  divider: {flexGrow: 1, margin: "0 8px"},
};

function capitalizeFirstLetters(words: string) {
  const strings = words.split(" ").map((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  return strings.join(" ");
}

type Props = {
  title: string;
  cardDict: Record<string, string[]>;
  handleCardZoom: (cardId: string) => void;
};

type ContentProps = {
  label: string;
  cardIds: string[];
  handleCardZoom: (cardId: string) => void;
};

function CollapsedContent({label, cardIds, handleCardZoom}: ContentProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpandClick = () => setIsExpanded(!isExpanded);
  return (
    <div style={{display: "flex", flexFlow: "column nowrap"}}>
      <div style={{display: "flex", flexFlow: "row wrap", alignItems: "center"}}>
        <Typography>{capitalizeFirstLetters(label)}</Typography>
        <Divider style={styles.divider} />
        <IconButton
          sx={(theme) => ({
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
              duration: theme.transitions.duration.shortest,
            }),
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

export function BasicCardChips({title, cardDict, handleCardZoom}: Props) {
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
