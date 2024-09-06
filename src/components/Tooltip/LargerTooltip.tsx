import {styled, Tooltip, tooltipClasses, TooltipProps} from "@mui/material";

export const LargerTooltip = styled(({className, ...props}: TooltipProps) => (
  <Tooltip {...props} classes={{popper: className}} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 300,
    fontSize: 16,
  },
});
