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
  sourceColor: string,
  transformFunction: ColorFunction,
  index: number
): string => {
  return transformFunction(sourceColor, index);
};
const serializeVector = (
  handle: string,
  transformFunction: VectorFunction,
  vector: Point,
  index: number
): string => {
  const newVector = transformFunction(vector, index);
  return `${handle}(${newVector.x} ${newVector.y})`;
};

const serializeRotation = (
  handle: string,
  transformFunction: QuaternionFunction,
  rotation: Rotation,
  index: number
): string => {
  const newRotation = transformFunction(rotation, index);
  return `${handle}(${rotation.angle} ${newRotation.centerX} ${newRotation.centerY})`;
};

const serializeTransform = (
  index: number,
  attrs?: TransformData,
  functions?: DAGAttributeList
): string => {
  if (!(attrs && functions?.transform)) return "";

  return [
    attrs.translate &&
      serializeVector(
        "translate",
        functions.transform.translate,
        attrs.translate,
        index
      ),
    attrs.rotate &&
      serializeRotation(
        "rotate",
        functions.transform.rotate,
        attrs.rotate,
        index
      ),
    attrs.scale &&
      serializeVector("scale", functions.transform.scale, attrs.scale, index),
    attrs.skew ? `skewX(${functions.transform.skew(attrs.skew, index).x})` : "",
    attrs.skew ? `skewY(${functions.transform.skew(attrs.skew, index).y})` : "",
  ].join(" ");
};
export const serializeAttributes = (
  initial: AttributeList,
  functions: DAGAttributeList,
  index: number
): SerializedAttributes => {
  return {
    fill:
      initial.fill &&
      functions.fill &&
      serializeColor(initial.fill, functions.fill, index),
    stroke:
      initial.stroke &&
      functions.stroke &&
      serializeColor(initial.stroke, functions.stroke, index),
    transform:
      initial.transform &&
      functions.transform &&
      serializeTransform(index, initial.transform, functions),
  };
};
