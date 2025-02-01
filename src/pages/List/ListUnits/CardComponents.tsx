import {Paper, styled} from "@mui/material";

export const ItemCard = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const ItemCardSection = styled("div")({
  display: "flex",
});

export const ItemContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const ItemHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  columnGap: theme.spacing(2),
  padding: theme.spacing(0.5),
}));

export const ItemActions = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.10)",
  width: "48px",
  // borderTopRightRadius: theme.shape.borderRadius,
  // borderBottomRightRadius: theme.shape.borderRadius,
  paddingBlock: theme.spacing(0.5),
}));
