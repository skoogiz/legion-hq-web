import React from "react";
import {Img} from "react-image";
import {Typography, Accordion, AccordionSummary, AccordionDetails} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import urls from "@legion-hq/constants/urls";

type Props = {
  card: {cardType: string; imageName: string};
  usingOriginalImage?: boolean;
};

export function ImagePanel({card, usingOriginalImage = false}: Props) {
  if (!card) return null;
  const {cardType, imageName} = card;
  return (
    <React.Fragment>
      <Accordion defaultExpanded={!usingOriginalImage}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            {usingOriginalImage ? "Original Card Image" : "Current Card Image"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{padding: "0px 24px 24px"}}>
          <Img
            src={`${urls.cdn}/${cardType}Cards/${usingOriginalImage ? `original-${imageName}` : imageName}`}
            style={{width: "100%"}}
          />
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
