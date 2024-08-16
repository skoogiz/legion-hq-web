import * as React from "react";
import {Typography} from "@mui/material";
import ranks from "@legion-hq/constants/ranks";
import upgradeTypes from "@legion-hq/constants/upgradeTypes";
import type {RankType, UpgradeType} from "@legion-hq/types";

const styles: Record<string, React.CSSProperties> = {
  outerRowContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: -10,
  },
  innerColumnContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  numberSpan: {
    width: 22,
    height: 22,
    borderRadius: 25,
    left: 12,
    backgroundColor: "white",
    position: "relative",
    border: "1px solid #1e2125",
  },
  imageSpan: {
    width: 22,
    height: 22,
    borderRadius: 25,
    left: 12,
    top: 1,
    backgroundColor: "white",
    position: "relative",
    border: "1px solid #1e2125",
  },
  typography: {bottom: 2, left: 6, color: "black", position: "relative"},
  smallTypography: {bottom: 2, left: 1.5, color: "black", position: "relative"},
  image: {width: 20, height: 20},
  hidden: {visibility: "hidden"},
};

type Props = {
  avatar: JSX.Element;
  count?: number;
  upgradeType?: UpgradeType;
  rank?: RankType;
};

export function IconBadge({avatar, count = 1, upgradeType, rank}: Props) {
  let alt = "";
  let src = "";
  if (upgradeType && upgradeType in upgradeTypes) {
    alt = upgradeType;
    src = upgradeTypes[upgradeType].icon;
  } else if (rank && rank in ranks) {
    alt = rank;
    src = ranks[rank].icon;
  }
  return (
    <div style={styles.outerRowContainer}>
      <div style={styles.innerColumnContainer}>
        <span
          style={{
            ...styles.numberSpan,
            ...(count < 2 ? styles.hidden : {}),
          }}
        >
          <Typography
            variant="button"
            style={count >= 10 ? styles.smallTypography : styles.typography}
          >
            {count}
          </Typography>
        </span>
        <span style={styles.imageSpan}>
          <img alt={alt} src={src} style={styles.image} />
        </span>
      </div>
      {avatar}
    </div>
  );
}
