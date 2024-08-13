import {SpriteId, SpriteImage, UnitCard, UnitCardImage} from "./SpriteCard.types";

export const getSrc = (page: number) =>
  `/data/2.6.0/SWQ_PlayerCards-4/page_${`${page}`.padStart(2, "0")}.png`;

// const SPRITE_ID = /^\d+_\d+_\d+$/;

const UNIT_SPRITE_ID = /^\d+_[1-2]+_[1-4]+(:\d+_[1-2]+_[1-4]+)?$/;

/**
 * Only use on sprite ids.
 *
 * @param spritsId Format: <page>_<sprite_x>_<sprite_y>
 * @returns
 */
const parseSpriteId = (spritsId: SpriteId): SpriteImage => {
  const [page, x, y] = spritsId.split("_");
  return {
    file: getSrc(+page),
    sprite: {x: +x, y: +y},
  };
};

/**
 * Parse unit card id
 *
 * Sample: <FRONT_ID>:<BACK_ID> with the following formula <page>_<sprite_x>_<sprite_y>:<page>_<sprite_x>_<sprite_y>
 *
 */
export function parseUnitSpriteId(unitSpriteId: string): UnitCard | null {
  if (!UNIT_SPRITE_ID.test(unitSpriteId)) return null;

  const cardIds = unitSpriteId.split(":") as SpriteId[];

  return {
    front: parseSpriteId(cardIds[0]) as UnitCardImage,
    back: cardIds.length > 1 ? (parseSpriteId(cardIds[1]) as UnitCardImage) : undefined,
  };
}
