import {cloneDeep} from "lodash";
import * as ListFn from "@legion-hq/constants/listOperations";
import {type ListAction, ListActionType} from "./list.actions";
import {CounterpartPayload, type State} from "./list.types";
import {ListTemplate} from "@legion-hq/types";

const addCounterpart = (
  state: State,
  {counterpartId, unitIndex}: CounterpartPayload,
): State => {
  const currentList = ListFn.addCounterpart(
    cloneDeep(state.currentList),
    unitIndex,
    counterpartId,
  );
  return {
    ...state,
    currentList,
  };
};

const removeCounterpart = (state: State, {unitIndex}: CounterpartPayload) => {
  const currentList = ListFn.removeCounterpart(cloneDeep(state.currentList), unitIndex);
  return {
    ...state,
    currentList,
  };
};

const updateList = (state: State, {list}: {list: ListTemplate}) => {
  return {
    ...state,
    currentList: list,
  };
};

export const reducer = (state: State, action: ListAction): State => {
  switch (action.action) {
    case ListActionType.ADD_COUNTERPART:
      return addCounterpart(state, action.payload);
    case ListActionType.REMOVE_COUNTERPART:
      return removeCounterpart(state, action.payload);
    case ListActionType.UPDATE_LIST:
      return updateList(state, action.payload);
    default:
      return state;
  }
};
