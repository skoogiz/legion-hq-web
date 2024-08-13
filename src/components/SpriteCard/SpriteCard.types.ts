export type ValueX = 1 | 2;

export type ValueY = 1 | 2 | 3 | 4;

export type SpriteId = `${number}_${number}_${number}`;

export interface SpriteImage {
  file: string;
  sprite: {x: number; y: number};
}

export interface UnitCardImage extends SpriteImage {
  sprite: {x: ValueX; y: ValueY};
}

export type UnitCard = {
  front: UnitCardImage;
  back?: UnitCardImage;
};
