import React from "react";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useCurrentList} from "@legion-hq/hooks/list/useCurrentList";
import {Chip, Paper, useTheme} from "@mui/material";
import {Modal} from "@legion-hq/ui/Modal/Modal";
import {useKeywords} from "@legion-hq/data-access/hooks/useKeywords";

export function KeywordSection() {
  const [open, setOpen] = React.useState(false);
  const [currentKeyword, setCurrentKeyword] = React.useState<string | null>(null);
  const {keywords} = useCards();
  const {cardIds} = useCurrentList();
  const {getKeywordText} = useKeywords();

  const openModal = (keyword: string) => {
    setCurrentKeyword(keyword);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setCurrentKeyword(null);
  };

const theme = useTheme();

  return (
    <>
      <div style={{paddingBlock: theme.spacing(3),paddingInline: theme.spacing(2)}}>
        <Paper style={{padding: theme.spacing(2)}}>
        <h5>Keywords</h5>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {keywords(cardIds)
            .sort()
            .map((keyword) => (
              <Chip key={keyword} label={keyword} onClick={() => openModal(keyword)} />
            ))}
        </div>
        </Paper>
      </div>
      {currentKeyword && (
        <Modal open={open} onClose={closeModal} title={currentKeyword}>
          {getKeywordText(currentKeyword)}
        </Modal>
      )}
    </>
  );
}
