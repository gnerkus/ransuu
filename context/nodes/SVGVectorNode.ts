import { Change } from "@gullerya/object-observer";
import BaseNode from "../BaseNode";

type VectorAttrs = {
  x: number;
  y: number;
};

class SVGVectorNode extends BaseNode<VectorAttrs> {
  /**
   * TODO: source nodes do not need to implement onChange
   * @param changes
   */
  onChange(changes: Change[]) {}
}
