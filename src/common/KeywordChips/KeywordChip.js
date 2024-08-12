import React from "react";
import {Chip, ClickAwayListener, Tooltip, Typography} from "@mui/material";
import keywords from "@legion-hq/constants/keywords";

function KeywordChip({keyword, size}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleTooltipOpen = () => setIsOpen(true);
  const handleTooltipClose = () => setIsOpen(false);

  let definition = "No definition found.";
  if (keyword in keywords) definition = keywords[keyword];
  const title = <Typography variant="body1">{definition}</Typography>;
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title={title}
        open={isOpen}
        onClose={handleTooltipClose}
        PopperProps={{disablePortal: true}}
      >
        <Chip clickable size={size} label={keyword} onClick={handleTooltipOpen} />
      </Tooltip>
    </ClickAwayListener>
  );
}

export default KeywordChip;
