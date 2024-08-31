import {Typography, TypographyProps} from "@mui/material";

export function Text(props: TypographyProps) {
  return <Typography variant="body2" component={"span"} {...props} />;
}
