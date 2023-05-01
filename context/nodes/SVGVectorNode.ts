import { Change } from "@gullerya/object-observer";
import BaseNode from "../BaseNode";

type VectorNodeAttrs = {
  x: number;
  y: number;
};

class SVGVectorNode extends BaseNode<VectorNodeAttrs> {
  /**
   * TODO: source nodes do not need to implement onChange
   * @param changes
   */
  onChange(changes: Change[]) {}
}

export default SVGVectorNode;
