import * as React from "react";
import {ValueX, ValueY} from "./SpriteCard.types";

type Props = {
  src: string;
  spriteX: ValueX;
  spriteY: ValueY;
};

const getPositionX = (x: ValueX) => {
  switch (x) {
    case 1:
      return "-70px";

    default:
      return "-396px";
  }
};

const getPositionY = (y: ValueY) => {
  switch (y) {
    case 1:
      return "-47px";
    case 2:
      return "-277px";
    case 3:
      return "-506px";
    default:
      return "-736px";
  }
};

const getBackgroundPosition = (x: ValueX, y: ValueY): React.CSSProperties => ({
  backgroundPositionX: getPositionX(x),
  backgroundPositionY: getPositionY(y),
});

export function SpriteUnitCard({src, spriteX, spriteY}: Props) {
  const baseStyle: React.CSSProperties = {
    background: `url(${src})`,
    display: "inline-block",
    height: "228px",
    width: "325px",
  };

  return (
    <div
      style={{
        ...baseStyle,
        ...getBackgroundPosition(spriteX, spriteY),
      }}
    ></div>
  );
}
