import {Typography, useTheme} from "@mui/material";

type Props = {
  size?: "small" | "medium" | "large";
  unit: {totalUnitCost: number; count: number};
};

const fontSize = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "0.8em";
    case "large":
      return "1.2em";
    default:
      return "1em";
  }
};

export function UnitPoints({size = "medium", unit: {totalUnitCost, count}}: Props) {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        columnGap: theme.spacing(0.5),
        alignItems: "baseline",
        paddingInline: theme.spacing(0.5),
      }}
    >
      {count > 1 && (
        <Typography sx={{fontSize: "0.8em", color: theme.palette.text.secondary}}>
          {`${totalUnitCost / count} /`}
        </Typography>
      )}
      <Typography
        sx={{
          fontSize: fontSize(size),
          fontWeight: 900,
        }}
      >
        {totalUnitCost}
      </Typography>
    </div>
  );
}
