import {List} from "@legion-hq/types/list.class";
import {useListBuilder} from "./useList";

export function useCurrentList() {
  const {currentList} = useListBuilder();
  const list = new List(currentList);
  return list;
}
