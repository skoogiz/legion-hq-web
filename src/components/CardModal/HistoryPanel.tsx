import React from "react";
import {
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {CardHistory} from "@legion-hq/types";

type Props = {
  history?: CardHistory[];
};

export function HistoryPanel({history = []}: Props) {
  if (!Array.isArray(history)) return null;
  const columnContainerStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "0px 24px 24px",
  };
  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>History</Typography>
        </AccordionSummary>
        <AccordionDetails sx={columnContainerStyles}>
          {history.map((entry) => (
            <div key={entry.description}>
              <Typography variant="caption" color="textSecondary">
                {entry.date}
              </Typography>
              <div style={{flexGrow: 1}} />
              <Typography variant="body2">{entry.description}</Typography>
              <Divider />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
