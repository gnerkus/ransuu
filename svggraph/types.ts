import { Point, Rotation, TransformData } from "@/types/path";

export type ResultMap = Map<string, Point | Rotation | Shape>;

/**
 * A Shape is a collection of instructions to be used to draw the SVG
 *
 */

type AttributeList = {
  transform?: {
    translate: VectorFunction;
    scale: VectorFunction;
    skew: VectorFunction;
    rotate: QuaternionFunction;
  };
  fill?: string;
  stroke?: string;
};

export type VectorFunction = (source: Point, index: number) => Point;
export type QuaternionFunction = (source: Rotation, index: number) => Rotation;

export type Shape = {
  instance?: {
    count: number;
    attributes: AttributeList;
  };
  attributes: AttributeList;
};

type ShapeInput = {
  shape: Shape;
};

export type TransformAttrs = ShapeInput & TransformData;
