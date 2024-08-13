import * as React from "react";
import {Button} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";

type Props = {
  front: JSX.Element;
  back: JSX.Element;
  flipOnClick?: boolean;
  noButton?: boolean;
};

export function DoubleSidedCard({
  front,
  back,
  flipOnClick = false,
  noButton = false,
}: Props) {
  const [flipped, setFlipped] = React.useState<boolean>(false);

  const toggleFlipped = () => setFlipped(!flipped);

  const cardFace: React.CSSProperties = {
    boxSizing: "border-box",
    height: "100%",
    width: "100%",
    transition: "transform 0.5s ease",
    position: "absolute",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
  };

  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        rowGap: "0.5rem",
      }}
    >
      <div
        style={{
          height: "228px",
          width: "325px",
          position: "relative",
        }}
        onClick={flipOnClick || noButton ? () => toggleFlipped() : undefined}
      >
        <div
          className="back cardBack"
          style={{
            ...cardFace,
            transform: flipped
              ? "perspective(1000px) rotateY(0deg)"
              : "perspective(1000px) rotateY(180deg)",
          }}
        >
          {back}
        </div>
        <div
          className="front cardFront"
          style={{
            ...cardFace,
            transform: flipped
              ? "perspective(1000px) rotateY(-180deg)"
              : "perspective(1000px) rotateY(0deg)",
          }}
        >
          {front}
        </div>
      </div>
      {!noButton && (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<CachedIcon />}
          onClick={() => toggleFlipped()}
          sx={{
            borderRadius: 999,
          }}
        >
          Flip
        </Button>
      )}
    </div>
  );
}
