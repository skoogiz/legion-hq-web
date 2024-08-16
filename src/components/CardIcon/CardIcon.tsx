import * as React from "react";
import {Img} from "react-image";
import {Skeleton} from "@mui/material";
import urls from "@legion-hq/constants/urls";

type Size = "small" | "medium" | "large";

type Props = {
  size?: Size;
  cardName?: string;
  cardType: string;
  imageName: string;
  handleClick?: () => void;
};

const styles: Record<string, React.CSSProperties> = {
  large: {width: 62.5, height: 50},
  medium: {width: 50, height: 40},
  small: {width: 40, height: 32},
  image: {objectFit: "cover", marginLeft: 0, borderRadius: 25},
};

export function CardIcon({
  size = "large",
  cardName,
  cardType,
  imageName,
  handleClick,
}: Props) {
  const placeholder = (
    <Skeleton variant="rectangular" style={{borderRadius: 25, ...styles[size]}} />
  );
  return (
    <Img
      decode={false}
      alt={cardName}
      src={`${urls.cdn}/${cardType}Icons/${imageName}`}
      loader={placeholder}
      style={{
        ...styles.image,
        ...styles[size],
        cursor: handleClick ? "pointer" : undefined,
      }}
      onClick={handleClick}
    />
  );
}
