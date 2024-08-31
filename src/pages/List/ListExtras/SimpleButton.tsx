import React from "react";
import {Chip} from "@mui/material";

type Props = {
  timeout?: number;
  timeoutMessage?: string;
  isDisabled?: boolean;
  icon?: JSX.Element;
  label: string;
  handleClick: () => void;
};

export function SimpleButton({
  timeout,
  timeoutMessage = "Processing...",
  isDisabled,
  icon,
  label,
  handleClick,
}: Props) {
  const [isTimedout, setIsTimedout] = React.useState(false);
  const onClick = timeout
    ? () => {
        handleClick();
        setIsTimedout(true);
        setTimeout(() => setIsTimedout(false), timeout);
      }
    : handleClick;
  return (
    <Chip
      clickable
      disabled={isDisabled ? isDisabled : isTimedout}
      variant="outlined"
      icon={icon}
      label={isTimedout ? timeoutMessage : label}
      onClick={onClick}
      style={{marginRight: 4, marginBottom: 4}}
    />
  );
}
