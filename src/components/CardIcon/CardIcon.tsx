import * as React from "react";
import {Img} from "react-image";
import {Avatar, AvatarOwnProps, Skeleton} from "@mui/material";
import urls from "@legion-hq/constants/urls";

type Size = "small" | "medium" | "large";

type Props = {
  size?: Size;
  cardName?: string;
  cardType: string;
  imageName: string;
  handleClick?: () => void;
} & Pick<AvatarOwnProps, "variant">;

const styles: Record<string, React.CSSProperties> = {
  large: {width: 64, height: 48},
  medium: {width: 48, height: 36},
  small: {width: 40, height: 30},
  image: {objectFit: "cover", marginLeft: 0, borderRadius: 25},
};

export function CardIcon({
  size = "large",
  cardName,
  cardType,
  imageName,
  variant = "circular",
  handleClick,
}: Props) {
  /*
  const placeholder = (
    <Skeleton variant="rectangular" style={{borderRadius: 25, ...styles[size]}} />
  );
  */
  return (
    <>
      <Avatar
        variant={variant === "square" ? "square" : "rounded"}
        alt={cardName}
        src={`${urls.cdn}/${cardType}Icons/${imageName}`}
        sx={{
          ...(variant === "circular" ? {borderRadius: 24} : {}),
          ...styles[size],
          cursor: handleClick ? "pointer" : undefined,
        }}
        onClick={handleClick}
        //loader={placeholder}
        // decode={false}
      />
      {/*
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
      */}
    </>
  );
}
