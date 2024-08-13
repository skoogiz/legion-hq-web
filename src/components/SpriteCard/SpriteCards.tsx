import * as React from "react";
import {
  mercenaryUnitCardIds,
  rebelUnitCardIds,
  empireUnitCardIds,
  republicUnitCardIds,
  separatistUnitCardIds,
} from "./SpriteCard.data";
import {parseUnitSpriteId} from "./SpriteCard.utils";
import {SpriteUnitCard} from "./SpriteUnitCard";
import {DoubleSidedCard} from "./DoubleSidedCard";

export function SpriteCards() {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      {[
        ...rebelUnitCardIds,
        ...empireUnitCardIds,
        ...republicUnitCardIds,
        ...separatistUnitCardIds,
        ...mercenaryUnitCardIds,
      ]
        .map(parseUnitSpriteId)
        .filter((card) => !!card)
        .map(({front, back}) => (
          <>
            <DoubleSidedCard
              front={
                <SpriteUnitCard
                  {...front}
                  src={front.file}
                  spriteX={front.sprite.x}
                  spriteY={front.sprite.y}
                />
              }
              back={
                <SpriteUnitCard
                  src={back.file}
                  spriteX={back.sprite.x}
                  spriteY={back.sprite.y}
                />
              }
              // front={<div>Front</div>}
              // back={<div>Back</div>}
            />

            {/* <SpriteUnitCard
              {...front}
              src={front.file}
              spriteX={front.sprite.x}
              spriteY={front.sprite.y}
            />
            {back && (
              <SpriteUnitCard
                src={back.file}
                spriteX={back.sprite.x}
                spriteY={back.sprite.y}
              />
            )} */}
          </>
        ))}
    </div>
  );
}
