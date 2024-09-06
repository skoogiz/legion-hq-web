import {ListTemplate} from "@legion-hq/types";

export type CounterpartPayload = {
  counterpartId: string;
  unitIndex: number;
};

export type State = {
  currentList: ListTemplate;
};
