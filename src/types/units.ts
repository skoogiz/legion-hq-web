export type RankType =
  | "commander"
  | "operative"
  | "corps"
  | "special"
  | "support"
  | "heavy";

export type Rank = {
  name: string;
  title: string;
  icon: string;
  symbol: string;
};
