import * as React from "react";
import domtoimage from "dom-to-image-more";
import {Chip} from "@mui/material";
import {ListTemplate} from "@legion-hq/types";
import {Image as ImageIcon} from "@mui/icons-material";
import loadingIcon from "@legion-hq/assets/LoadingIcon.png";
import {DialogModal} from "../DialogModal";

type Props = {
  currentList: ListTemplate;
  isMobile?: boolean;
};

function ImageExport() {
  const [listSrc, setListSrc] = React.useState<string | undefined>();
  const options = {
    cacheBust: true,
    quality: 0.85,
    style: {
      backgroundColor: "#1e2125",
      font: "small-caps bold 24px/1 sans-serif",
    },
  };
  if (!listSrc) {
    const list = document.getElementById("list-content");
    domtoimage.toJpeg(list, options).then((src: string) => setListSrc(src));
    return <img alt="loading" className="pulse" src={loadingIcon} />;
  }
  return <img alt="list" src={listSrc} style={{width: "100%"}} />;
}

export function ImageExportButton({isMobile = false, currentList}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Chip
        clickable
        disabled={currentList.units.length === 0}
        variant="outlined"
        label="Export Image"
        icon={<ImageIcon />}
        style={{marginRight: 4, marginBottom: 4}}
        onClick={() => setIsOpen(true)}
      />
      <DialogModal
        isOpen={isOpen}
        isMobile={isMobile}
        title="Export Image"
        content={<ImageExport />}
        handleClose={() => setIsOpen(false)}
      />
    </div>
  );
}
