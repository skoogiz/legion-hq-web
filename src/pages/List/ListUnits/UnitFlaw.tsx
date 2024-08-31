import {Chip} from "@mui/material";
import {CardIcon} from "@legion-hq/components";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import {useList} from "@legion-hq/hooks/list/useList";

type Props = {
  flawId: string;
};

function UnitFlaw({flawId}: Props) {
  const {cards} = useCards();
  const {handleCardZoom} = useList();
  const flawCard = cards[flawId];
  const chipStyle = {marginRight: 4, marginBottom: 4, backgroundColor: "#512818"};
  return (
    <div>
      <Chip
        label={`${flawCard.displayName ? flawCard.displayName : flawCard.cardName}`}
        avatar={
          <CardIcon
            size="small"
            cardType="command"
            imageName={flawCard.imageName}
            handleClick={() => handleCardZoom(flawId)}
          />
        }
        style={chipStyle}
      />
    </div>
  );
}

export default UnitFlaw;
