import {TextField} from "@mui/material";
import {ListTemplate} from "@legion-hq/types";
import {ClipboardButton} from "../ListExtras/ClipboardButton";
import {DialogModal} from "../ListExtras/DialogModal";
import generateLink from "../ListExtras/generateLink";

type Props = {
  currentList: ListTemplate;
  onClose: () => void;
};

export function LinkDialog({currentList, onClose}: Props) {
  const listLink = generateLink(currentList);
  return (
    <DialogModal
      isOpen
      title="Legion HQ Link"
      content={<TextField value={listLink} />}
      actions={<ClipboardButton content={listLink} />}
      handleClose={() => onClose()}
    />
  );
}
