export type Point = {
  x: number;
  y: number;
};

export type PathData = {
  points: Point[];
  attributes: PathAttributes;
};

export type PathAttributes = {
  fill: string;
  stroke: string;
  transform?: string;
};
