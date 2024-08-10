import React, { useState } from 'react';
import {
  useMediaQuery,
  Chip,
  TextField
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Description as TextIcon } from '@material-ui/icons';
import { generateTTSJSONText } from 'constants/listOperations';
import DialogModal from './DialogModal';
import ClipboardButton from './ClipboardButton';

function DialogContent({
  currentList, tabValue, content
}) {
  return (
    <div style={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center' }}>
      <TextField
        multiline
        size="small"
        variant="outlined"
        value={content}
        style={{ padding: 8, width: '100%' }}
      />
    </div>
  );
}

function TTSTextExportButton({ currentList }) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [textType, setTextType] = useState(0);
  const ttsJSON = generateTTSJSONText(currentList);

  const isFullscreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div style={{ marginRight: 4, marginBottom: 4 }}>
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
        content={
          <DialogContent
            currentList={currentList}
            tabValue={textType}
            content={ttsJSON}
          />
        }
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TTSTextExportButton;
