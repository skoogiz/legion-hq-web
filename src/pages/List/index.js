import React from "react";
import {withWidth} from "@mui/material";
import {ListProvider} from "@legion-hq/context/ListContext";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "@legion-hq/common/ErrorFallback";
import ListLayout from "./ListLayout";
import {useParams} from "react-router-dom";

function List({width, storedLists, updateStoredList}) {
  const {slug, listHash} = useParams();

  console.log({slug, listHash});

  return (
    <ListProvider
      width={width}
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

export default withWidth()(List);
