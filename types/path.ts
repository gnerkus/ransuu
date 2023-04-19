export type Point = {
  x: number;
  y: number;
};

export type Rotation = {
  angle: number;
  centerX: number;
  centerY: number;
};

export type TransformArgs = {
  translate?: Point;
  rotate?: Rotation;
  skew?: Point;
  scale?: Point;
};

export type PathData = {
  points: Point[];
  attributes: PathAttributes;
};

export type TransformData = {
  translate?: number[];
  rotate?: number[];
  scale?: number[];
  skewX?: number[];
  skewY?: number[];
};

export type PathAttributes = {
  fill: string;
  stroke: string;
  transform?: TransformData;
};
