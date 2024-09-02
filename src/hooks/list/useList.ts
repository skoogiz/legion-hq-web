import * as React from "react";
import {ListContext} from "@legion-hq/context/ListContext";

export function useListBuilder() {
  const context = React.useContext(ListContext);
  return context;
}
