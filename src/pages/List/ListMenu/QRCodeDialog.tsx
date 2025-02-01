import QRCode from "qrcode.react";
import {ListTemplate} from "@legion-hq/types";
import {DialogModal} from "../ListExtras/DialogModal";
import generateLink from "../ListExtras/generateLink";

type Props = {
  currentList: ListTemplate;
  onClose: () => void;
};

export function QRCodeDialog({currentList, onClose}: Props) {
  const listLink = generateLink(currentList);
  return (
    <DialogModal
      isOpen
      title="QR Code"
      content={<QRCode size={196} value={listLink} />}
      handleClose={() => onClose()}
    />
  );
}
