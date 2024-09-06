import {styled, Typography} from "@mui/material";

export function Title({title, spacing = false}: {title: string; spacing?: boolean}) {
  return (
    <Typography variant="body2" sx={spacing ? {marginRight: 4} : undefined}>
      {title}
    </Typography>
  );
}

export const RowContainer = styled("div")`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
`;
