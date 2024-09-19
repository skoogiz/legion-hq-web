import {useMediaQuery, TextField, useTheme} from "@mui/material";
import {ListTemplate} from "@legion-hq/types";
import {generateTTSJSONText} from "@legion-hq/constants/listOperations";
import {DialogModal} from "../ListExtras/DialogModal";
import {ClipboardButton} from "../ListExtras/ClipboardButton";

type Props = {
  currentList: ListTemplate;
  onClose: () => void;
};

function DialogContent({content}: {content: string}) {
  return (
    <div style={{display: "flex", flexFlow: "column nowrap", alignItems: "center"}}>
      <TextField
        multiline
        size="small"
        variant="outlined"
        value={content}
        style={{padding: 8, width: "100%"}}
      />
    </div>
  );
}

export function TTSTextExportDialog({currentList, onClose}: Props) {
  const theme = useTheme();
  const ttsJSON = generateTTSJSONText(currentList);
  const isFullscreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <DialogModal
      isFullWidth={true}
      isMobile={isFullscreen}
      isOpen
      actions={<ClipboardButton content={ttsJSON} />}
      content={<DialogContent content={ttsJSON} />}
      handleClose={() => onClose()}
    />
  );
}
