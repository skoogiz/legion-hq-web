import {
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";

type Props = {
  id?: string;
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({id = "legion-modal", open, title, onClose, children}: Props) {
  const {breakpoints} = useTheme();

  const sm = useMediaQuery(breakpoints.up("sm"));

  return sm ? (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      PaperProps={{sx: {minWidth: 320}}}
    >
      <DialogTitle sx={{m: 0, p: 2}} id={`${id}-title`}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} anchor="bottom" onClose={onClose} aria-labelledby={`${id}-title`}>
      <DialogTitle sx={{m: 0, p: 2}} id={`${id}-title`}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Drawer>
  );
}
