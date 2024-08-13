export type ValueX = 1 | 2;

export type ValueY = 1 | 2 | 3 | 4;

export type UnitCardImage = {file: string; sprite: {x: ValueX; y: ValueY}};

export type UnitCard = {
  front: UnitCardImage;
  back?: UnitCardImage;
};

export const getSrc = (page: number) =>
  `/data/2.6.0/SWQ_PlayerCards-4/page_${`${page}`.padStart(2, "0")}.png`;
