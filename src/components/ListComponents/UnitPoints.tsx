import {Typography, TypographyVariant} from "@mui/material";

type Props = {
  unit: {totalUnitCost: number; count: number};
  variant?: TypographyVariant;
};

export function UnitPoints({unit: {totalUnitCost, count}, variant = "body1"}: Props) {
  return (
    <Typography variant={variant}>
      {count > 1 && `(${totalUnitCost / count}) `}
      {totalUnitCost}
    </Typography>
  );
}
