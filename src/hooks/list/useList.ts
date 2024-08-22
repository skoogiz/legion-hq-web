import * as React from "react";
import ListContext from "@legion-hq/context/ListContext";

export function useList() {
  const context = React.useContext(ListContext);
  return context;
}
