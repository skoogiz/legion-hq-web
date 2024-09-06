import {CardIcon, IconBadge} from "@legion-hq/components";
import {useCard} from "@legion-hq/data-access/hooks/useCard";

type Props = {
  id: string;
  count?: number;
  handleClick?: () => void;
};

export function UnitAvatar({id, count = 1, handleClick}: Props) {
  const {card} = useCard(id);
  if (!card) return null;
  if (card.cardType === "counterpart") {
    return (
      <CardIcon
        size="medium"
        cardType={card.cardType}
        cardName={card.cardName}
        imageName={card.imageName}
        handleClick={handleClick}
      />
    );
  }
  return (
    <IconBadge
      count={count}
      rank={card.rank}
      avatar={
        <CardIcon
          cardName={card.cardName}
          cardType={card.cardType}
          imageName={card.imageName}
          handleClick={handleClick}
        />
      }
    />
  );
}
