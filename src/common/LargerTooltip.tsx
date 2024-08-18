import {Tooltip} from "@mui/material";
import {withStyles} from "@mui/styles";

// Tooltip main argument is title

const LargerTooltip = withStyles(() => ({
  tooltip: {fontSize: 16},
}))(Tooltip);

export default LargerTooltip;
