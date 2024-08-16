import React from "react";
import {useParams} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import {useMediaQuery, useTheme} from "@mui/material";
import {ListProvider} from "@legion-hq/context/ListContext";
import ErrorFallback from "@legion-hq/common/ErrorFallback";
import {ListTemplate} from "@legion-hq/types";
import ListLayout from "./ListLayout";

type Props = {
  storedLists: Record<string, ListTemplate>;
  updateStoredList: (list: ListTemplate) => void;
};

export function List({storedLists, updateStoredList}: Props) {
  const {breakpoints} = useTheme();

  const isSmallScreen = useMediaQuery(breakpoints.down("md"));

  const {slug, listHash} = useParams();

  return (
    <ListProvider
      isSmallScreen={isSmallScreen}
      slug={slug}
      listHash={listHash}
      storedLists={storedLists}
      updateStoredList={updateStoredList}
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ListLayout />
      </ErrorBoundary>
    </ListProvider>
  );
}
