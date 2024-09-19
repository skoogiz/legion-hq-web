import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
} from "@mui/material";
import {Info as InfoIcon} from "@mui/icons-material";
import battleForcesDict from "@legion-hq/constants/battleForcesDict";

type Props = {
  battleForce: string;
};

export function BattleForceNotice({battleForce}: Props) {
  const [isBattleForceDialogOpen, setIsBattleForceDialogOpen] = React.useState(false);

  const handleOpenBFDialog = () => setIsBattleForceDialogOpen(true);
  const handleCloseBFDialog = () => setIsBattleForceDialogOpen(false);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" padding={1}>
        <Button
          endIcon={<InfoIcon />}
          variant="outlined"
          size="small"
          onClick={handleOpenBFDialog}
        >
          {battleForce}
        </Button>
      </Box>
      <Dialog open={isBattleForceDialogOpen} onClose={handleCloseBFDialog}>
        <DialogTitle>{battleForce} List Requirements</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The list building rules for the {battleForce} battleforce is{" "}
            <a
              style={{textDecoration: "none"}}
              href={battleForcesDict[battleForce].ruleUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>
            .
          </DialogContentText>
          <br />
          <DialogContentText>
            All Star Wars: Legion documents are located on the Atomic Mass Games{" "}
            <a
              style={{textDecoration: "none"}}
              href="https://atomicmassgames.com/star-wars-legion-documents"
              target="_blank"
              rel="noreferrer noopener"
            >
              website
            </a>
            .
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
