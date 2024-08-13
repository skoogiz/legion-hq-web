import * as React from "react";

type Props = {
  front: JSX.Element;
  back: JSX.Element;
};

export function DoubleSidedCard({front, back}: Props) {
  const [flipped, setFlipped] = React.useState<boolean>(false);

  const toggleFlipped = () => setFlipped(!flipped);

  const cardFace: React.CSSProperties = {
    boxSizing: "border-box",
    borderRadius: "0.25rem",
    height: "100%",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    width: "100%",
    transition: "transform 0.5s ease",
    position: "absolute",
    //   -webkit-backface-visibility: hidden;
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    //   backgroundColor: #ebf4ff;
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
          //   margin-top: 1rem;
          //   height: 300px;
          //   width: 250px;
          height: "228px",
          width: "325px",
          position: "relative",
          //   border-radius: 0.25rem;
        }}
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
      <button type="button" onClick={() => toggleFlipped()}>
        {flipped ? "Front" : "Back"}
      </button>
    </div>
  );
}
