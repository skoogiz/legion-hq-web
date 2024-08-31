import {Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";

type Props = {
  isOpen: boolean;
  isMobile?: boolean;
  isFullWidth?: boolean;
  title?: string;
  content: JSX.Element;
  actions?: JSX.Element;
  handleClose: () => void;
};

export function DialogModal({
  isOpen,
  isMobile,
  isFullWidth = false,
  title,
  content,
  actions,
  handleClose,
}: Props) {
  const dialogStyle = title ? {} : {padding: 0};
  return (
    <Dialog
      fullWidth={isFullWidth}
      open={isOpen}
      fullScreen={isMobile}
      onClose={handleClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent style={dialogStyle}>{content}</DialogContent>
      <DialogActions>
        {isMobile ? (
          <DialogActions>
            {actions}
            <Button size="large" onClick={handleClose}>
              Go Back
            </Button>
          </DialogActions>
        ) : (
          actions
        )}
      </DialogActions>
    </Dialog>
  );
}
