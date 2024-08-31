import * as React from "react";
import QRCode from "qrcode.react";
import {Chip} from "@mui/material";
import {CropFree as QRCodeIcon} from "@mui/icons-material";
import generateLink from "./generateLink";
import {DialogModal} from "./DialogModal";
import {ListTemplate} from "@legion-hq/types";

type Props = {
  currentList: ListTemplate;
};

export function QRButton({currentList}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const listLink = generateLink(currentList);
  return (
    <div style={{marginRight: 4, marginBottom: 4}}>
      <Chip
        clickable
        variant="outlined"
        label="Show QR Code"
        icon={<QRCodeIcon />}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isOpen={isOpen}
        title="QR Code"
        content={<QRCode size={196} value={listLink} />}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
}
