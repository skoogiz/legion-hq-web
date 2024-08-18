import React from "react";
import {Checkbox, FormGroup, FormControlLabel} from "@mui/material";

type Props = {
  label: string;
  value: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

export function ToggleButton({label, value, handleChange}: Props) {
  return (
    <FormGroup>
      <FormControlLabel
        label={label}
        labelPlacement="start"
        control={
          <Checkbox
            color="primary"
            checked={value}
            onChange={handleChange}
            style={{marginLeft: 8}}
          />
        }
      />
    </FormGroup>
  );
}
