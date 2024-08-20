import React from "react";
import {
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import keywords from "@legion-hq/constants/keywords";

type Props = {
  keywords?: string[];
};

export function KeywordsPanel({keywords: cardKeywords = []}: Props) {
  if (!Array.isArray(cardKeywords) || cardKeywords.length === 0) return null;
  const columnContainerStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "0px 24px 24px",
  };
  return (
    <React.Fragment>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Keywords</Typography>
        </AccordionSummary>
        <AccordionDetails sx={columnContainerStyles}>
          {cardKeywords.map((keyword) => (
            <div key={keyword}>
              <Typography variant="caption" color="textSecondary">
                {keyword}
              </Typography>
              <div style={{flexGrow: 1}} />
              <Typography variant="body2">
                {keyword in keywords ? keywords[keyword] : "No definition found."}
              </Typography>
              <Divider />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
