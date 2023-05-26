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
    const translateFunction: VectorFunction = (source) => {
      return {
        x: source.x + translate.x,
        y: source.y + translate.y,
      };
    };

    const scaleNodeInput = this.inputsByPath.get("scale");
    const scale = scaleNodeInput
      ? (resultMap.get(scaleNodeInput.id) as Point)
      : this.attrs.translate;
    const scaleFunction: VectorFunction = (source) => {
      return {
        x: source.x + scale.x,
        y: source.y + scale.y,
      };
    };

    const skewNodeInput = this.inputsByPath.get("skew");
    const skew = skewNodeInput
      ? (resultMap.get(skewNodeInput.id) as Point)
      : this.attrs.skew;
    const skewFunction: VectorFunction = (source) => {
      return {
        x: source.x + skew.x,
        y: source.y + skew.y,
      };
    };

    const rotateNodeInput = this.inputsByPath.get("rotate");
    const rotate = rotateNodeInput
      ? (resultMap.get(rotateNodeInput.id) as Rotation)
      : this.attrs.rotate;
    const rotateFunction: QuaternionFunction = (source) => {
      return {
        angle: source.angle + rotate.angle,
        centerX: source.centerX + rotate.centerX,
        centerY: source.centerY + rotate.centerY,
      };
    };

    const transformResult: DAGFunctions = {
      ...this.attrs.shape,
      attributes: {
        ...this.attrs.shape.attributes,
        transform: {
          translate: translateFunction,
          scale: scaleFunction,
          skew: skewFunction,
          rotate: rotateFunction,
        },
      },
    };

    resultMap.set(this.id, transformResult);
    return resultMap;
  }
}

export default SVGTransformNode;
