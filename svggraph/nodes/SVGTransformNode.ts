import { Point, Rotation } from "@/types/path";
import Vertex from "../Vertex";
import {
  DAGFunctions,
  QuaternionFunction,
  ResultMap,
  TransformNodeAttrs,
  VectorFunction,
} from "../types";

class SVGTransformNode extends Vertex<TransformNodeAttrs, DAGFunctions> {
  execute(resultMap: ResultMap): ResultMap {
    const translateNodeInput = this.inputsByPath.get("translate");
    const translate = translateNodeInput
      ? (resultMap.get(translateNodeInput.id) as Point)
      : this.attrs.translate;
    // TODO: move this to a utility function
    const hasTranslate = translate.x !== 0 || translate.y !== 0;
    const translateFunction: VectorFunction | undefined = hasTranslate
      ? (source) => {
          return {
            x: source.x + Number(translate.x),
            y: source.y + Number(translate.y),
          };
        }
      : undefined;

    const scaleNodeInput = this.inputsByPath.get("scale");
    const scale = scaleNodeInput
      ? (resultMap.get(scaleNodeInput.id) as Point)
      : this.attrs.scale;
    const hasScale = scale.x !== 0 || scale.y !== 0;
    const scaleFunction: VectorFunction | undefined = hasScale
      ? (source) => {
          return {
            x: Number(scale.x),
            y: Number(scale.y),
          };
        }
      : undefined;

    const skewNodeInput = this.inputsByPath.get("skew");
    const skew = skewNodeInput
      ? (resultMap.get(skewNodeInput.id) as Point)
      : this.attrs.skew;
    const hasSkew = skew.x !== 0 || skew.y !== 0;
    const skewFunction: VectorFunction | undefined = hasSkew
      ? (source) => {
          return {
            x: Number(skew.x),
            y: Number(skew.y),
          };
        }
      : undefined;

    const rotateNodeInput = this.inputsByPath.get("rotate");
    const rotate = rotateNodeInput
      ? (resultMap.get(rotateNodeInput.id) as Rotation)
      : this.attrs.rotate;
    const hasRotate =
      rotate.angle !== 0 || rotate.centerX !== 0 || rotate.centerY !== 0;
    const rotateFunction: QuaternionFunction | undefined = hasRotate
      ? (source) => {
          return {
            angle: Number(rotate.angle),
            centerX: Number(rotate.centerX),
            centerY: Number(rotate.centerY),
          };
        }
      : undefined;

    const hasTransform = hasTranslate || hasScale || hasSkew || hasRotate;
    const transformFunctionResult = hasTransform
      ? {
          translate: translateFunction,
          scale: scaleFunction,
          skew: skewFunction,
          rotate: rotateFunction,
        }
      : undefined;

    const transformResult: DAGFunctions = {
      ...this.attrs.shape,
      attributes: {
        ...this.attrs.shape.attributes,
        transform: transformFunctionResult,
      },
    };

    resultMap.set(this.id, transformResult);
    return resultMap;
  }
}

export default SVGTransformNode;
