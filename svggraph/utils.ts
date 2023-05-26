import { Point, Rotation, TransformData } from "@/types/path";
import {
  ColorFunction,
  AttributeList,
  DAGAttributeList,
  SerializedAttributes,
  VectorFunction,
  QuaternionFunction,
} from "./types";

const serializeColor = (
  sourceColor = "",
  transformFunction: ColorFunction,
  index: number
): string => {
  return transformFunction(sourceColor, index);
};
const serializeVector = (
  handle: string,
  transformFunction: VectorFunction,
  vector = { x: 0, y: 0 },
  index: number
): string => {
  const newVector = transformFunction(vector, index);
  return `${handle}(${newVector.x} ${newVector.y})`;
};

const serializeRotation = (
  handle: string,
  transformFunction: QuaternionFunction,
  rotation = { angle: 0, centerX: 0, centerY: 0 },
  index: number
): string => {
  const newRotation = transformFunction(rotation, index);
  return `${handle}(${rotation.angle} ${newRotation.centerX} ${newRotation.centerY})`;
};

const serializeTransform = (
  index: number,
  attrs?: TransformData,
  functions?: DAGAttributeList
): string | undefined => {
  if (!functions?.transform) return undefined;

  return [
    functions.transform.translate &&
      serializeVector(
        "translate",
        functions.transform.translate,
        attrs?.translate,
        index
      ),
    functions.transform.rotate &&
      serializeRotation(
        "rotate",
        functions.transform.rotate,
        attrs?.rotate,
        index
      ),
    functions.transform.scale &&
      serializeVector("scale", functions.transform.scale, attrs?.scale, index),
    functions.transform.skew &&
      `skewX(${
        functions.transform.skew(attrs?.skew || { x: 0, y: 0 }, index).x
      })`,
    functions.transform.skew &&
      `skewY(${
        functions.transform.skew(attrs?.skew || { x: 0, y: 0 }, index).y
      })`,
  ].join(" ");
};
export const serializeAttributes = (
  initial: AttributeList,
  functions: DAGAttributeList,
  index: number
): SerializedAttributes => {
  const result = {
    fill: functions.fill && serializeColor(initial.fill, functions.fill, index),
    stroke:
      functions.stroke &&
      serializeColor(initial.stroke, functions.stroke, index),
    transform: serializeTransform(index, initial.transform, functions),
  };

  return result;
};
