import * as React from "react";
import {useMediaQuery, Chip, TextField, useTheme} from "@mui/material";
import {Description as TextIcon} from "@mui/icons-material";
import {ListTemplate} from "@legion-hq/types";
import {generateTTSJSONText} from "@legion-hq/constants/listOperations";
import {DialogModal} from "./DialogModal";
import {ClipboardButton} from "./ClipboardButton";

type Props = {
  currentList: ListTemplate;
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

export function TTSTextExportButton({currentList}: Props) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const ttsJSON = generateTTSJSONText(currentList);
  const isFullscreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div style={{marginRight: 4, marginBottom: 4}}>
      <Chip
        clickable
        variant="outlined"
        label="Export TTS JSON"
        icon={<TextIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isFullWidth={true}
        isMobile={isFullscreen}
        isOpen={isOpen}
        actions={<ClipboardButton content={ttsJSON} />}
        content={<DialogContent content={ttsJSON} />}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
}
