import {Img} from "react-image";
import {Skeleton} from "@mui/material";
import {CSSProperties} from "@mui/styles";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import urls from "@legion-hq/constants/urls";

const styles: Record<string, CSSProperties> = {
  container: {
    marginRight: 4,
    zIndex: 1,
    "&:hover": {
      opacity: 0.75,
      transition: ".25s ease",
      cursor: "help",
    },
  },
  unit: {width: 210, height: 150},
  upgrade: {width: "auto", height: 150},
  command: {width: 150, height: 210},
  flaw: {width: "auto", height: 150},
};

type Props = {
  id: string;
  handleClick: () => void;
};

export function CardImage({id, handleClick}: Props) {
  const {cards} = useCards();
  const card = cards[id];
  return (
    <div style={styles.container}>
      <Img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.imageName}`}
        loader={<Skeleton sx={styles[card.cardType]} />}
        onClick={handleClick}
        style={{...styles[card.cardType]}}
      />
    </div>
  );
}
