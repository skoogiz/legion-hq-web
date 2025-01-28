import {Typography, TypographyOwnProps} from "@mui/material";
import {useCards} from "@legion-hq/data-access/hooks/useCards";

type TitleProps = {
  name: string;
  displayName?: string;
  title?: string;
  isUnique?: boolean;
};

export function CardName({name, displayName, title, isUnique}: TitleProps) {
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <Typography>{`${isUnique ? "• " : ""}${displayName ?? name}`}</Typography>
      {title && (
        <Typography
          sx={(theme) => ({fontSize: "0.8em", color: theme.palette.text.secondary})}
        >
          {title}
        </Typography>
      )}
    </div>
  );
}

type Props = Pick<TypographyOwnProps, "variant"> & {
  id: string;
};

export function LegacyCardName({id}: Props) {
  const {cards} = useCards();
  const card = cards[id];
  return (
    <CardName
      name={card.cardName}
      displayName={card.displayName}
      title={card.title}
      isUnique={card.isUnique}
    />
  );
}
