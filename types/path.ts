export type Point = {
  x: number;
  y: number;
};

export type Rotation = {
  angle: number;
  centerX: number;
  centerY: number;
};

export type TransformData = {
  translate: Point;
  rotate: Rotation;
  skew: Point;
  scale: Point;
};

export type PathData = {
  points: Point[];
  attributes: PathAttributes;
};

export type PathInput = {
  path: PathData;
};

export type PathAttributes = {
  fill: string;
  stroke: string;
  transform?: TransformData;
};
