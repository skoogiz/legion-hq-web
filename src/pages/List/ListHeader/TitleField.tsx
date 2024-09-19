import React from "react";
import {TextField} from "@mui/material";

type Props = {
  // activations: number;
  title: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TitleField({title, handleChange}: Props) {
  return (
    <TextField
      variant="filled"
      value={title}
      // helperText={`${activations} ${activations === 1 ? "activation" : "activations"}`}
      onChange={handleChange}
      fullWidth
      inputProps={{
        style: {fontSize: "1.5rem", padding: "0.25rem 0.75rem"},
      }}
    />
  );
}
