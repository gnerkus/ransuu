import { Change, Observable } from "@gullerya/object-observer";
import * as d3 from "d3";
import BaseNode from "../BaseNode";
import { Point, Rotation } from "@/types/path";
import lodashSet from "lodash.set";

type TransformNodeAttrs = {
  shape: d3.Selection<SVGGElement, undefined, null, undefined>;
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

const serializeTransform = (
  handle: string,
  attrPath: string[],
  newValue: any,
  currentAttrs: Observable & TransformNodeAttrs
): string => {
  let { shape, ...attrs } = currentAttrs;

  attrs = lodashSet(attrs, [handle, ...attrPath].join("."), newValue);

  return [
    serializeVector("translate", attrs.translate),
    serializeRotation("rotate", attrs.rotate),
    serializeVector("scale", attrs.scale),
    `skewX(${attrs.skew.x})`,
    `skewY(${attrs.skew.y})`,
  ].join(" ");
};

class SVGTransformNode extends BaseNode<TransformNodeAttrs> {
  /**
   * React to changes from source nodes
   *
   * @param changes from the input nodes connected to translate, scale, rotate and skew
   */
  onChange(changes: Change[]) {
    changes.forEach((change) => {
      const inputHandle = this.inputs.get(
        change.object
      ) as keyof TransformNodeAttrs;

      const updatedTransform = serializeTransform(
        inputHandle,
        change.path,
        change.value,
        this.observableAttrs
      );

      // TODO: see if we can simply update the shape instead of assigning a new shape
      this.observableAttrs.shape = this.observableAttrs.shape.attr(
        "transform",
        updatedTransform
      );
    });
  }
}

export default SVGTransformNode;
