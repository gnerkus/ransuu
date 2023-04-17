export type Point = {
  x: number;
  y: number;
};

export type Rotation = {
  angle: number;
  centerX: number;
  centerY: number;
};

export type PathData = {
  points: Point[];
  attributes: PathAttributes;
};

export type PathAttributes = {
  fill: string;
  stroke: string;
  transform?: {
    translate?: number[];
    rotate?: number[];
    skewX?: number;
    skewY?: number;
    scale?: number[];
  };
};
