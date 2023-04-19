import { BaseNodeOperation } from "@/types/nodes";
import { PathData, TransformArgs } from "@/types/path";
import { produce } from "immer";

export const doSVGTransform: BaseNodeOperation = (
  path: PathData,
  transformData: TransformArgs
): PathData => {
  const transform = {
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
    skewX: transformData.skew && [transformData.skew.x],
    skewY: transformData.skew && [transformData.skew.y],
  };

  return produce(path, (draft) => {
    draft.attributes.transform = transform;
  });
};
