import React from "react";
import {TextField} from "@mui/material";

type Props = {
  activations: number;
  title: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TitleField({activations, title, handleChange}: Props) {
  return (
    <TextField
      value={title}
      helperText={`${activations} ${activations === 1 ? "activation" : "activations"}`}
      onChange={handleChange}
    />
  );
}
