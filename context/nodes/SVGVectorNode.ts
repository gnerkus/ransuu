import BaseNode from "../BaseNode";
import { Point } from "@/types/path";

class SVGVectorNode extends BaseNode<Point, Point> {
  calculateOutput(): Point {
    return this.attrs;
  }
}

export default SVGVectorNode;
