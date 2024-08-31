import * as React from "react";
import {Button, ButtonOwnProps} from "@mui/material";

type Props = Pick<ButtonOwnProps, "variant"> & {
  content: string;
};

export function ClipboardButton({content, variant = "text"}: Props) {
  const [copySuccess, setCopySuccess] = React.useState(false);
  return (
    <Button
      variant={variant}
      disabled={copySuccess}
      onClick={() => {
        navigator.clipboard.writeText(content);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 500); // 0.5 second cooldown
      }}
    >
      {copySuccess ? "Copied to clipboard!" : "Copy to clipboard"}
    </Button>
  );
}
