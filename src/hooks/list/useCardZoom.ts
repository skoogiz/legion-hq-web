import {useListBuilder} from "./useList";

export function useCardZoom() {
  const {handleCardZoom} = useListBuilder();
  return {
    handleCardZoom,
    getCardZoomCallback: (cardId: string) => () => handleCardZoom(cardId),
  };
}
