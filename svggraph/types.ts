import { Point, Rotation, TransformData } from "@/types/path";
import { PathDataItem } from "@/utils/pointsToSVG";

export type ResultMap = Map<string, Point | Rotation | DAGFunctions>;

/**
 * A Shape is a collection of instructions to be used to draw the SVG
 * TODO: express every attribute as a function
 * TODO: AttributeList should also include the path expresses as a series of points
 */

export type DAGAttributeList = {
  fill?: ColorFunction;
  stroke?: ColorFunction;
  transform?: {
    translate?: VectorFunction;
    scale?: VectorFunction;
    skew?: VectorFunction;
    rotate?: QuaternionFunction;
  };
};

export type VectorFunction = (source: Point, index: number) => Point;
export type QuaternionFunction = (source: Rotation, index: number) => Rotation;
export type PathFunction = (
  source: PathDataItem[],
  index: number
) => PathDataItem[];
export type ColorFunction = (source: string, index: number) => string;

type DAGInstanceDefinition = {
  count: number;
  attributes: DAGAttributeList;
  path: PathFunction;
};

export type DAGFunctions = {
  instance: DAGInstanceDefinition[];
  attributes: DAGAttributeList;
  path: PathFunction;
};

type DAGShapeInput = {
  shape: DAGFunctions;
};

export type TransformNodeData = {
  translate: Point;
  rotate: Rotation;
  skew: Point;
  scale: Point;
};

export type TransformNodeAttrs = DAGShapeInput & TransformNodeData;

export type AttributeList = {
  fill?: string;
  stroke?: string;
  transform?: TransformData;
};

type InstanceDefinition = {
  count: number;
  path: PathDataItem[];
  attributes: AttributeList;
};

export type Shape = {
  instance: InstanceDefinition[];
  attributes: AttributeList;
  path: PathDataItem[];
};

export type SerializedAttributes = Record<string, string | undefined>;
