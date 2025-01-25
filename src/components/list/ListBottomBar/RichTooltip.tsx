import {
  Box,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  PopperPlacementType,
  styled,
  SxProps,
  Theme,
} from "@mui/material";
import React, {ReactElement} from "react";

interface Props {
  content: ReactElement;
  children: ReactElement;
  open: boolean;
  onClose?: () => void;
  arrow?: boolean;
  placement?: PopperPlacementType;
  sx?: SxProps<Theme>;
}

// Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js
const Arrow = styled("span")(({theme}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em" /* = width / sqrt(2) = (length of the hypotenuse) */,
  boxSizing: "border-box",
  color: theme.palette.background.paper,
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    boxShadow: theme.shadows[1],
    backgroundColor: "currentColor",
    transform: "rotate(45deg)",
  },
}));

// Stolen from https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Tooltip/Tooltip.js and https://github.com/mui-org/material-ui/blob/4f2a07e140c954b478a6670c009c23a59ec3e2d4/docs/src/pages/components/popper/ScrollPlayground.js
const RichPopper = styled(Popper)({
  zIndex: 2000,
  [`&[data-popper-placement*="bottom"] .popper-arrow`]: {
    top: 0,
    left: 0,
    marginTop: "-0.71em",
    marginLeft: 4,
    marginRight: 4,
    "&::before": {
      transformOrigin: "0 100%",
    },
  },
  [`&[data-popper-placement*="top"] .popper-arrow`]: {
    bottom: 0,
    left: 0,
    marginBottom: "-0.71em",
    marginLeft: 4,
    marginRight: 4,
    "&::before": {
      transformOrigin: "100% 0",
    },
  },
  [`&[data-popper-placement*="right"] .popper-arrow`]: {
    left: 0,
    marginLeft: "-0.71em",
    height: "1em",
    width: "0.71em",
    marginTop: 4,
    marginBottom: 4,
    "&::before": {
      transformOrigin: "100% 100%",
    },
  },
  [`&[data-popper-placement*="left"] .popper-arrow`]: {
    right: 0,
    marginRight: "-0.71em",
    height: "1em",
    width: "0.71em",
    marginTop: 4,
    marginBottom: 4,
    "&::before": {
      transformOrigin: "0 0",
    },
  },
});

const RichTooltip = ({
  placement = "top",
  arrow = false,
  open,
  onClose = () => {},
  content,
  children,
  sx,
}: Props) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLElement | null>(null);
  const [childNode, setChildNode] = React.useState<HTMLElement | null>(null);

  return (
    <div>
      {React.cloneElement(children, {...children.props, ref: setChildNode})}
      <RichPopper
        open={open}
        anchorEl={childNode}
        placement={placement}
        transition
        modifiers={[
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              rootBoundary: "document",
            },
          },
          {
            name: "arrow",
            enabled: arrow,
            options: {
              element: arrowRef,
            },
          },
        ]}
        sx={sx}
      >
        {({TransitionProps}) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={onClose}>
                <Paper
                  sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    maxWidth: 1000,
                  })}
                >
                  {arrow ? <Arrow ref={setArrowRef} className="popper-arrow" /> : null}
                  <Box
                    sx={(theme) => ({
                      padding: theme.spacing(2),
                    })}
                  >
                    {content}
                  </Box>
                </Paper>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </RichPopper>
    </div>
  );
};

export default RichTooltip;
