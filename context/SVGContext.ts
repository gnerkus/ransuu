import { PathData, Point, Rotation } from "@/types/path";

type SVGContextNode = {
  inputs: string[];
  outputs: string[];
  operation: BaseNodeOperation | null;
};

type SVGContextNodes = Record<string, SVGContextNode>;

type BaseNodeOperation = (
  path: PathData,
  data: Record<string, any>
) => PathData;

export const generateSVGOutput = (
  initialPath: PathData,
  startNodeId: string
): PathData => {
  /**
   * Input nodes store their own data
   * Operation nodes store their input and output data and generate their output data
   *
   * 1. get a list of the output ids for the startNodeId
   * 2. for each output id
   *  1. get the node from the map
   *  2. if the node type is an input or output return the initialPath
   *  3. if not input or output, therefore an operation node, update the corresponding input data
   *  4. generate the output data for the operation node
   *  5. get the list of output ids for the operation node
   *  6. for each output id, repeat steps 2.1 - 2.5
   */

  return initialPath;
};

/**
 * Transform node
 * - key: id
 *
 * - output type: PathData
 * - input types: PathData, Point, Point, Point
 * - operation steps:
 *  - take inputs[1] and place in output.attributes.transform.translate
 *  - take inputs[2] and place in output.attributes.transform.rotation
 *  - take inputs[3] and place in output.attributes.transform.scale
 *
 */

type SVGTransformArgs = {
  translate?: Point;
  rotate?: Rotation;
  scale?: Point;
  skewX?: number;
  skewY?: number;
};

const SVGTransform: BaseNodeOperation = (
  path: PathData,
  transformData: SVGTransformArgs
) => {
  if (Object.keys(transformData).length < 1) return path;

  const transformUpdate = {
    translate: transformData.translate && [
      transformData.translate.x,
      transformData.translate.y,
    ],
    rotate: transformData.rotate && [
      transformData.rotate.angle,
      transformData.rotate.centerX,
      transformData.rotate.centerY,
    ],
    scale: transformData.scale && [
      transformData.scale.x,
      transformData.scale.y,
    ],
    skewX: transformData.skewX || 0,
    skewY: transformData.skewY || 0,
  };

  return {
    ...path,
    attributes: {
      ...path.attributes,
      transform: {
        ...path.attributes.transform,
        ...transformUpdate,
      },
    },
  };
};
