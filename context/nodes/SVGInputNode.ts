import BaseNode from "../BaseNode";
import { Shape, ShapeOutput } from "../SVGContext";

class SVGInputNode extends BaseNode<ShapeOutput, Shape> {
  calculateOutput(): Shape {
    return this.attrs.shape;
  }
}

export default SVGInputNode;
