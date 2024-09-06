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
import {Grid} from "@mui/material";

export function SpriteCards() {
  return (
    <Grid container spacing={2}>
      {[
        ...rebelUnitCardIds,
        ...empireUnitCardIds,
        ...republicUnitCardIds,
        ...separatistUnitCardIds,
        ...mercenaryUnitCardIds,
      ]
        .map(parseUnitSpriteId)
        .filter((card) => !!card)
        .map(({front, back}, index) => (
          <Grid key={`flipCard_${index}`} item xs={12} md={6} lg={4} xl={3}>
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
                  src={back?.file ?? front.file}
                  spriteX={back?.sprite.x ?? front.sprite.x}
                  spriteY={back?.sprite.y ?? front.sprite.y}
                />
              }
            />
          </Grid>
        ))}
    </Grid>
  );
}
