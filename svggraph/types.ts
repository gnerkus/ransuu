import { Path } from "@thi.ng/geom";
import type { Vec2 } from "@thi.ng/vectors";

export type SVGData = Path;
export type NumberValue = {
  value: number;
}
export type NodeAttrType = NumberValue | Vec2 | SVGData | TransformNodeAttrType;

export type SVGResultMap = Map<string, NodeAttrType>;

type ShapeInput = {
  shape: SVGData;
}

export type TransformNodeInputAttrs = {
  translate: Vec2;
  skewX: NumberValue;
  skewY: NumberValue;
  scale: Vec2;
  rotate: NumberValue;
}

export type TransformNodeAttrType = ShapeInput & TransformNodeInputAttrs;

export type Point = {
  x: number;
  y: number;
};

export type TransformData = {
  translate: Point;
  rotate: NumberValue;
  skewX: NumberValue;
  skewY: NumberValue;
  scale: Point;
};

