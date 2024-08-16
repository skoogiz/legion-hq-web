import * as React from "react";
import {SpriteCardProps} from "./SpriteCard.types";
import {createSpriteCardOptions} from "./SpriteCard.utils";

interface Props extends SpriteCardProps {
  getPositionX: (x: number) => string;
  getPositionY: (y: number) => string;
}

export const SpriteCard = React.memo(function ({
  src,
  spriteX,
  spriteY,
  getPositionX,
  getPositionY,
  options = {},
}: Props) {
  const {canvasHeight, canvasWidth, imageHeight, imageWidth, scale} =
    createSpriteCardOptions(options);

  const isFullSize = scale === 1;

  const sizes = isFullSize
    ? {
        backgroundSize: `${canvasWidth}px ${canvasHeight}px`,
        height: `${imageHeight}px`,
        width: `${imageWidth}px`,
      }
    : {
        backgroundSize: `${Math.floor(canvasWidth * scale)}px ${Math.floor(canvasHeight * scale)}px`,
        height: `${Math.floor(imageHeight * scale)}px`,
        width: `${Math.floor(imageWidth * scale)}px`,
      };

  const baseStyle: React.CSSProperties = {
    background: `url(${src})`,
    backgroundRepeat: "no-repeat",
    display: "inline-block",
    ...sizes,
  };

  const getBackgroundPosition = (x: number, y: number): React.CSSProperties => ({
    backgroundPositionX: isFullSize
      ? getPositionX(x)
      : `calc(${getPositionX(x)} * ${scale})`,
    backgroundPositionY: isFullSize
      ? getPositionY(y)
      : `calc(${getPositionY(y)} * ${scale})`,
  });

  return (
    <div
      style={{
        ...baseStyle,
        ...getBackgroundPosition(spriteX, spriteY),
      }}
    ></div>
  );
});
