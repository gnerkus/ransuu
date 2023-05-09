import BaseNode from "../BaseNode";
import { Point, Rotation } from "@/types/path";
import { ShapeOutput } from "../SVGContext";

type TransformNodeAttrs = ShapeOutput & {
  translate: Point;
  rotate: Rotation;
  scale: Point;
  skew: Point;
};

const serializeVector = (handle: string, vector: Point): string => {
  return `${handle}(${vector.x} ${vector.y})`;
};

const serializeRotation = (handle: string, rotation: Rotation): string => {
  return `${handle}(${rotation.angle} ${rotation.centerX} ${rotation.centerY})`;
};

const serializeTransform = (attrs: TransformNodeAttrs): string => {
  return [
    serializeVector("translate", attrs.translate),
    serializeRotation("rotate", attrs.rotate),
    serializeVector("scale", attrs.scale),
    `skewX(${attrs.skew.x})`,
    `skewY(${attrs.skew.y})`,
  ].join(" ");
};

class SVGTransformNode extends BaseNode<TransformNodeAttrs, ShapeOutput> {
  calculateOutput(): ShapeOutput {
    const updatedTransform = serializeTransform(this.attrs);

    return { shape: this.attrs.shape.attr("transform", updatedTransform) };
  }
}

export default SVGTransformNode;
