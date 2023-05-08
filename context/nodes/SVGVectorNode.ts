import { Change } from "@gullerya/object-observer";
import BaseNode from "../BaseNode";
import { Point } from "@/types/path";

class SVGVectorNode extends BaseNode<Point> {
  /**
   * TODO: source nodes do not need to implement onChange
   * @param changes
   */
  onChange(changes: Change[]) {}
}

export default SVGVectorNode;
