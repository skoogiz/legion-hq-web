import {LegionCard} from "@legion-hq/types";
import {useListBuilder} from "./useList";
import {useCards} from "@legion-hq/data-access/hooks/useCards";
import * as React from "react";
import {noop} from "lodash";

type CounterpartHandler = {
  card?: LegionCard;
  addCounterpart: (unitIndex: number) => void;
  removeCounterpart: (unitIndex: number) => void;
};

export function useCounterpartHandler(counterpartId?: string): CounterpartHandler {
  const {cards} = useCards();
  const {
    listActions: {addCounterpart, removeCounterpart},
  } = useListBuilder();

  const handler = React.useMemo(
    () => ({
      card: counterpartId ? cards[counterpartId] : undefined,
      addCounterpart: counterpartId
        ? (unitIndex: number) => addCounterpart(unitIndex, counterpartId)
        : noop,
      removeCounterpart: counterpartId
        ? (unitIndex: number) => removeCounterpart(unitIndex, counterpartId)
        : noop,
    }),
    [counterpartId, cards, addCounterpart, removeCounterpart],
  );

  return handler;
}
