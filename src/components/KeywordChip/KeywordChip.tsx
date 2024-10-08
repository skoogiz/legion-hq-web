import * as React from "react";
import {Chip, ClickAwayListener, Tooltip, Typography} from "@mui/material";
import keywords from "@legion-hq/constants/keywords";

type Props = {
  keyword: string;
  size: "small" | "medium";
};

export function KeywordChip({keyword, size}: Props) {
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
