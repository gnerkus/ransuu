import { BaseNodeOperation } from "@/types/nodes";
import { PathData, Point, Rotation } from "@/types/path";

const SVGTransform: BaseNodeOperation = (
  path: PathData,
  handle: string,
  transformData: Point | Rotation | number
) => {
  let transformUpdate: Record<string, number | number[]> = {};

  if (
    (handle === "translate" || handle === "scale") &&
    typeof transformData === "object" &&
    "x" in transformData
  ) {
    transformUpdate = {
      [handle]: [transformData.x, transformData.y],
    };
  } else if (
    (handle === "skewX" || handle == "skewY") &&
    typeof transformData === "number"
  ) {
    transformUpdate = {
      [handle]: transformData,
    };
  } else if (
    handle === "rotate" &&
    typeof transformData === "object" &&
    "angle" in transformData
  ) {
    transformUpdate = {
      [handle]: [
        transformData.angle,
        transformData.centerX,
        transformData.centerY,
      ],
    };
  }

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
