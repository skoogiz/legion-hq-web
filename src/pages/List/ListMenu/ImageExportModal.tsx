import * as React from "react";
import domtoimage from "dom-to-image-more";
import loadingIcon from "@legion-hq/assets/LoadingIcon.png";
import {DialogModal} from "../ListExtras/DialogModal";

type Props = {
  isMobile?: boolean;
  onClose: () => void;
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

export function ImageExportModal({isMobile = false, onClose}: Props) {
  return (
    <DialogModal
      isOpen
      isMobile={isMobile}
      title="Export Image"
      content={<ImageExport />}
      handleClose={() => onClose()}
    />
  );
}
