import { Change } from "@gullerya/object-observer";
import * as d3 from "d3";
import BaseNode from "../BaseNode";
import { Point, Rotation } from "@/types/path";
import lodashSet from "lodash.set";

type TransformNodeAttrs = {
  shape: d3.Selection<SVGElement, undefined, null, undefined>;
  translate: Point;
  rotate: Rotation;
  scale: Point;
  skew: Rotation;
};

class SVGTransformNode extends BaseNode<TransformNodeAttrs> {
  /**
   *
   * @param changes from the input nodes connected to translate, scale, rotate and skew
   */
  onChange(changes: Change[]) {
    changes.forEach((change) => {
      const inputObject = change.object;
      const attrPath = change.path;
      const newValue = change.value;
      const inputHandle = this.inputs.get(
        inputObject
      ) as keyof TransformNodeAttrs;

      if (inputHandle && inputHandle !== "shape") {
        lodashSet(
          this.observableAttrs,
          [inputHandle, ...attrPath].join("."),
          newValue
        );
      }
    });
  }
}

export default SVGTransformNode;
