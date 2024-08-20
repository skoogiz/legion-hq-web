import React from "react";
import {Button} from "@mui/material";
import DataContext from "@legion-hq/context/DataContext";
import {LargerTooltip} from "@legion-hq/components";

type Props = {
  auth: unknown;
};

export function LoginButton({auth}: Props) {
  const {isLoginDisabled, loginTooltipText, loginButtonText, loginHandler} =
    React.useContext(DataContext);
  return (
    <LargerTooltip arrow title={loginTooltipText}>
      <Button
        color="primary"
        variant="contained"
        disabled={isLoginDisabled}
        onClick={loginHandler}
      >
        {loginButtonText}
      </Button>
    </LargerTooltip>
  );
}
