import * as React from "react";
import {Img} from "react-image";
import {css, Skeleton, styled} from "@mui/material";
import urls from "@legion-hq/constants/urls";
import {useCards} from "@legion-hq/data-access/hooks/useCards";

const Container = styled("div")<{isLoadout: boolean}>`
  margin-right: 4px;
  z-index: ${({isLoadout}) => (isLoadout ? 0 : 1)};
  ${({isLoadout}) =>
    isLoadout &&
    css`
      margin-left: -50px;
    `}
  &:hover {
    transition: 0.25s ease;
    cursor: pointer;
    opacity: 0.75;
    ${({isLoadout}) =>
      isLoadout &&
      css`
        z-index: 1;
      `}
  }
`;

const styles: Record<string, React.CSSProperties> = {
  unit: {width: 210, height: 150},
  upgrade: {width: "auto", minWidth: 96, height: 150},
  command: {width: 150, height: 210},
  counterpart: {width: 210, height: 150},
  flaw: {width: "auto", height: 150},
};

type Props = {
  id: string;
  handleClick: () => void;
  isLoadout?: boolean;
};

export function CardImage({id, handleClick, isLoadout = false}: Props) {
  const {cards} = useCards();
  const card = cards[id];
  return (
    <Container isLoadout={isLoadout}>
      <Img
        alt={card.cardName}
        src={`${urls.cdn}/${card.cardType}Cards/${card.imageName}`}
        loader={<Skeleton variant="rectangular" sx={{...styles[card.cardType]}} />}
        style={styles[card.cardType]}
        onClick={handleClick}
      />
    </Container>
  );
}
